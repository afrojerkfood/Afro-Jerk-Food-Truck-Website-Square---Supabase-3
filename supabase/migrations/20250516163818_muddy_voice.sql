/*
  # Add Menu Item Ordering

  1. Changes
    - Add display_order column to menu_items table
    - Set initial display order based on existing items
    - Add index for efficient ordering queries
    
  2. Security
    - Maintain existing RLS policies
*/

-- Add display_order column
ALTER TABLE menu_items
ADD COLUMN display_order integer;

-- Set initial display order based on creation date
WITH ordered_items AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as rn
  FROM menu_items
)
UPDATE menu_items
SET display_order = ordered_items.rn
FROM ordered_items
WHERE menu_items.id = ordered_items.id;

-- Make display_order required after initial setup
ALTER TABLE menu_items
ALTER COLUMN display_order SET NOT NULL;

-- Add index for efficient ordering
CREATE INDEX menu_items_display_order_idx ON menu_items(display_order);