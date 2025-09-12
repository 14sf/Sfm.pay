import React from 'react';
import { motion } from 'framer-motion';
import { Bike, Map, Clock, Users } from 'lucide-react';
import { useBookings } from '../../../hooks/useBookings';

const ActivityList: React.FC = () => {
  const { activities } = useBookings();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm"
        >
          <div className="relative h-48">
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 px-2 py-1 bg-blue-600 text-white text-sm rounded">
              {activity.category}
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {activity.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {activity.description}
            </p>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">{activity.duration}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Users className="w-4 h-4 mr-1" />
                <span className="text-sm">{activity.groupSize} people</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Map className="w-4 h-4 mr-1" />
                <span className="text-sm">{activity.location}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Book Now
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ActivityList;