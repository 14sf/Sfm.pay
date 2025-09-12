import React from 'react';
import { motion } from 'framer-motion';
import { Wine, Clock, Users, MapPin } from 'lucide-react';
import { useBookings } from '../../../hooks/useBookings';

const TastingList: React.FC = () => {
  const { tastings } = useBookings();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tastings.map((tasting, index) => (
        <motion.div
          key={tasting.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm"
        >
          <div className="relative h-48">
            <img
              src={tasting.image}
              alt={tasting.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 px-2 py-1 bg-red-600 text-white text-sm rounded">
              {tasting.category}
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {tasting.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {tasting.description}
            </p>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">{tasting.duration}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4 mr-1" />
                <span className="text-sm">{tasting.groupSize} people max</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{tasting.location}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Book Tasting
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TastingList;