import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Home, DollarSign, Bell } from 'lucide-react';
import PropertySearchPage from '../search/PropertySearchPage';
import RealEstatePaymentForm from '../payment/RealEstatePaymentForm';
import { useToast } from '../../../hooks/useToast';

const TenantDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'search' | 'payments' | 'notifications'>('search');
  const { showToast } = useToast();

  const stats = [
    { label: 'Active Rentals', value: '1', icon: Home, color: 'blue' },
    { label: 'Monthly Rent', value: '1,500 SFM', icon: DollarSign, color: 'green' },
    { label: 'Notifications', value: '3', icon: Bell, color: 'yellow' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          { id: 'search', label: 'Find Property', icon: Search },
          { id: 'payments', label: 'Payments', icon: DollarSign },
          { id: 'notifications', label: 'Notifications', icon: Bell }
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
        {activeTab === 'search' && <PropertySearchPage />}
        {activeTab === 'payments' && <RealEstatePaymentForm />}
        {activeTab === 'notifications' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Notifications
            </h3>
            <div className="space-y-4">
              {[
                { text: 'Rent payment due in 5 days', time: '2h ago', type: 'payment' },
                { text: 'New maintenance request update', time: '1d ago', type: 'maintenance' },
                { text: 'Property inspection scheduled', time: '2d ago', type: 'inspection' }
              ].map((notification, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <span className="text-gray-900 dark:text-white">{notification.text}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{notification.time}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TenantDashboard;