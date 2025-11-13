import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, Upload, Loader2, X, Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menuItemId: string; // Using string to match UUID id type in Supabase
  menuItemName: string;
  onReviewSubmitted?: () => void;
}

export const ReviewDialog = ({
  open,
  onOpenChange,
  menuItemId,
  menuItemName,
  onReviewSubmitted,
}: ReviewDialogProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const resetForm = () => {
    setRating(0);
    setHoverRating(0);
    setCustomerName("");
    setCustomerPhone("");
    setReviewText("");
    setPhotoFiles([]);
    setPhotoPreviews([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // Limit to 6 photos to keep UI manageable
    const limited = files.slice(0, Math.max(0, 6 - photoFiles.length));
    const newPreviews = limited.map((file) => URL.createObjectURL(file));
    setPhotoFiles((prev) => [...prev, ...limited]);
    setPhotoPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removePhoto = (index: number) => {
    setPhotoFiles((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadPhotos = async (): Promise<string[]> => {
    if (photoFiles.length === 0) return [];

    const uploadedUrls: string[] = [];
    for (const file of photoFiles) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `reviews/${menuItemId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      uploadedUrls.push(publicUrl);
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploading) return;

    if (!rating || rating < 1) {
      toast.error("Please select a star rating.");
      return;
    }

    try {
      setUploading(true);

      let photo_urls: string[] = [];
      if (photoFiles.length > 0) {
        photo_urls = await uploadPhotos();
      }

      const payload = {
        menu_item_id: menuItemId,
        customer_name: customerName || "Anonymous",
        customer_phone: customerPhone || null,
        rating,
        review_text: reviewText || null,
        photo_urls: photo_urls.length ? photo_urls : null,
        is_approved: false,
      };

      const { error } = await supabase.from("reviews").insert([payload]);
      if (error) throw error;

      toast.success("Review submitted! Pending approval.");
      resetForm();
      onOpenChange(false);
      onReviewSubmitted?.();
    } catch (err: any) {
      toast.error(err.message || "Failed to submit review");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => {
      if (!o) resetForm();
      onOpenChange(o);
    }}>
      <DialogContent className="sm:max-w-lg bg-gray-900 text-white border border-cyan-500/30">
        <DialogHeader>
          <DialogTitle className="brand-gradient-text text-2xl">Review {menuItemName}</DialogTitle>
          <DialogDescription className="text-gray-300">
            Share your experience. Star rating required, photos optional.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating selector */}
          <div>
            <Label className="text-gray-200">Your Rating</Label>
            <div className="mt-2 flex items-center gap-2">
              {[1,2,3,4,5].map((s) => (
                <button
                  key={s}
                  type="button"
                  className="p-1"
                  onMouseEnter={() => setHoverRating(s)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(s)}
                >
                  <Star
                    className={`h-6 w-6 ${ (hoverRating || rating) >= s ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Name and phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-gray-200">Name</Label>
              <Input id="name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Your name" className="bg-gray-800 border-cyan-500/30" />
            </div>
            <div>
              <Label htmlFor="phone" className="text-gray-200">Phone (optional)</Label>
              <Input id="phone" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="+91-XXXX-XXXX" className="bg-gray-800 border-cyan-500/30" />
            </div>
          </div>

          {/* Review text */}
          <div>
            <Label htmlFor="review" className="text-gray-200">Your Review (optional)</Label>
            <Textarea id="review" value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Tell us what you liked…" className="bg-gray-800 border-cyan-500/30 min-h-[100px]" />
          </div>

          {/* Photo upload */}
          <div>
            <Label className="text-gray-200">Photos (optional)</Label>
            <div className="mt-2 flex items-center gap-3">
              <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-cyan-500/30 bg-gray-800 cursor-pointer hover:border-cyan-400 transition">
                <Camera className="h-5 w-5 text-cyan-400" />
                <span className="text-sm">Add photos</span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileChange} />
              </label>
              {photoFiles.length > 0 && (
                <span className="text-xs text-gray-400">{photoFiles.length} selected</span>
              )}
            </div>

            {photoPreviews.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {photoPreviews.map((src, idx) => (
                  <div key={`${src}-${idx}`} className="relative group">
                    <img src={src} alt={`preview-${idx}`} className="w-full h-24 object-cover rounded-lg border border-cyan-500/30" />
                    <button type="button" aria-label="remove" className="absolute top-1 right-1 bg-black/60 p-1 rounded hover:bg-black" onClick={() => removePhoto(idx)}>
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="text-gray-300">Cancel</Button>
            <Button type="submit" disabled={uploading} className="bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 text-gray-900">
              {uploading ? (
                <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</span>
              ) : (
                <span className="inline-flex items-center gap-2"><Upload className="h-4 w-4" /> Submit Review</span>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};