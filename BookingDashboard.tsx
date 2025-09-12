import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Wine, Bike, Calendar } from 'lucide-react';
import ActivityList from './activities/ActivityList';
import CourseList from './courses/CourseList';
import TastingList from './tastings/TastingList';
import BookingCalendar from './calendar/BookingCalendar';

const BookingDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'activities' | 'courses' | 'tastings' | 'calendar'>('activities');

  const tabs = [
    { id: 'activities', label: 'Leisure Activities', icon: Bike },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'tastings', label: 'Tastings', icon: Wine },
    { id: 'calendar', label: 'Calendar', icon: Calendar }
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            SFM Booking
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Book activities, courses, and tastings
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === id
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'activities' && <ActivityList />}
          {activeTab === 'courses' && <CourseList />}
          {activeTab === 'tastings' && <TastingList />}
          {activeTab === 'calendar' && <BookingCalendar />}
        </motion.div>
      </div>
    </div>
  );
};

export default BookingDashboard;