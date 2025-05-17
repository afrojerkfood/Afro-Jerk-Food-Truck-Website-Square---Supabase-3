/*
  # Initial Schema Setup

  1. New Tables
    - `locations`: Store location information
    - `menu_items`: Store menu items
    - `blog_posts`: Store blog posts
    - `orders`: Store customer orders
    - `order_items`: Store items within orders
    - `schedules`: Store food truck schedules
    - `reviews`: Store customer reviews
    - `square_webhooks`: Store webhook events
    - `square_sync_logs`: Track synchronization history
    - `square_webhook_verification`: Store webhook verification keys

  2. Security
    - Enable RLS on all tables
    - Add policies for public and authenticated access
*/

-- Create enum types
CREATE TYPE order_status AS ENUM ('pending', 'preparing', 'completed', 'cancelled');
CREATE TYPE menu_category AS ENUM ('signatures', 'vegetarian', 'sides', 'drinks', 'combos', 'dessert', 'extras');
CREATE TYPE blog_status AS ENUM ('draft', 'published', 'archived');

-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  image_url text,
  category menu_category NOT NULL,
  is_vegetarian boolean DEFAULT false,
  is_spicy boolean DEFAULT false,
  is_gluten_free boolean DEFAULT false,
  square_item_id text UNIQUE,
  square_variation_id text,
  square_modifier_id text,
  last_synced_at timestamptz,
  square_price decimal(10,2),
  square_stock integer,
  track_inventory boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text,
  content text,
  image_url text,
  category text NOT NULL,
  author text NOT NULL,
  status blog_status DEFAULT 'draft',
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  location_id uuid REFERENCES locations(id),
  status order_status DEFAULT 'pending',
  total_amount decimal(10,2) NOT NULL,
  pickup_time timestamptz NOT NULL,
  square_order_id text UNIQUE,
  square_payment_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id uuid REFERENCES menu_items(id),
  quantity integer NOT NULL,
  price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create schedules table
CREATE TABLE IF NOT EXISTS schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id uuid REFERENCES locations(id),
  date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create square_sync_logs table
CREATE TABLE IF NOT EXISTS square_sync_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sync_type text NOT NULL,
  status text NOT NULL,
  details jsonb,
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  error_message text
);

-- Create square_webhooks table
CREATE TABLE IF NOT EXISTS square_webhooks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  payload jsonb NOT NULL,
  processed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  processed_at timestamptz
);

-- Create square_webhook_verification table
CREATE TABLE IF NOT EXISTS square_webhook_verification (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  signature_key text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX menu_items_category_idx ON menu_items(category);
CREATE INDEX menu_items_square_item_id_idx ON menu_items(square_item_id);
CREATE INDEX menu_items_last_synced_idx ON menu_items(last_synced_at);
CREATE INDEX blog_posts_status_idx ON blog_posts(status);
CREATE INDEX orders_status_idx ON orders(status);
CREATE INDEX schedules_date_idx ON schedules(date);
CREATE INDEX square_webhooks_event_type_idx ON square_webhooks(event_type);
CREATE INDEX square_webhooks_processed_idx ON square_webhooks(processed);

-- Enable RLS on all tables
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE square_sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE square_webhooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE square_webhook_verification ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public access" ON locations FOR ALL TO public USING (true);
CREATE POLICY "Public access" ON menu_items FOR ALL TO public USING (true);
CREATE POLICY "Public access" ON blog_posts FOR ALL TO public USING (true);
CREATE POLICY "Public access" ON orders FOR ALL TO public USING (true);
CREATE POLICY "Public access" ON order_items FOR ALL TO public USING (true);
CREATE POLICY "Public access" ON schedules FOR ALL TO public USING (true);
CREATE POLICY "Public access" ON reviews FOR ALL TO public USING (true);
CREATE POLICY "Public access" ON square_sync_logs FOR ALL TO public USING (true);
CREATE POLICY "Public access" ON square_webhooks FOR ALL TO public USING (true);
CREATE POLICY "Public access" ON square_webhook_verification FOR ALL TO public USING (true);

-- Add storage policies
CREATE POLICY "Give public users access to media bucket" ON storage.objects
  FOR SELECT TO public USING (bucket_id = 'media');

CREATE POLICY "Allow public users to upload to media bucket" ON storage.objects
  FOR INSERT TO public WITH CHECK (bucket_id = 'media');