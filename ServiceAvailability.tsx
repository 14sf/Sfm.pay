import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Save } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

const ServiceAvailability: React.FC = () => {
  const [availability, setAvailability] = useState({
    monday: { enabled: true, start: '09:00', end: '17:00' },
    tuesday: { enabled: true, start: '09:00', end: '17:00' },
    wednesday: { enabled: true, start: '09:00', end: '17:00' },
    thursday: { enabled: true, start: '09:00', end: '17:00' },
    friday: { enabled: true, start: '09:00', end: '17:00' },
    saturday: { enabled: false, start: '09:00', end: '17:00' },
    sunday: { enabled: false, start: '09:00', end: '17:00' }
  });

  const { showToast } = useToast();

  const handleSave = () => {
    showToast('Availability updated successfully!', 'success');
  };

  const handleDayToggle = (day: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled
      }
    }));
  };

  const handleTimeChange = (day: string, type: 'start' | 'end', value: string) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value
      }
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Working Hours
          </h3>
        </div>
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

      <div className="space-y-4">
        {Object.entries(availability).map(([day, { enabled, start, end }]) => (
          <div key={day} className="flex items-center gap-4">
            <div className="w-32">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={() => handleDayToggle(day)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white capitalize">
                  {day}
                </span>
              </label>
            </div>

            <div className="flex items-center gap-4 flex-1">
              <input
                type="time"
                value={start}
                onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                disabled={!enabled}
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 disabled:opacity-50"
              />
              <span className="text-gray-500 dark:text-gray-400">to</span>
              <input
                type="time"
                value={end}
                onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                disabled={!enabled}
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 disabled:opacity-50"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Additional Settings */}
      <div className="mt-6 space-y-4">
        <h4 className="font-medium text-gray-900 dark:text-white">Additional Settings</h4>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-gray-700 dark:text-gray-300">
              Accept same-day bookings
            </span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-gray-700 dark:text-gray-300">
              Allow instant booking
            </span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-gray-700 dark:text-gray-300">
              Receive booking notifications
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ServiceAvailability;