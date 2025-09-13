import { useState, useEffect } from 'react';
import { Accommodation } from '../../types/booking/accommodation';

export const useAccommodations = (type?: 'all' | 'hotel' | 'house', filters?: any) => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([
    {
      id: '1',
      type: 'hotel',
      title: 'Kigali Marriott Hotel',
      description: 'Luxury hotel in the heart of Kigali',
      location: {
        address: 'KN 3 Ave',
        city: 'Kigali',
        coordinates: {
          latitude: -1.9441,
          longitude: 30.0619
        }
      },
      images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3'],
      price: {
        amount: 200,
        currency: 'USD',
        per: 'night'
      },
      amenities: ['wifi', 'pool', 'parking', 'breakfast'],
      rating: 4.8,
      reviews: 245,
      capacity: {
        guests: 2,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1
      },
      status: 'available',
      instantBook: true,
      superHost: true
    },
    {
      id: '2',
      type: 'house',
      title: 'Modern Villa with Pool',
      description: 'Spacious villa with stunning views',
      location: {
        address: 'Nyarutarama',
        city: 'Kigali',
        coordinates: {
          latitude: -1.9441,
          longitude: 30.0619
        }
      },
      images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3'],
      price: {
        amount: 300,
        currency: 'USD',
        per: 'night'
      },
      amenities: ['wifi', 'pool', 'parking'],
      rating: 4.9,
      reviews: 122,
      capacity: {
        guests: 6,
        bedrooms: 3,
        beds: 4,
        bathrooms: 2
      },
      status: 'available',
      instantBook: false,
      superHost: true
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call with filters
    setTimeout(() => {
      let filtered = [...accommodations];
      
      if (type && type !== 'all') {
        filtered = filtered.filter(acc => acc.type === type);
      }

      if (filters?.priceRange) {
        filtered = filtered.filter(acc => 
          acc.price.amount >= (filters.priceRange.min || 0) &&
          acc.price.amount <= (filters.priceRange.max || Infinity)
        );
      }

      if (filters?.guests) {
        filtered = filtered.filter(acc => 
          acc.capacity.guests >= filters.guests
        );
      }

      if (filters?.amenities?.length) {
        filtered = filtered.filter(acc => 
          filters.amenities.every((amenity: string) => 
            acc.amenities.includes(amenity)
          )
        );
      }

      setAccommodations(filtered);
      setIsLoading(false);
    }, 500);
  }, [type, filters]);

  return { accommodations, isLoading };
};