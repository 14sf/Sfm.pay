import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Home } from 'lucide-react';
import { Property } from '../../../types/real-estate/property';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative h-48">
        <img
          src={property.images[0]}
          alt={`${property.title} - ${property.category} in ${property.location.sector}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 px-2 py-1 bg-blue-600 text-white text-sm rounded">
          {property.type === 'sale' ? 'For Sale' : 'For Rent'}
        </div>
        <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/50 text-white text-sm rounded">
          {property.images.length} photos
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {property.title}
        </h3>

        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{property.location.sector}</span>
          {property.location.coordinates && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                window.open(
                  `https://www.google.com/maps?q=${property.location.coordinates.latitude},${property.location.coordinates.longitude}`,
                  '_blank'
                );
              }}
              className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
            >
              View on map
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
          <Home className="w-4 h-4" />
          <span className="text-sm capitalize">{property.category}</span>
          {property.features?.length > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              • {property.features.length} features
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-blue-600 dark:text-blue-400">
            <DollarSign className="w-5 h-5" />
            <span className="text-xl font-bold">
              {property.price.toLocaleString()} {property.type === 'rent' && '/mo'}
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(property)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;