import React from 'react';
import { motion } from 'framer-motion';
import { Building, User } from 'lucide-react';
import { RoleType } from '../../types/real-estate/roles';

interface RoleSelectorProps {
  currentRole: RoleType;
  onRoleChange: (role: RoleType) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ currentRole, onRoleChange }) => {
  const roles = [
    { 
      type: 'Owner', 
      label: 'Property Owner',
      icon: Building,
      description: 'Manage your properties and tenants'
    },
    { 
      type: 'Tenant', 
      label: 'Tenant',
      icon: User,
      description: 'Find and rent properties'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {roles.map(({ type, label, icon: Icon, description }) => (
        <motion.button
          key={type}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onRoleChange(type)}
          className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${
            currentRole === type
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <div className={`p-3 rounded-lg ${
            currentRole === type 
              ? 'bg-blue-100 dark:bg-blue-900' 
              : 'bg-gray-100 dark:bg-gray-800'
          }`}>
            <Icon className={`w-6 h-6 ${
              currentRole === type
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400'
            }`} />
          </div>
          
          <div className="text-center">
            <h3 className={`font-semibold ${
              currentRole === type
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-900 dark:text-white'
            }`}>
              {label}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default RoleSelector;