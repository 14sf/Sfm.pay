/*
  # Property System Enhancements
  
  1. New Columns
    - Add listing type and property details columns to properties table
    - Add support for features, images and location data
  
  2. Property Bookings
    - Create property_bookings table for managing reservations
    - Add availability checking functionality
    - Set up proper constraints and indexes
  
  3. Security
    - Enable RLS on new tables
    - Add carefully scoped policies for proper access control
*/

-- Add new columns to properties table
ALTER TABLE properties
ADD COLUMN IF NOT EXISTS title text,
ADD COLUMN IF NOT EXISTS property_type text CHECK (property_type IN ('villa', 'apartment', 'house', 'office')),
ADD COLUMN IF NOT EXISTS location jsonb,
ADD COLUMN IF NOT EXISTS features text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS images text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS listing_type text CHECK (listing_type IN ('sale', 'rent'));

-- Update existing status check constraint
ALTER TABLE properties 
DROP CONSTRAINT IF EXISTS properties_status_check,
ADD CONSTRAINT properties_status_check 
  CHECK (status IN ('available', 'rented', 'sold'));

-- Create property_bookings table
CREATE TABLE IF NOT EXISTS property_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_dates CHECK (end_date > start_date)
);

-- Enable RLS on new table
ALTER TABLE property_bookings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own bookings" ON property_bookings;
DROP POLICY IF EXISTS "Users can create bookings" ON property_bookings;
DROP POLICY IF EXISTS "Property owners can manage bookings" ON property_bookings;

-- Create policies for property_bookings
CREATE POLICY "property_bookings_select_policy" 
  ON property_bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "property_bookings_insert_policy"
  ON property_bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "property_bookings_manage_policy"
  ON property_bookings
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = property_bookings.property_id
      AND properties.owner_id = auth.uid()
    )
  );

-- Create new indexes
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_listing_type ON properties(listing_type);
CREATE INDEX IF NOT EXISTS idx_property_bookings_property ON property_bookings(property_id);
CREATE INDEX IF NOT EXISTS idx_property_bookings_user ON property_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_property_bookings_dates ON property_bookings(start_date, end_date);

-- Add helper function
CREATE OR REPLACE FUNCTION check_property_availability(
  property_id uuid,
  start_date timestamptz,
  end_date timestamptz
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM property_bookings
    WHERE property_bookings.property_id = $1
    AND status = 'confirmed'
    AND (
      (start_date, end_date) OVERLAPS (property_bookings.start_date, property_bookings.end_date)
    )
  );
END;
$$;