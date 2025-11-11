import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MenuCardProps {
  name: string;
  description?: string;
  price: string; // Changed from number to string to accept formatted price
  category: string;
  imageUrl?: string;
  available: boolean;
}

export const MenuCard = ({ name, description, price, category, imageUrl, available }: MenuCardProps) => {
  return (
    <Card className="overflow-hidden tech-card neon-border animate-fade-in">
      {imageUrl && (
        <div className="aspect-video w-full overflow-hidden bg-black/80">
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 opacity-90"
          />
        </div>
      )}
      <CardContent className="p-4 tech-card-content">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold neon-gradient-text pixel-font">{name}</h3>
          <span className="text-xl font-bold neon-gradient-text drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">{price}</span>
        </div>
        {description && (
          <p className="text-gray-300 mb-3 text-sm leading-relaxed">{description}</p>
        )}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="secondary" className="text-xs bg-black/50 border border-cyan-500/30 text-cyan-300 pixel-font">
            {category}
          </Badge>
          {!available && (
            <Badge variant="destructive" className="text-xs pixel-font">
              Unavailable
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};