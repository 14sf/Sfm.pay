import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, Star, Clock, Calendar } from 'lucide-react';
import ServiceBookingList from './ServiceBookingList';
import ServicePricing from './ServicePricing';
import ServiceAvailability from './ServiceAvailability';
import { useToast } from '../../hooks/useToast';

const ServiceProviderDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'pricing' | 'availability'>('bookings');
  const { showToast } = useToast();

  const stats = [
    { label: 'Total Bookings', value: '24', icon: Briefcase, color: 'blue' },
    { label: 'Earnings', value: '2,500 SFM', icon: DollarSign, color: 'green' },
    { label: 'Rating', value: '4.8', icon: Star, color: 'yellow' },
    { label: 'Hours Worked', value: '156', icon: Clock, color: 'purple' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 bg-${color}-100 dark:bg-${color}-900 rounded-lg`}>
                <Icon className={`w-6 h-6 text-${color}-600 dark:text-${color}-400`} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap gap-4">
        {[
          { id: 'bookings', label: 'Bookings', icon: Calendar },
          { id: 'pricing', label: 'Pricing', icon: DollarSign },
          { id: 'availability', label: 'Availability', icon: Clock }
        ].map(({ id, label, icon: Icon }) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(id as typeof activeTab)}
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
      >
        {activeTab === 'bookings' && <ServiceBookingList />}
        {activeTab === 'pricing' && <ServicePricing />}
        {activeTab === 'availability' && <ServiceAvailability />}
      </motion.div>
    </div>
  );
};

export default ServiceProviderDashboard;