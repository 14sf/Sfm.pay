import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Search, DollarSign, BarChart, Settings, MessageSquare, FileText, Users, Calendar } from 'lucide-react';
import { RoleType } from '../../types/real-estate/roles';
import RoleSelector from './RoleSelector';
import RealEstateDashboard from './RealEstateDashboard';
import PropertyOwnerDashboard from './owner/PropertyOwnerDashboard';
import TenantDashboard from './tenant/TenantDashboard';
import { useToast } from '../../hooks/useToast';

const RealEstateManager: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<RoleType>('Owner');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'search' | 'payments' | 'documents' | 'team' | 'calendar' | 'settings'>('dashboard');
  const { showToast } = useToast();

  const handleRoleChange = (role: RoleType) => {
    setCurrentRole(role);
    showToast(`Switched to ${role} view`, 'success');
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'payments', label: 'Payments', icon: DollarSign },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];
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

          <RoleSelector
            currentRole={currentRole}
            onRoleChange={handleRoleChange}
          />

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-4 mt-8">
            {navigationItems.map(({ id, label, icon: Icon }) => (
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
          {/* Main Content */}
          <motion.div
            key={`${currentRole}-${activeTab}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-8"
          >
            {currentRole === 'Owner' ? (
              <PropertyOwnerDashboard activeTab={activeTab} />
            ) : (
              <TenantDashboard activeTab={activeTab} />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateManager;