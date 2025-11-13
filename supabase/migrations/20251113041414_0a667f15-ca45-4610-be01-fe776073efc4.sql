-- Add dietary preferences, seasonal, and chef special columns to menu_items
ALTER TABLE menu_items 
ADD COLUMN IF NOT EXISTS dietary_preferences JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS seasonal BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS chef_special BOOLEAN DEFAULT false;

-- Add comments
COMMENT ON COLUMN menu_items.dietary_preferences IS 'Array of dietary preferences: ["Vegetarian", "Gluten-Free", etc.]';
COMMENT ON COLUMN menu_items.seasonal IS 'Flag to mark item as seasonal';
COMMENT ON COLUMN menu_items.chef_special IS 'Flag to mark item as chef special';