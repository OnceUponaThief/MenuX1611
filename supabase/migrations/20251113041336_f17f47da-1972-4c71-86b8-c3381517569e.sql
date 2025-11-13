-- Add modifiers column to menu_items table for volume options
ALTER TABLE menu_items 
ADD COLUMN IF NOT EXISTS modifiers JSONB DEFAULT '[]'::jsonb;

-- Add comment explaining the modifiers structure
COMMENT ON COLUMN menu_items.modifiers IS 'Array of modifiers like sizes/volumes: [{name: "30ml", price: 400}, {name: "60ml", price: 750}]';