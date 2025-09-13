import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, Users, TrendingUp, Settings } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

const VacationRentalManager: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<'high' | 'low'>('high');
  const { showToast } = useToast();

  const handlePriceUpdate = () => {
    showToast('Dynamic pricing updated successfully!', 'success');
  };

  const metrics = [
    {
      label: 'Average Daily Rate',
      value: selectedSeason === 'high' ? '$250' : '$150',
      change: '+12%',
      icon: DollarSign
    },
    {
      label: 'Occupancy Rate',
      value: selectedSeason === 'high' ? '95%' : '75%',
      change: '+5%',
      icon: Users
    },
    {
      label: 'Revenue',
      value: selectedSeason === 'high' ? '$7,500' : '$4,500',
      change: '+15%',
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Vacation Rental Management
        </h2>
        <select
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(e.target.value as 'high' | 'low')}
          className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
        >
          <option value="high">High Season</option>
          <option value="low">Low Season</option>
        </select>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <metric.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-green-600 dark:text-green-400 text-sm">
                {metric.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {metric.value}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {metric.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Dynamic Pricing */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Dynamic Pricing Settings
            </h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePriceUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Update Pricing
          </motion.button>
        </div>

        <div className="space-y-4">
          {/* Price Adjustments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Weekend Adjustment
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  defaultValue="20"
                  className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                />
                <span className="ml-2 text-gray-600 dark:text-gray-400">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Holiday Adjustment
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  defaultValue="50"
                  className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                />
                <span className="ml-2 text-gray-600 dark:text-gray-400">%</span>
              </div>
            </div>
          </div>

          {/* Booking Rules */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Booking Rules
            </h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-gray-700 dark:text-gray-300">
                  Minimum 2-night stay on weekends
                </span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-gray-700 dark:text-gray-300">
                  Automatic price adjustment for last-minute bookings
                </span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="text-gray-700 dark:text-gray-300">
                  Early bird discounts (30+ days in advance)
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Availability Calendar
          </h3>
        </div>
        <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">
            Calendar integration will be implemented here
          </p>
        </div>
      </div>
    </div>
  );
};

export default VacationRentalManager;