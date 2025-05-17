/*
  # Add ON DELETE RESTRICT to menu_items foreign key

  1. Changes
    - Add ON DELETE RESTRICT to the menu_items foreign key constraint
    - Check if constraint exists before adding
    - Ensure data integrity by preventing deletion of menu items referenced in orders

  2. Security
    - Prevents accidental deletion of menu items that have been ordered
    - Maintains referential integrity
*/

DO $$
BEGIN
    -- Drop existing constraint if it exists
    IF EXISTS (
        SELECT 1 
        FROM pg_constraint 
        WHERE conname = 'order_items_menu_item_id_fkey'
    ) THEN
        ALTER TABLE order_items
        DROP CONSTRAINT order_items_menu_item_id_fkey;
    END IF;

    -- Add new constraint with ON DELETE RESTRICT
    ALTER TABLE order_items
    ADD CONSTRAINT order_items_menu_item_id_fkey 
    FOREIGN KEY (menu_item_id) 
    REFERENCES menu_items(id)
    ON DELETE RESTRICT;
END $$;