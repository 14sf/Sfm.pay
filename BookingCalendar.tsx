import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Bike, GraduationCap, Wine } from 'lucide-react';
import { useBookings } from '../../../hooks/useBookings';

const BookingCalendar: React.FC = () => {
  const { bookings } = useBookings();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Your Bookings
          </h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          New Booking
        </motion.button>
      </div>

      <div className="space-y-4">
        {bookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${
                booking.type === 'activity'
                  ? 'bg-blue-100 dark:bg-blue-900'
                  : booking.type === 'course'
                  ? 'bg-purple-100 dark:bg-purple-900'
                  : 'bg-red-100 dark:bg-red-900'
              }`}>
                {booking.type === 'activity' ? (
                  <Bike className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                ) : booking.type === 'course' ? (
                  <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                ) : (
                  <Wine className="w-5 h-5 text-red-600 dark:text-red-400" />
                )}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {booking.title}
                </h4>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{booking.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-sm">{booking.participants} people</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20"
              >
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BookingCalendar;