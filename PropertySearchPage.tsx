import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import PropertyList from '../PropertyList';
import PropertyMap from './PropertyMap';
import { useProperties } from '../../../hooks/real-estate/useProperties';
import { PropertyFilters } from '../../../types/real-estate/property';

const PropertySearchPage: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const { properties, isLoading, searchProperties } = useProperties();
  const [filters, setFilters] = useState<PropertyFilters>({
    listingType: 'sale',
    location: '',
    category: undefined,
    minPrice: undefined,
    maxPrice: undefined
  });

  const handleSearch = async (filters: PropertyFilters) => {
    await searchProperties(filters);
  };

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by location..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />
          </div>

          <div>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value as any })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="">All Categories</option>
              <option value="villa">Villa</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="office">Office</option>
            </select>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSearch(filters)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Filter className="w-4 h-4" />
            Apply Filters
          </motion.button>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PropertyList
            properties={properties}
            onSelectProperty={setSelectedProperty}
            onRequestMaintenance={() => {}}
          />
        </div>
        <div className="lg:sticky lg:top-8 lg:h-[calc(100vh-8rem)]">
          <PropertyMap
            properties={properties}
            selectedProperty={selectedProperty}
            onSelectProperty={setSelectedProperty}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertySearchPage;