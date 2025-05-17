/*
  # Add Sea Moss Gel Menu Item

  1. New Items
    - Add Sea Moss Gel to menu_items table
    - Set display_order to be after existing items
*/

WITH max_order AS (
  SELECT COALESCE(MAX(display_order), 0) as max_display_order
  FROM menu_items
)
INSERT INTO menu_items (
  name,
  description,
  price,
  image_url,
  category,
  is_vegetarian,
  is_spicy,
  is_gluten_free,
  created_at,
  updated_at,
  display_order
) VALUES (
  'Sea Moss Gel',
  'Premium 16oz jar of wildcrafted sea moss gel, rich in minerals and nutrients',
  24.99,
  'https://ljrrjebhknseythijqku.supabase.co/storage/v1/object/public/media//Seamoss.jpg',
  'extras',
  true,
  false,
  true,
  now(),
  now(),
  (SELECT max_display_order + 1 FROM max_order)
);