import { useState, useCallback } from 'react';
import { Property, PropertyFilters } from '../../types/real-estate/property';
import { useToast } from '../useToast';

// Mock data for demonstration
const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Villa in Kigali',
    description: 'Beautiful modern villa with stunning city views',
    price: 450000,
    category: 'villa',
    location: {
      sector: 'Kigali',
      coordinates: {
        latitude: -1.9441,
        longitude: 30.0619
      }
    },
    features: ['Swimming Pool', 'Garden', 'Security'],
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3'],
    status: 'available',
    type: 'sale',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    ownerId: '1'
  },
  {
    id: '2',
    title: 'Luxury Apartment in Musanze',
    description: 'Modern apartment with mountain views',
    price: 250000,
    category: 'apartment',
    location: {
      sector: 'Musanze',
      coordinates: {
        latitude: -1.4973,
        longitude: 29.6342
      }
    },
    features: ['Parking', 'Security', 'Balcony'],
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3'],
    status: 'available',
    type: 'sale',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    ownerId: '1'
  }
];

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const searchProperties = useCallback(async (filters: PropertyFilters) => {
    setIsLoading(true);
    try {
      // In a real app, this would make an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      let filteredProperties = [...MOCK_PROPERTIES];

      if (filters.listingType) {
        filteredProperties = filteredProperties.filter(property =>
          property.type === filters.listingType
        );
      }

      if (filters.location) {
        filteredProperties = filteredProperties.filter(property =>
          property.location.sector.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.category) {
        filteredProperties = filteredProperties.filter(property =>
          property.category === filters.category
        );
      }

      if (filters.minPrice) {
        filteredProperties = filteredProperties.filter(property =>
          property.price >= filters.minPrice!
        );
      }

      if (filters.maxPrice) {
        filteredProperties = filteredProperties.filter(property =>
          property.price <= filters.maxPrice!
        );
      }

      setProperties(filteredProperties);
    } catch (error) {
      console.error('Error searching properties:', error);
      showToast('Failed to search properties', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  return {
    properties,
    isLoading,
    searchProperties
  };
};