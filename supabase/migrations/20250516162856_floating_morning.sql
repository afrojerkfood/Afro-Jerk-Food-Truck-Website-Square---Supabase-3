/*
  # Add Sides Menu Items

  1. New Items
    - Mac and Cheese
    - Rice and Peas
    - White Rice

  2. Changes
    - Insert new menu items in the sides category
    - Set prices and descriptions
    - Include image URLs
*/

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
  updated_at
) VALUES
(
  'Mac and Cheese',
  'Creamy, rich macaroni and cheese made with a blend of premium cheeses',
  8.99,
  'https://www.allrecipes.com/thmb/MkbGgNcGadAWdYw0aRZbo8WapHM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/237311-slow-cooker-mac-and-cheese-DDMFS-4x3-9b4a15f2c3344c1da22b034bc3b35683.jpg',
  'sides',
  true,
  false,
  false,
  now(),
  now()
),
(
  'Rice and Peas',
  'Traditional Jamaican rice and peas cooked with coconut milk and aromatic spices',
  6.99,
  'https://www.foodandwine.com/thmb/IjUX0gKa3c7P6ZOvEY3w8V_A2eY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-jamaican-rice-and-peas-hero-04-60b04a460ddd4af3b6159aee266d0ff9.jpg',
  'sides',
  true,
  false,
  true,
  now(),
  now()
),
(
  'White Rice',
  'Perfectly cooked fluffy white rice',
  4.99,
  'https://static01.nyt.com/images/2025/02/18/multimedia/23EATrex-white-rice-clbj/23EATrex-white-rice-clbj-mediumSquareAt3X.jpg',
  'sides',
  true,
  false,
  true,
  now(),
  now()
);