import React from 'react';
import { motion } from 'framer-motion';
import AccommodationCard from './AccommodationCard';
import { useAccommodationSearch } from '../../../hooks/booking/useAccommodationSearch';
import { Accommodation } from '../../../types/booking/accommodation';

interface AccommodationListProps {
  type: 'all' | 'hotel' | 'house';
  filters: any;
}

const AccommodationList: React.FC<AccommodationListProps> = ({ type, filters }) => {
  const { results, isLoading } = useAccommodationSearch();

  const handleSelect = (accommodation: Accommodation) => {
    // Handle accommodation selection
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const filteredResults = type === 'all' 
    ? results 
    : results.filter(acc => acc.type === type);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredResults.map((accommodation, index) => (
        <motion.div
          key={accommodation.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <AccommodationCard
            accommodation={accommodation}
            onSelect={handleSelect}
          />
        </motion.div>
      ))}

      {filteredResults.length === 0 && (
        <div className="col-span-2 text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No accommodations found matching your criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default AccommodationList;