import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Users, Bed, Bath } from 'lucide-react';
import { Accommodation } from '../../../types/booking/accommodation';

interface AccommodationCardProps {
  accommodation: Accommodation;
  onSelect: (accommodation: Accommodation) => void;
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodation, onSelect }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm"
    >
      {/* Image Gallery */}
      <div className="relative h-48">
        <img
          src={accommodation.images[0]}
          alt={accommodation.title}
          className="w-full h-full object-cover"
        />
        {accommodation.superHost && (
          <div className="absolute top-4 left-4 px-2 py-1 bg-white dark:bg-gray-800 text-sm font-medium text-gray-900 dark:text-white rounded-full">
            Superhost
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {accommodation.location.city}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {accommodation.rating}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({accommodation.reviews})
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {accommodation.title}
        </h3>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {accommodation.capacity.guests} guests
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {accommodation.capacity.bedrooms} bedrooms
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {accommodation.capacity.bathrooms} baths
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {accommodation.price.amount} {accommodation.price.currency}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {' '}/ {accommodation.price.per}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(accommodation)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {accommodation.instantBook ? 'Book Now' : 'View Details'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default AccommodationCard;