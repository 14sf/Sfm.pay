export interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  duration: string;
  groupSize: number;
  location: string;
  price: number;
  rating?: number;
  availableSpots: number;
  startDate: string;
  endDate: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  duration: string;
  instructor: string;
  spots: number;
  price: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  startDate: string;
  schedule: string[];
}

export interface Tasting {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  duration: string;
  groupSize: number;
  location: string;
  price: number;
  menu: string[];
  date: string;
  time: string;
}

export interface Booking {
  id: string;
  type: 'activity' | 'course' | 'tasting';
  title: string;
  date: string;
  time: string;
  participants: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  totalPrice: number;
  userId: string;
  createdAt: string;
}