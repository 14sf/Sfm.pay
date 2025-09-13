import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Save } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { ServiceCategory } from '../../types/service';

const ServicePricing: React.FC = () => {
  const [rates, setRates] = useState({
    hourlyRate: 50,
    minimumHours: 2,
    rushFee: 20,
    weekendRate: 75
  });
  const { showToast } = useToast();

  const handleSave = () => {
    // In a real app, this would make an API call
    showToast('Pricing updated successfully!', 'success');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Service Pricing
        </h3>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </motion.button>
      </div>

      <div className="space-y-6">
        {/* Base Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Hourly Rate (SFM)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={rates.hourlyRate}
              onChange={(e) => setRates({ ...rates, hourlyRate: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              min="0"
              step="5"
            />
          </div>
        </div>

        {/* Minimum Hours */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Minimum Hours
          </label>
          <input
            type="number"
            value={rates.minimumHours}
            onChange={(e) => setRates({ ...rates, minimumHours: Number(e.target.value) })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            min="1"
          />
        </div>

        {/* Rush Fee */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Rush Fee (SFM)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={rates.rushFee}
              onChange={(e) => setRates({ ...rates, rushFee: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              min="0"
              step="5"
            />
          </div>
        </div>

        {/* Weekend Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Weekend Rate (SFM)
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={rates.weekendRate}
              onChange={(e) => setRates({ ...rates, weekendRate: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              min="0"
              step="5"
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-blue-600 dark:text-blue-400 mb-2">
            Pricing Guidelines
          </h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Base rate applies to standard working hours (9 AM - 5 PM)</li>
            <li>• Weekend rate applies to Saturday and Sunday bookings</li>
            <li>• Rush fee applies to same-day bookings</li>
            <li>• All prices are in SFM tokens</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServicePricing;