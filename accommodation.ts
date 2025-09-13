export interface Accommodation {
  id: string;
  type: 'hotel' | 'house';
  title: string;
  description: string;
  location: {
    address: string;
    city: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  images: string[];
  price: {
    amount: number;
    currency: string;
    per: 'night' | 'week' | 'month';
  };
  amenities: string[];
  rating: number;
  reviews: number;
  host?: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
  };
  capacity: {
    guests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };
  status: 'available' | 'booked';
  instantBook: boolean;
  superHost?: boolean;
}

export interface AccommodationFilters {
  type?: 'hotel' | 'house';
  city?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  dates?: {
    checkIn: Date;
    checkOut: Date;
  };
  guests?: number;
  amenities?: string[];
}