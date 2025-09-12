import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';
import { useAccommodationSearch } from '../../../hooks/booking/useAccommodationSearch';
import { Accommodation } from '../../../types/booking/accommodation';

const AccommodationMap: React.FC = () => {
  const { results } = useAccommodationSearch();
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
      {/* Map Placeholder - In a real app, this would be a Google Maps component */}
      <div className="relative h-[calc(100vh-16rem)] bg-gray-100 dark:bg-gray-700">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            Interactive map will be implemented here
          </p>
        </div>

        {/* Selected Accommodation Info */}
        {selectedAccommodation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            <div className="flex gap-4">
              <img
                src={selectedAccommodation.images[0]}
                alt={selectedAccommodation.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {selectedAccommodation.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {selectedAccommodation.rating}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {selectedAccommodation.location.address}
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {selectedAccommodation.price.amount} {selectedAccommodation.price.currency}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {' '}/ {selectedAccommodation.price.per}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AccommodationMap;