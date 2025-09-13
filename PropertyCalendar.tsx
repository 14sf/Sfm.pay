import React from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Users } from 'lucide-react';

const PropertyCalendar: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <CalendarIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Property Calendar
        </h3>
      </div>

      <div className="space-y-4">
        {/* Calendar Events */}
        <div className="space-y-2">
          {[
            { title: 'Property Viewing', time: '10:00 AM', guests: 2, date: 'Today' },
            { title: 'Maintenance Visit', time: '2:00 PM', guests: 1, date: 'Tomorrow' },
            { title: 'Lease Signing', time: '11:30 AM', guests: 3, date: 'Mar 15' }
          ].map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {event.title}
                </h4>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-sm">{event.guests} people</span>
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {event.date}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyCalendar;