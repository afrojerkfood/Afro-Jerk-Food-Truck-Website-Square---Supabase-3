/*
  # Add Foreign Key Constraint with ON DELETE RESTRICT

  1. Changes
    - Add foreign key constraint to order_items table
    - Prevent deletion of menu items that have been ordered
    - Use DO block for safe execution

  2. Security
    - Maintain data integrity by preventing orphaned records
    - Ensure menu items can't be deleted if they're referenced in orders
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