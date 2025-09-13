import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building } from 'lucide-react';

interface ListingTypeSelectorProps {
  value: 'sale' | 'rent';
  onChange: (type: 'sale' | 'rent') => void;
}

const ListingTypeSelector: React.FC<ListingTypeSelectorProps> = ({ value, onChange }) => {
  const types = [
    {
      id: 'sale',
      label: 'For Sale',
      icon: Home,
      description: 'Buy your dream property',
      color: 'blue'
    },
    {
      id: 'rent',
      label: 'For Rent',
      icon: Building,
      description: 'Long-term rentals',
      color: 'green'
    }
  ] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {types.map(type => (
        <motion.button
          key={type.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onChange(type.id)}
          className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${
            value === type.id
              ? `border-${type.color}-500 bg-${type.color}-50 dark:bg-${type.color}-900/20`
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        >
          <div className={`p-3 rounded-lg ${
            value === type.id
              ? `bg-${type.color}-100 dark:bg-${type.color}-900`
              : 'bg-gray-100 dark:bg-gray-800'
          }`}>
            <type.icon className={`w-6 h-6 ${
              value === type.id
                ? `text-${type.color}-600 dark:text-${type.color}-400`
                : 'text-gray-600 dark:text-gray-400'
            }`} />
          </div>
          
          <div className="text-center">
            <h3 className={`font-semibold ${
              value === type.id
                ? `text-${type.color}-600 dark:text-${type.color}-400`
                : 'text-gray-900 dark:text-white'
            }`}>
              {type.label}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {type.description}
            </p>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default ListingTypeSelector;