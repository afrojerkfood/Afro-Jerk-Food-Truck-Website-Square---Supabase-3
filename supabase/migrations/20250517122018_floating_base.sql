/*
  # Update Menu Items Display Order

  1. Changes
    - Make display_order column nullable
    - Update existing items to maintain order
    - Add trigger to auto-update display_order
*/

-- Make display_order nullable
ALTER TABLE menu_items
ALTER COLUMN display_order DROP NOT NULL;

-- Create function to update display order
CREATE OR REPLACE FUNCTION update_menu_display_order()
RETURNS TRIGGER AS $$
BEGIN
  -- Only update display order for new items
  IF TG_OP = 'INSERT' AND NEW.display_order IS NULL THEN
    NEW.display_order = (SELECT COALESCE(MAX(display_order), 0) + 1 FROM menu_items);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
DROP TRIGGER IF EXISTS set_menu_display_order ON menu_items;
CREATE TRIGGER set_menu_display_order
  BEFORE INSERT ON menu_items
  FOR EACH ROW
  EXECUTE FUNCTION update_menu_display_order();