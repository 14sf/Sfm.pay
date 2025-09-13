import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Search, DollarSign, BarChart, Settings } from 'lucide-react';
import PropertySearchPage from '../real-estate/search/PropertySearchPage';
import RealEstatePaymentManager from '../real-estate/RealEstatePaymentManager';
import PropertyOwnerDashboard from '../real-estate/owner/PropertyOwnerDashboard';
import { RoleType } from '../../types/real-estate/roles';
import { useToast } from '../../hooks/useToast';
import RoleSelector from '../real-estate/RoleSelector';

const SFMRealEstate: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<RoleType>('Owner');
  const [activeTab, setActiveTab] = useState<'search' | 'payments' | 'dashboard' | 'settings'>('search');
  const { showToast } = useToast();

  const handleRoleChange = (role: RoleType) => {
    setCurrentRole(role);
    showToast(`Switched to ${role} view`, 'success');
  };

  const tabs = [
    { id: 'search', label: 'Search', icon: Search },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                SFM Real Estate
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Find your perfect property in Rwanda
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <RoleSelector
              currentRole={currentRole}
              onRoleChange={handleRoleChange}
            />

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-4">
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
          </div>
        </div>

        {/* Main Content */}
        <motion.div
          key={`${currentRole}-${activeTab}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'search' && <PropertySearchPage />}
          {activeTab === 'payments' && <RealEstatePaymentManager />}
          {activeTab === 'dashboard' && <PropertyOwnerDashboard />}
          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Settings
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Configure your real estate preferences and notifications
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SFMRealEstate;