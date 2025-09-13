/*
  # Service Provider Implementation

  1. New Tables
    - `service_providers`
      - Core provider information
      - Pricing and availability settings
      - Verification status
    - `service_bookings`
      - Booking records
      - Payment tracking
      - Status management
    - `service_reviews`
      - Client reviews and ratings
      - Provider responses

  2. Security
    - Enable RLS on all tables
    - Add policies for providers and clients
    - Secure payment handling

  3. Changes
    - Add service provider functionality
    - Integrate with SFMPay
    - Add booking management
*/

-- Create service categories enum
CREATE TYPE service_category AS ENUM (
  'plumbing',
  'electrical',
  'cleaning',
  'gardening',
  'painting',
  'carpentry',
  'moving',
  'security',
  'other'
);

-- Create service providers table
CREATE TABLE service_providers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  category service_category NOT NULL,
  business_name text NOT NULL,
  description text,
  location jsonb NOT NULL,
  hourly_rate numeric NOT NULL,
  minimum_hours integer NOT NULL DEFAULT 1,
  rush_fee numeric,
  weekend_rate numeric,
  availability jsonb NOT NULL DEFAULT '{"monday":{"enabled":true,"start":"09:00","end":"17:00"},"tuesday":{"enabled":true,"start":"09:00","end":"17:00"},"wednesday":{"enabled":true,"start":"09:00","end":"17:00"},"thursday":{"enabled":true,"start":"09:00","end":"17:00"},"friday":{"enabled":true,"start":"09:00","end":"17:00"},"saturday":{"enabled":false,"start":"09:00","end":"17:00"},"sunday":{"enabled":false,"start":"09:00","end":"17:00"}}'::jsonb,
  skills text[] DEFAULT '{}',
  languages text[] DEFAULT '{}',
  verified boolean DEFAULT false,
  profile_image text,
  gallery text[] DEFAULT '{}',
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  booking_count integer DEFAULT 0,
  completion_rate numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_hourly_rate CHECK (hourly_rate > 0),
  CONSTRAINT valid_minimum_hours CHECK (minimum_hours > 0),
  CONSTRAINT valid_rating CHECK (rating >= 0 AND rating <= 5)
);

-- Create service bookings table
CREATE TABLE service_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES service_providers(id) NOT NULL,
  client_id uuid REFERENCES auth.users(id) NOT NULL,
  service service_category NOT NULL,
  booking_date date NOT NULL,
  start_time time NOT NULL,
  duration integer NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  total_amount numeric NOT NULL,
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid')),
  payment_id text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_duration CHECK (duration > 0),
  CONSTRAINT valid_total_amount CHECK (total_amount > 0)
);

-- Create service reviews table
CREATE TABLE service_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES service_bookings(id) NOT NULL,
  provider_id uuid REFERENCES service_providers(id) NOT NULL,
  client_id uuid REFERENCES auth.users(id) NOT NULL,
  rating integer NOT NULL,
  comment text,
  provider_response text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_rating CHECK (rating >= 1 AND rating <= 5)
);

-- Enable RLS
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for service_providers
CREATE POLICY "Public users can view verified providers"
  ON service_providers
  FOR SELECT
  TO authenticated
  USING (verified = true);

CREATE POLICY "Providers can manage their own profile"
  ON service_providers
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policies for service_bookings
CREATE POLICY "Providers can view their bookings"
  ON service_bookings
  FOR SELECT
  TO authenticated
  USING (
    provider_id IN (
      SELECT id FROM service_providers
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Clients can view their bookings"
  ON service_bookings
  FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Clients can create bookings"
  ON service_bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Providers can update their bookings"
  ON service_bookings
  FOR UPDATE
  TO authenticated
  USING (
    provider_id IN (
      SELECT id FROM service_providers
      WHERE user_id = auth.uid()
    )
  );

-- Create policies for service_reviews
CREATE POLICY "Public users can view reviews"
  ON service_reviews
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Clients can create reviews"
  ON service_reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (
    client_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM service_bookings
      WHERE id = booking_id
      AND client_id = auth.uid()
      AND status = 'completed'
    )
  );

CREATE POLICY "Providers can respond to reviews"
  ON service_reviews
  FOR UPDATE
  TO authenticated
  USING (
    provider_id IN (
      SELECT id FROM service_providers
      WHERE user_id = auth.uid()
    )
  )
  WITH CHECK (
    provider_id IN (
      SELECT id FROM service_providers
      WHERE user_id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX idx_service_providers_user ON service_providers(user_id);
CREATE INDEX idx_service_providers_category ON service_providers(category);
CREATE INDEX idx_service_providers_verified ON service_providers(verified);
CREATE INDEX idx_service_bookings_provider ON service_bookings(provider_id);
CREATE INDEX idx_service_bookings_client ON service_bookings(client_id);
CREATE INDEX idx_service_bookings_date ON service_bookings(booking_date);
CREATE INDEX idx_service_reviews_provider ON service_reviews(provider_id);
CREATE INDEX idx_service_reviews_booking ON service_reviews(booking_id);

-- Add helper functions
CREATE OR REPLACE FUNCTION calculate_provider_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE service_providers
  SET 
    rating = (
      SELECT AVG(rating)::numeric(3,2)
      FROM service_reviews
      WHERE provider_id = NEW.provider_id
    ),
    review_count = (
      SELECT COUNT(*)
      FROM service_reviews
      WHERE provider_id = NEW.provider_id
    )
  WHERE id = NEW.provider_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_completion_rate()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE service_providers
  SET 
    booking_count = (
      SELECT COUNT(*)
      FROM service_bookings
      WHERE provider_id = NEW.provider_id
    ),
    completion_rate = (
      SELECT 
        ROUND(
          (COUNT(*) FILTER (WHERE status = 'completed')::numeric / 
           NULLIF(COUNT(*), 0)::numeric) * 100,
          2
        )
      FROM service_bookings
      WHERE provider_id = NEW.provider_id
    )
  WHERE id = NEW.provider_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_provider_rating
  AFTER INSERT OR UPDATE ON service_reviews
  FOR EACH ROW
  EXECUTE FUNCTION calculate_provider_rating();

CREATE TRIGGER update_provider_completion_rate
  AFTER INSERT OR UPDATE ON service_bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_completion_rate();

-- Add timestamp triggers
CREATE TRIGGER update_service_providers_updated_at
  BEFORE UPDATE ON service_providers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_bookings_updated_at
  BEFORE UPDATE ON service_bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_reviews_updated_at
  BEFORE UPDATE ON service_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();