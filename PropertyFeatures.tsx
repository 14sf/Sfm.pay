import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PropertyFeaturesProps {
  features: string[];
}

const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ features }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Property Features
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
          >
            <div className="p-1 bg-green-100 dark:bg-green-900/20 rounded-full">
              <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <span>{feature}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PropertyFeatures;