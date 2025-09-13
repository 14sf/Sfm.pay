import React from 'react';
import { motion } from 'framer-motion';
import { Property } from '../../../types/real-estate/property';
import PropertyCard from './PropertyCard';

interface PropertyListProps {
  properties: Property[];
  isLoading: boolean;
  onSelectProperty: (property: Property) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({
  properties,
  isLoading,
  onSelectProperty
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {properties.map((property, index) => (
        <motion.div
          key={property.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <PropertyCard
            property={property}
            onSelect={onSelectProperty}
          />
        </motion.div>
      ))}

      {properties.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No properties found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertyList;