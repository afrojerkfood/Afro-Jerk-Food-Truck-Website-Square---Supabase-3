/*
  # Add Gallery Items

  1. Content
    - Add 5 initial gallery items with dates
    - Include food and event photos
    - Set dates based on created_at timestamps
*/

INSERT INTO gallery_items (title, image_url, type, location, date, created_at)
VALUES
  (
    'Traditional African Feast',
    'https://foodinstitute.com/wp-content/uploads/2021/08/African-Cuisine.jpg',
    'food',
    'Charlotte Uptown',
    CURRENT_DATE - interval '1 day',
    now() - interval '1 day'
  ),
  (
    'Diverse African Flavors',
    'https://res-2.cloudinary.com/hpwmsw17c/image/upload/q_auto/v1/ghost-blog-images/Exploring-the-Delicious-and-Diverse-World-of-African-Cuisine.jpg',
    'food',
    'Rock Hill',
    CURRENT_DATE - interval '2 days',
    now() - interval '2 days'
  ),
  (
    'Senegalese Cuisine',
    'https://momaa.org/wp-content/uploads/2023/04/11tmag-senega-1.jpeg',
    'food',
    'Charlotte Uptown',
    CURRENT_DATE - interval '3 days',
    now() - interval '3 days'
  ),
  (
    'Jamaican Curry & Jerk',
    'https://www.shutterstock.com/image-photo/traditional-jamaican-curried-goat-jerk-600nw-1429398311.jpg',
    'food',
    'Rock Hill',
    CURRENT_DATE - interval '4 days',
    now() - interval '4 days'
  ),
  (
    'Village Feast',
    'https://images.squarespace-cdn.com/content/v1/63b25619bc6cb02b178c8b13/cc8e71b1-c551-444b-a59d-89bf54ad895a/classic+village.jpg?format=1500w',
    'event',
    'Charlotte Uptown',
    CURRENT_DATE - interval '5 days',
    now() - interval '5 days'
  );