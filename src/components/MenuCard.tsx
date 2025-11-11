import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Leaf } from "lucide-react";

interface Modifier {
  id: string;
  name: string;
  price: number;
  max_selections?: number;
  required?: boolean;
}

interface MenuCardProps {
  name: string;
  description?: string;
  price: string; // Changed from number to string to accept formatted price
  category: string;
  imageUrl?: string;
  available: boolean;
  modifiers?: Modifier[];
  dietary_preferences?: string[];
  seasonal?: boolean;
  chef_special?: boolean;
}

export const MenuCard = ({ 
  name, 
  description, 
  price, 
  category, 
  imageUrl, 
  available,
  modifiers,
  dietary_preferences,
  seasonal,
  chef_special
}: MenuCardProps) => {
  return (
    <Card className="overflow-hidden bg-black border border-cyan-500/30 rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 touch-manipulation">
      {imageUrl && (
        <div className="aspect-video w-full overflow-hidden bg-gray-900">
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <CardContent className="p-4 md:p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg md:text-xl font-bold text-white leading-tight">{name}</h3>
          <span className="text-xl md:text-2xl font-bold text-cyan-400">{price}</span>
        </div>
        {description && (
          <p className="text-gray-300 mb-4 text-sm md:text-base leading-relaxed">{description}</p>
        )}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <Badge variant="secondary" className="text-xs md:text-sm bg-gray-800 text-cyan-300 border border-cyan-500/30 px-3 py-1">
            {category}
          </Badge>
          {!available && (
            <Badge variant="destructive" className="text-xs md:text-sm px-3 py-1">
              Unavailable
            </Badge>
          )}
          {seasonal && (
            <Badge variant="secondary" className="text-xs md:text-sm bg-green-900/50 text-green-300 border border-green-500/30 px-3 py-1">
              <Leaf className="h-3 w-3 mr-1 inline" />
              Seasonal
            </Badge>
          )}
          {chef_special && (
            <Badge variant="secondary" className="text-xs md:text-sm bg-purple-900/50 text-purple-300 border border-purple-500/30 px-3 py-1">
              <ChefHat className="h-3 w-3 mr-1 inline" />
              Chef's Special
            </Badge>
          )}
        </div>
        
        {/* Dietary Preferences */}
        {dietary_preferences && dietary_preferences.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {dietary_preferences.map((preference, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs bg-blue-900/30 text-blue-300 border border-blue-500/30 px-2 py-0.5"
              >
                {preference}
              </Badge>
            ))}
          </div>
        )}
        
        {/* Modifiers Preview */}
        {modifiers && modifiers.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-700">
            <p className="text-xs text-gray-400 mb-1">Customizations available</p>
            <div className="flex flex-wrap gap-1">
              {modifiers.slice(0, 3).map((modifier) => (
                <Badge 
                  key={modifier.id} 
                  variant="outline" 
                  className="text-xs bg-gray-700 text-gray-300 border border-gray-600 px-2 py-0.5"
                >
                  +₹{modifier.price.toFixed(2)}
                </Badge>
              ))}
              {modifiers.length > 3 && (
                <Badge variant="outline" className="text-xs bg-gray-700 text-gray-300 border border-gray-600 px-2 py-0.5">
                  +{modifiers.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};