import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Calendar, Users, DollarSign, Wifi, Waves, Car, Coffee } from 'lucide-react';
import { AccommodationFilters as FilterType } from '../../../types/booking/accommodation';

interface AccommodationFiltersProps {
  filters: FilterType;
  onChange: (filters: FilterType) => void;
}

const AccommodationFilters: React.FC<AccommodationFiltersProps> = ({
  filters,
  onChange
}) => {
  const amenities = [
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'pool', label: 'Pool', icon: Waves },
    { id: 'parking', label: 'Parking', icon: Car },
    { id: 'breakfast', label: 'Breakfast', icon: Coffee }
  ];

  const handleAmenityToggle = (id: string) => {
    const newAmenities = filters.amenities?.includes(id)
      ? filters.amenities.filter(a => a !== id)
      : [...(filters.amenities || []), id];
    onChange({ ...filters, amenities: newAmenities });
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    onChange({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [type]: value ? Number(value) : undefined
      }
    });
  };

  const handleGuestsChange = (value: string) => {
    onChange({
      ...filters,
      guests: value ? Number(value) : undefined
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-medium text-gray-900 dark:text-white">Filters</h3>
        </div>
        <button
          onClick={() => onChange({})}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Clear all
        </button>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Price Range
        </label>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange?.min || ''}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
            />
          </div>
          <span className="text-gray-500">-</span>
          <div className="relative flex-1">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange?.max || ''}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Dates */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Dates
        </label>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
            />
          </div>
          <span className="text-gray-500">-</span>
          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="date"
              className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Guests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Guests
        </label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="number"
            min="1"
            value={filters.guests || ''}
            onChange={(e) => handleGuestsChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
            placeholder="Number of guests"
          />
        </div>
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Amenities
        </label>
        <div className="grid grid-cols-2 gap-2">
          {amenities.map(({ id, label, icon: Icon }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAmenityToggle(id)}
              className={`flex items-center gap-2 p-2 rounded-lg border ${
                filters.amenities?.includes(id)
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm">{label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccommodationFilters;