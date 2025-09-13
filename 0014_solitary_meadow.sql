-- Create activity categories enum
CREATE TYPE activity_category AS ENUM (
  'adventure',
  'cultural',
  'educational',
  'entertainment',
  'food',
  'sports',
  'wellness',
  'other'
);

-- Create accommodation types enum
CREATE TYPE accommodation_type AS ENUM (
  'hotel',
  'guesthouse',
  'apartment',
  'villa',
  'resort',
  'hostel'
);

-- Create booking status enum
CREATE TYPE booking_status AS ENUM (
  'pending',
  'confirmed',
  'completed',
  'cancelled'
);

-- Create payment status enum
CREATE TYPE payment_status AS ENUM (
  'pending',
  'paid',
  'refunded',
  'failed'
);

-- Create activities table
CREATE TABLE activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES auth.users(id) NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  category activity_category NOT NULL,
  location jsonb NOT NULL,
  price numeric NOT NULL,
  currency text NOT NULL DEFAULT 'SFM',
  duration interval NOT NULL,
  max_participants integer NOT NULL,
  min_participants integer DEFAULT 1,
  images text[] DEFAULT '{}',
  included text[] DEFAULT '{}',
  requirements text[] DEFAULT '{}',
  cancellation_policy text NOT NULL,
  instant_booking boolean DEFAULT false,
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_price CHECK (price > 0),
  CONSTRAINT valid_participants CHECK (max_participants >= min_participants),
  CONSTRAINT valid_rating CHECK (rating >= 0 AND rating <= 5)
);

-- Create accommodations table
CREATE TABLE accommodations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES auth.users(id) NOT NULL,
  type accommodation_type NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  location jsonb NOT NULL,
  price numeric NOT NULL,
  currency text NOT NULL DEFAULT 'SFM',
  price_per text NOT NULL DEFAULT 'night',
  max_guests integer NOT NULL,
  bedrooms integer NOT NULL,
  beds integer NOT NULL,
  bathrooms numeric NOT NULL,
  images text[] DEFAULT '{}',
  amenities text[] DEFAULT '{}',
  house_rules text[] DEFAULT '{}',
  cancellation_policy text NOT NULL,
  instant_booking boolean DEFAULT false,
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_price CHECK (price > 0),
  CONSTRAINT valid_guests CHECK (max_guests > 0),
  CONSTRAINT valid_rooms CHECK (bedrooms > 0 AND beds > 0 AND bathrooms > 0),
  CONSTRAINT valid_rating CHECK (rating >= 0 AND rating <= 5)
);

-- Create activity bookings table
CREATE TABLE activity_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id uuid REFERENCES activities(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  booking_date date NOT NULL,
  start_time time NOT NULL,
  participants integer NOT NULL,
  total_amount numeric NOT NULL,
  status booking_status NOT NULL DEFAULT 'pending',
  payment_status payment_status NOT NULL DEFAULT 'pending',
  payment_id text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_participants CHECK (participants > 0),
  CONSTRAINT valid_total_amount CHECK (total_amount > 0)
);

-- Create accommodation bookings table
CREATE TABLE accommodation_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  accommodation_id uuid REFERENCES accommodations(id) NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  check_in date NOT NULL,
  check_out date NOT NULL,
  guests integer NOT NULL,
  total_amount numeric NOT NULL,
  status booking_status NOT NULL DEFAULT 'pending',
  payment_status payment_status NOT NULL DEFAULT 'pending',
  payment_id text,
  special_requests text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_dates CHECK (check_out > check_in),
  CONSTRAINT valid_guests CHECK (guests > 0),
  CONSTRAINT valid_total_amount CHECK (total_amount > 0)
);

-- Create reviews table
CREATE TABLE booking_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_type text NOT NULL CHECK (booking_type IN ('activity', 'accommodation')),
  booking_id uuid NOT NULL,
  reviewer_id uuid REFERENCES auth.users(id) NOT NULL,
  rating integer NOT NULL,
  comment text,
  response text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_rating CHECK (rating >= 1 AND rating <= 5)
);

-- Enable RLS
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE accommodation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for activities
CREATE POLICY "Public users can view published activities"
  ON activities
  FOR SELECT
  TO authenticated
  USING (status = 'active');

CREATE POLICY "Providers can manage their activities"
  ON activities
  FOR ALL
  TO authenticated
  USING (provider_id = auth.uid())
  WITH CHECK (provider_id = auth.uid());

-- Create policies for accommodations
CREATE POLICY "Public users can view published accommodations"
  ON accommodations
  FOR SELECT
  TO authenticated
  USING (status = 'active');

CREATE POLICY "Providers can manage their accommodations"
  ON accommodations
  FOR ALL
  TO authenticated
  USING (provider_id = auth.uid())
  WITH CHECK (provider_id = auth.uid());

-- Create policies for activity bookings
CREATE POLICY "Users can view their activity bookings"
  ON activity_bookings
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create activity bookings"
  ON activity_bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create policies for accommodation bookings
CREATE POLICY "Users can view their accommodation bookings"
  ON accommodation_bookings
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create accommodation bookings"
  ON accommodation_bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create policies for reviews
CREATE POLICY "Public users can view reviews"
  ON booking_reviews
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create reviews for their bookings"
  ON booking_reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (
    reviewer_id = auth.uid() AND
    (
      (booking_type = 'activity' AND EXISTS (
        SELECT 1 FROM activity_bookings
        WHERE id = booking_id
        AND user_id = auth.uid()
        AND status = 'completed'
      )) OR
      (booking_type = 'accommodation' AND EXISTS (
        SELECT 1 FROM accommodation_bookings
        WHERE id = booking_id
        AND user_id = auth.uid()
        AND status = 'completed'
      ))
    )
  );

-- Create indexes
CREATE INDEX idx_activities_provider ON activities(provider_id);
CREATE INDEX idx_activities_category ON activities(category);
CREATE INDEX idx_activities_status ON activities(status);
CREATE INDEX idx_accommodations_provider ON accommodations(provider_id);
CREATE INDEX idx_accommodations_type ON accommodations(type);
CREATE INDEX idx_accommodations_status ON accommodations(status);
CREATE INDEX idx_activity_bookings_activity ON activity_bookings(activity_id);
CREATE INDEX idx_activity_bookings_user ON activity_bookings(user_id);
CREATE INDEX idx_activity_bookings_date ON activity_bookings(booking_date);
CREATE INDEX idx_accommodation_bookings_accommodation ON accommodation_bookings(accommodation_id);
CREATE INDEX idx_accommodation_bookings_user ON accommodation_bookings(user_id);
CREATE INDEX idx_accommodation_bookings_dates ON accommodation_bookings(check_in, check_out);
CREATE INDEX idx_booking_reviews_booking ON booking_reviews(booking_type, booking_id);

-- Add helper functions
CREATE OR REPLACE FUNCTION calculate_activity_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE activities
  SET 
    rating = (
      SELECT AVG(rating)::numeric(3,2)
      FROM booking_reviews
      WHERE booking_type = 'activity'
      AND booking_id IN (
        SELECT id FROM activity_bookings
        WHERE activity_id = NEW.booking_id
      )
    ),
    review_count = (
      SELECT COUNT(*)
      FROM booking_reviews
      WHERE booking_type = 'activity'
      AND booking_id IN (
        SELECT id FROM activity_bookings
        WHERE activity_id = NEW.booking_id
      )
    )
  WHERE id = (
    SELECT activity_id
    FROM activity_bookings
    WHERE id = NEW.booking_id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION calculate_accommodation_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE accommodations
  SET 
    rating = (
      SELECT AVG(rating)::numeric(3,2)
      FROM booking_reviews
      WHERE booking_type = 'accommodation'
      AND booking_id IN (
        SELECT id FROM accommodation_bookings
        WHERE accommodation_id = NEW.booking_id
      )
    ),
    review_count = (
      SELECT COUNT(*)
      FROM booking_reviews
      WHERE booking_type = 'accommodation'
      AND booking_id IN (
        SELECT id FROM accommodation_bookings
        WHERE accommodation_id = NEW.booking_id
      )
    )
  WHERE id = (
    SELECT accommodation_id
    FROM accommodation_bookings
    WHERE id = NEW.booking_id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_activity_rating
  AFTER INSERT OR UPDATE ON booking_reviews
  FOR EACH ROW
  WHEN (NEW.booking_type = 'activity')
  EXECUTE FUNCTION calculate_activity_rating();

CREATE TRIGGER update_accommodation_rating
  AFTER INSERT OR UPDATE ON booking_reviews
  FOR EACH ROW
  WHEN (NEW.booking_type = 'accommodation')
  EXECUTE FUNCTION calculate_accommodation_rating();

-- Add timestamp triggers
CREATE TRIGGER update_activities_updated_at
  BEFORE UPDATE ON activities
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accommodations_updated_at
  BEFORE UPDATE ON accommodations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activity_bookings_updated_at
  BEFORE UPDATE ON activity_bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_accommodation_bookings_updated_at
  BEFORE UPDATE ON accommodation_bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_booking_reviews_updated_at
  BEFORE UPDATE ON booking_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();