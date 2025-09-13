import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Shield, Globe } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

const PropertySettings: React.FC = () => {
  const { showToast } = useToast();

  const handleSave = () => {
    showToast('Settings saved successfully!', 'success');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Settings
        </h3>
      </div>

      <div className="space-y-6">
        {/* Notification Settings */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Notification Preferences
          </h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              <span className="text-gray-700 dark:text-gray-300">
                Payment reminders
              </span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              <span className="text-gray-700 dark:text-gray-300">
                Maintenance updates
              </span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              <span className="text-gray-700 dark:text-gray-300">
                Tenant communications
              </span>
            </label>
          </div>
        </div>

        {/* Security Settings */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Security Settings
          </h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              <span className="text-gray-700 dark:text-gray-300">
                Two-factor authentication
              </span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              <span className="text-gray-700 dark:text-gray-300">
                Login notifications
              </span>
            </label>
          </div>
        </div>

        {/* Regional Settings */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Regional Settings
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Currency
              </label>
              <select className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700">
                <option value="SFM">SFM Token</option>
                <option value="USD">US Dollar</option>
                <option value="RWF">Rwandan Franc</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Language
              </label>
              <select className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700">
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="rw">Kinyarwanda</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PropertySettings;