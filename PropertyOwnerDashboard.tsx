import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, DollarSign, FileText, Bell, Users, Wrench } from 'lucide-react';
import PropertyManager from './PropertyManager';
import PaymentTracking from './PaymentTracking';
import DocumentManager from '../documents/DocumentManager';
import PropertySearchPage from '../search/PropertySearchPage';
import SFMMessenger from '../../messenger/SFMMessenger';
import TeamManagement from '../team/TeamManagement';
import PropertyCalendar from '../calendar/PropertyCalendar';
import PropertySettings from '../settings/PropertySettings';
import { useToast } from '../../../hooks/useToast';

interface PropertyOwnerDashboardProps {
  activeTab: 'dashboard' | 'search' | 'payments' | 'documents' | 'messages' | 'team' | 'calendar' | 'settings';
}

const PropertyOwnerDashboard: React.FC<PropertyOwnerDashboardProps> = ({ activeTab }) => {
  const { showToast } = useToast();

  const stats = [
    { label: 'Total Properties', value: '5', icon: Building, color: 'blue' },
    { label: 'Monthly Revenue', value: '24,500 SFM', icon: DollarSign, color: 'green' },
    { label: 'Active Tenants', value: '8', icon: Users, color: 'yellow' },
    { label: 'Maintenance', value: '2', icon: Wrench, color: 'red' }
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

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {activeTab === 'dashboard' && <PropertyManager />}
        {activeTab === 'search' && <PropertySearchPage />}
        {activeTab === 'payments' && <PaymentTracking />}
        {activeTab === 'documents' && <DocumentManager />}
        {activeTab === 'messages' && <SFMMessenger />}
        {activeTab === 'team' && <TeamManagement />}
        {activeTab === 'calendar' && <PropertyCalendar />}
        {activeTab === 'settings' && <PropertySettings />}
      </motion.div>
    </div>
  );
};

export default PropertyOwnerDashboard;