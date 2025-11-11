-- Extend menu_items table with modifiers and dietary preferences
ALTER TABLE public.menu_items 
ADD COLUMN IF NOT EXISTS modifiers JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS dietary_preferences JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS seasonal BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS chef_special BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_menu_items_dietary_preferences ON public.menu_items USING GIN (dietary_preferences);
CREATE INDEX IF NOT EXISTS idx_menu_items_seasonal ON public.menu_items (seasonal);
CREATE INDEX IF NOT EXISTS idx_menu_items_chef_special ON public.menu_items (chef_special);
CREATE INDEX IF NOT EXISTS idx_menu_items_sort_order ON public.menu_items (sort_order);

-- Update RLS policies to allow access to new columns
ALTER POLICY "Anyone can view menu items"
  ON public.menu_items
  USING (true);

-- Create function to handle chef special rotation
CREATE OR REPLACE FUNCTION public.get_current_chef_specials()
RETURNS TABLE (
  id UUID,
  name TEXT,
  description TEXT,
  price DECIMAL(10,2),
  category TEXT,
  image_url TEXT,
  available BOOLEAN,
  chef_special BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    m.id, m.name, m.description, m.price, m.category, 
    m.image_url, m.available, m.chef_special,
    m.created_at, m.updated_at
  FROM public.menu_items m
  WHERE m.chef_special = true AND m.available = true
  ORDER BY m.updated_at DESC
  LIMIT 5;
END;
$$ LANGUAGE plpgsql;

-- Create function to get seasonal items
CREATE OR REPLACE FUNCTION public.get_seasonal_items()
RETURNS TABLE (
  id UUID,
  name TEXT,
  description TEXT,
  price DECIMAL(10,2),
  category TEXT,
  image_url TEXT,
  available BOOLEAN,
  seasonal BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    m.id, m.name, m.description, m.price, m.category, 
    m.image_url, m.available, m.seasonal,
    m.created_at, m.updated_at
  FROM public.menu_items m
  WHERE m.seasonal = true AND m.available = true
  ORDER BY m.sort_order, m.name;
END;
$$ LANGUAGE plpgsql;