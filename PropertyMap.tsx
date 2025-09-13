import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Property } from '../../../types/real-estate/property';

interface PropertyMapProps {
  properties: Property[];
  selectedProperty?: Property | null;
  onSelectProperty: (property: Property) => void;
}

const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  selectedProperty,
  onSelectProperty
}) => {
  const center = properties.length > 0 
    ? properties[0].location.coordinates
    : { latitude: -1.9441, longitude: 30.0619 }; // Default to Kigali

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="relative aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>Map centered at:</p>
            <p className="font-mono">
              {center.latitude.toFixed(4)}, {center.longitude.toFixed(4)}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-900 dark:text-white">
            {properties.length} Properties Found
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Click on a property to view details
          </span>
        </div>

        {properties.map(property => (
          <motion.button
            key={property.id}
            whileHover={{ x: 4 }}
            onClick={() => onSelectProperty(property)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
              selectedProperty?.id === property.id
                ? 'bg-blue-50 dark:bg-blue-900/20'
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <MapPin className={`w-5 h-5 ${
              selectedProperty?.id === property.id
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-400'
            }`} />
            <div className="text-left">
              <p className={`font-medium ${
                selectedProperty?.id === property.id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-900 dark:text-white'
              }`}>
                {property.title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {property.location.sector}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default PropertyMap;