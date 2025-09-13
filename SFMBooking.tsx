import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Building, Briefcase } from 'lucide-react';
import BookingDashboard from '../booking/BookingDashboard';
import AccommodationDashboard from '../booking/accommodation/AccommodationDashboard';
import ServiceProviderDashboard from '../services/ServiceProviderDashboard';
import ServiceProviderList from '../services/ServiceProviderList';
import ServiceProviderRegistration from '../services/ServiceProviderRegistration';

const SFMBooking: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'activities' | 'accommodation' | 'services'>('activities');
  const [isProvider, setIsProvider] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Section Selector */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveSection('activities')}
              className={`py-4 px-1 relative ${
                activeSection === 'activities'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Activities & Experiences</span>
              </div>
              {activeSection === 'activities' && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveSection('accommodation')}
              className={`py-4 px-1 relative ${
                activeSection === 'accommodation'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                <span>Hotels & Houses</span>
              </div>
              {activeSection === 'accommodation' && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveSection('services')}
              className={`py-4 px-1 relative ${
                activeSection === 'services'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                <span>Service Providers</span>
              </div>
              {activeSection === 'services' && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {activeSection === 'activities' && <BookingDashboard />}
        {activeSection === 'accommodation' && <AccommodationDashboard />}
        {activeSection === 'services' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Service Providers
              </h2>
              {!isProvider && !showRegistration && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowRegistration(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Become a Provider
                </motion.button>
              )}
            </div>

            {showRegistration ? (
              <ServiceProviderRegistration />
            ) : isProvider ? (
              <ServiceProviderDashboard />
            ) : (
              <ServiceProviderList />
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SFMBooking;