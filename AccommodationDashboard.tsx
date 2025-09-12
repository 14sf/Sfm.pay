import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Hotel, Search, Filter } from 'lucide-react';
import AccommodationList from './AccommodationList';
import AccommodationMap from './AccommodationMap';
import AccommodationFilters from './AccommodationFilters';
import { AccommodationFilters as FilterType } from '../../../types/booking/accommodation';

const AccommodationDashboard: React.FC = () => {
  const [showMap, setShowMap] = useState(false);
  const [filters, setFilters] = useState<FilterType>({});
  const [activeType, setActiveType] = useState<'all' | 'hotel' | 'house'>('all');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Find your perfect stay
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Book unique places to stay in Rwanda
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowMap(!showMap)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {showMap ? 'Show List' : 'Show Map'}
          </motion.button>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by location..."
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Filter className="w-5 h-5" />
            </motion.button>
          </div>

          <div className="flex gap-4">
            {[
              { id: 'all', label: 'All', icon: Building },
              { id: 'hotel', label: 'Hotels', icon: Hotel },
              { id: 'house', label: 'Houses', icon: Building }
            ].map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveType(id as typeof activeType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeType === id
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {showMap ? (
              <AccommodationMap />
            ) : (
              <AccommodationList type={activeType} filters={filters} />
            )}
          </div>
          <div>
            <AccommodationFilters
              filters={filters}
              onChange={setFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationDashboard;