export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  category: 'villa' | 'apartment' | 'house' | 'office';
  location: {
    sector: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  features: string[];
  images: string[];
  status: 'available' | 'rented' | 'sold';
  type: 'sale' | 'rent';
  createdAt: number;
  updatedAt: number;
  ownerId: string;
}

export interface PropertyFilters {
  location?: string;
  category?: Property['category'];
  listingType: 'sale' | 'rent';
  minPrice?: number;
  maxPrice?: number;
}

export interface PropertyBooking {
  id: string;
  propertyId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface PropertyLocation {
  sector: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export const RWANDA_SECTORS = [
  'Kigali',
  'Musanze',
  'Huye',
  'Rubavu',
  'Nyagatare',
  'Muhanga',
  'Rusizi',
  'Nyanza',
  'Rwamagana',
  'Gisenyi'
] as const;