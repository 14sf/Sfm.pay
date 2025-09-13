export interface ServiceProvider {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  location: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  availability: {
    days: string[];
    hours: string[];
  };
  skills: string[];
  languages: string[];
  verified: boolean;
  profileImage: string;
  gallery?: string[];
  bookingCount: number;
  completionRate: number;
}

export type ServiceCategory = 
  | 'activities'
  | 'experiences'
  | 'hotels'
  | 'houses'
  | 'services';

export interface ServiceBooking {
  id: string;
  providerId: string;
  clientId: string;
  service: ServiceCategory;
  date: string;
  time: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  paymentStatus: 'pending' | 'paid';
  notes?: string;
  createdAt: number;
}