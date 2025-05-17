/*
  # Create Gallery Items Table

  1. New Table
    - gallery_items: Store gallery images and metadata
      - id (uuid, primary key)
      - type (text): 'food' or 'event'
      - title (text): Image title/description
      - image_url (text): URL to the image
      - location (text): Where the photo was taken
      - date (date): When the photo was taken
      - created_at (timestamp)
      - updated_at (timestamp)
    
  2. Security
    - Enable RLS
    - Add policy for public read access
*/

-- Create gallery items table
CREATE TABLE gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  title text NOT NULL,
  image_url text NOT NULL,
  location text NOT NULL,
  date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Allow public read access" ON gallery_items
  FOR SELECT TO public USING (true);

-- Create index for date ordering
CREATE INDEX gallery_items_date_idx ON gallery_items(date DESC);