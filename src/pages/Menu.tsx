import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MenuCard } from "@/components/MenuCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  available: boolean;
}

interface Offer {
  id: string;
  title: string;
  description: string | null;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
}

interface RestaurantSettings {
  id: string;
  name: string;
  logo_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}

// Define category groups for better organization
const CATEGORY_GROUPS = {
  drinks: ["drinks", "cocktails", "beer", "wine", "whiskey", "vodka", "gin", "rum", "brandy"],
  food: ["food", "appetizers", "soup", "main course", "rice", "noodles", "dal", "bread", "desserts"],
};

const Menu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [restaurantSettings, setRestaurantSettings] = useState<RestaurantSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    Promise.all([fetchMenuItems(), fetchOffers(), fetchRestaurantSettings()]);
  }, []);

  const fetchMenuItems = async () => {
    try {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .order("category", { ascending: true })
        .order("name", { ascending: true });

      if (error) throw error;

      if (data) {
        setMenuItems(data);
        const uniqueCategories = Array.from(new Set(data.map((item) => item.category)));
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const fetchOffers = async () => {
    try {
      const { data, error } = await supabase
        .from("offers")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        setOffers(data);
      }
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  const fetchRestaurantSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("restaurant_settings")
        .select("*")
        .limit(1);

      if (error) throw error;

      if (data && data.length > 0) {
        setRestaurantSettings(data[0]);
      }
    } catch (error) {
      console.error("Error fetching restaurant settings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Group categories for tab display
  const getGroupedCategories = () => {
    const grouped: Record<string, string[]> = {
      drinks: [],
      food: [],
      other: [],
    };

    categories.forEach((category) => {
      const lowerCategory = category.toLowerCase();
      let found = false;

      // Check drinks group
      if (CATEGORY_GROUPS.drinks.some((drinkCat) => lowerCategory.includes(drinkCat) || lowerCategory === drinkCat)) {
        grouped.drinks.push(category);
        found = true;
      }

      // Check food group
      if (CATEGORY_GROUPS.food.some((foodCat) => lowerCategory.includes(foodCat) || lowerCategory === foodCat)) {
        grouped.food.push(category);
        found = true;
      }

      // If not found in any group, add to other
      if (!found) {
        grouped.other.push(category);
      }
    });

    return grouped;
  };

  // Filter items by group
  const getItemsByGroup = (group: string) => {
    const groupedCategories = getGroupedCategories();
    const groupCategories = groupedCategories[group as keyof typeof groupedCategories] || [];
    
    if (group === "other") {
      // For "other" group, include all categories not in drinks or food
      const allGroupedCategories = [...groupedCategories.drinks, ...groupedCategories.food];
      return menuItems.filter(item => !allGroupedCategories.includes(item.category));
    }
    
    return menuItems.filter(item => 
      groupCategories.some(cat => cat === item.category)
    );
  };

  // Get unique categories within a group for sub-tabs
  const getSubCategories = (group: string) => {
    const items = getItemsByGroup(group);
    return Array.from(new Set(items.map(item => item.category)));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const groupedCategories = getGroupedCategories();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Restaurant Header */}
        <div className="mb-8 animate-fade-in">
          {restaurantSettings?.logo_url ? (
            <div className="flex flex-col items-center">
              <img 
                src={restaurantSettings.logo_url} 
                alt={`${restaurantSettings.name} Logo`}
                className="h-24 w-auto object-contain mb-4"
              />
              <h1 className="text-4xl font-bold text-center text-gradient">
                {restaurantSettings.name}
              </h1>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2 text-gradient">
                {restaurantSettings?.name || "Restaurant Menu"}
              </h1>
            </div>
          )}
        </div>
        
        <div className="text-center mb-12 animate-fade-in">
          <p className="text-muted-foreground text-lg">Discover our selection of drinks and food</p>
        </div>

        {/* Offers Section */}
        {offers.length > 0 && (
          <div className="mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-center text-gradient">Special Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <div key={offer.id} className="border border-border rounded-lg p-6 bg-card shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-foreground">{offer.title}</h3>
                    <Badge variant="secondary" className="bg-green-500 text-white">
                      Special Offer
                    </Badge>
                  </div>
                  {offer.description && (
                    <p className="text-muted-foreground mb-4">{offer.description}</p>
                  )}
                  <div className="text-sm text-primary font-medium">
                    🎉 Limited Time Offer
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {menuItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No menu items available at the moment.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Drinks Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Drinks & Beverages</h2>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full mb-8" style={{ gridTemplateColumns: `repeat(${Math.max(getSubCategories('drinks').length, 1)}, minmax(0, 1fr))` }}>
                  <TabsTrigger value="all" className="capitalize">All Drinks</TabsTrigger>
                  {getSubCategories('drinks').map((category) => (
                    <TabsTrigger key={category} value={category} className="capitalize">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <TabsContent value="all">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getItemsByGroup('drinks')
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((item) => (
                        <MenuCard
                          key={item.id}
                          name={item.name}
                          description={item.description || undefined}
                          price={item.price}
                          category={item.category}
                          imageUrl={item.image_url || undefined}
                          available={item.available}
                        />
                      ))}
                  </div>
                </TabsContent>
                
                {getSubCategories('drinks').map((category) => (
                  <TabsContent key={category} value={category}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getItemsByGroup('drinks')
                        .filter(item => item.category === category)
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((item) => (
                          <MenuCard
                            key={item.id}
                            name={item.name}
                            description={item.description || undefined}
                            price={item.price}
                            category={item.category}
                            imageUrl={item.image_url || undefined}
                            available={item.available}
                          />
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </section>

            {/* Food Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Food Menu</h2>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full mb-8" style={{ gridTemplateColumns: `repeat(${Math.max(getSubCategories('food').length, 1)}, minmax(0, 1fr))` }}>
                  <TabsTrigger value="all" className="capitalize">All Food</TabsTrigger>
                  {getSubCategories('food').map((category) => (
                    <TabsTrigger key={category} value={category} className="capitalize">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                <TabsContent value="all">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getItemsByGroup('food')
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((item) => (
                        <MenuCard
                          key={item.id}
                          name={item.name}
                          description={item.description || undefined}
                          price={item.price}
                          category={item.category}
                          imageUrl={item.image_url || undefined}
                          available={item.available}
                        />
                      ))}
                  </div>
                </TabsContent>
                
                {getSubCategories('food').map((category) => (
                  <TabsContent key={category} value={category}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getItemsByGroup('food')
                        .filter(item => item.category === category)
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((item) => (
                          <MenuCard
                            key={item.id}
                            name={item.name}
                            description={item.description || undefined}
                            price={item.price}
                            category={item.category}
                            imageUrl={item.image_url || undefined}
                            available={item.available}
                          />
                        ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </section>

            {/* Other Categories (if any) */}
            {groupedCategories.other.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-6 text-foreground">Other Items</h2>
                <Tabs defaultValue={groupedCategories.other[0] || "all"} className="w-full">
                  <TabsList className="grid w-full mb-8" style={{ gridTemplateColumns: `repeat(${groupedCategories.other.length || 1}, minmax(0, 1fr))` }}>
                    {groupedCategories.other.map((category) => (
                      <TabsTrigger key={category} value={category} className="capitalize">
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {groupedCategories.other.map((category) => (
                    <TabsContent key={category} value={category}>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {menuItems
                          .filter((item) => item.category === category)
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((item) => (
                            <MenuCard
                              key={item.id}
                              name={item.name}
                              description={item.description || undefined}
                              price={item.price}
                              category={item.category}
                              imageUrl={item.image_url || undefined}
                              available={item.available}
                            />
                          ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;