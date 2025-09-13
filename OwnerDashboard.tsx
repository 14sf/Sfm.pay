import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, DollarSign, Tool, FileText, Bell } from 'lucide-react';
import PropertyManager from './PropertyManager';
import PaymentTracking from './PaymentTracking';
import DocumentManager from './DocumentManager';
import { useToast } from '../../../hooks/useToast';

const OwnerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'properties' | 'payments' | 'documents' | 'maintenance'>('properties');
  const { showToast } = useToast();

  const stats = [
    { label: 'Total Properties', value: '5', icon: Building, color: 'blue' },
    { label: 'Monthly Revenue', value: '24,500 SFM', icon: DollarSign, color: 'green' },
    { label: 'Pending Issues', value: '2', icon: Tool, color: 'yellow' },
    { label: 'Documents', value: '15', icon: FileText, color: 'purple' }
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
          { id: 'properties', label: 'Properties', icon: Building },
          { id: 'payments', label: 'Payments', icon: DollarSign },
          { id: 'documents', label: 'Documents', icon: FileText },
          { id: 'maintenance', label: 'Maintenance', icon: Tool }
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
        {activeTab === 'properties' && <PropertyManager />}
        {activeTab === 'payments' && <PaymentTracking />}
        {activeTab === 'documents' && <DocumentManager />}
        {activeTab === 'maintenance' && <MaintenanceManager />}
      </motion.div>
    </div>
  );
};

export default OwnerDashboard;