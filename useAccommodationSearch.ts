import { useState, useEffect } from 'react';
import { Accommodation, AccommodationFilters } from '../../types/booking/accommodation';

export const useAccommodationSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<AccommodationFilters>({});
  const [results, setResults] = useState<Accommodation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchAccommodations = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock data
        const mockResults: Accommodation[] = [
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
        ];

        // Apply filters
        let filteredResults = [...mockResults];

        if (filters.type) {
          filteredResults = filteredResults.filter(acc => acc.type === filters.type);
        }

        if (filters.city) {
          filteredResults = filteredResults.filter(acc => 
            acc.location.city.toLowerCase().includes(filters.city!.toLowerCase())
          );
        }

        if (filters.priceRange) {
          filteredResults = filteredResults.filter(acc =>
            acc.price.amount >= (filters.priceRange?.min || 0) &&
            acc.price.amount <= (filters.priceRange?.max || Infinity)
          );
        }

        if (filters.guests) {
          filteredResults = filteredResults.filter(acc =>
            acc.capacity.guests >= filters.guests!
          );
        }

        if (filters.amenities?.length) {
          filteredResults = filteredResults.filter(acc =>
            filters.amenities!.every(amenity => acc.amenities.includes(amenity))
          );
        }

        setResults(filteredResults);
      } catch (error) {
        console.error('Error searching accommodations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    searchAccommodations();
  }, [searchQuery, filters]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    results,
    isLoading
  };
};