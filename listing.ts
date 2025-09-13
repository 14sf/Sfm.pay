export interface ServiceListing {
  id: string;
  providerId: string;
  type: 'activity' | 'experience' | 'hotel' | 'house' | 'service';
  title: string;
  description: string;
  location: {
    address: string;
    city: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  pricing: {
    amount: number;
    currency: string;
    per: 'hour' | 'day' | 'night' | 'person' | 'session';
  };
  images: string[];
  amenities?: string[];
  features?: string[];
  capacity?: {
    min: number;
    max: number;
  };
  availability: {
    days: string[];
    hours: string[];
    exceptions?: string[];
  };
  instantBook: boolean;
  cancellationPolicy: 'flexible' | 'moderate' | 'strict';
  status: 'draft' | 'published' | 'archived';
  createdAt: number;
  updatedAt: number;
}

export interface ListingFilters {
  type?: ServiceListing['type'];
  city?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  dates?: {
    start: Date;
    end: Date;
  };
  capacity?: number;
  amenities?: string[];
}