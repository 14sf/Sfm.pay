import React from 'react';
import { MapPin } from 'lucide-react';

interface PropertyLocationProps {
  title: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

const PropertyLocation: React.FC<PropertyLocationProps> = ({ title, coordinates }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        Location
      </h3>
      
      {/* Map Placeholder - Replace with actual map implementation */}
      <div className="aspect-w-16 aspect-h-9 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
        <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
          Map view will be implemented with Google Maps
          <br />
          Coordinates: {coordinates.latitude}, {coordinates.longitude}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            Property Address
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            {title}
          </p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            Nearby Amenities
          </h4>
          <ul className="text-gray-600 dark:text-gray-400 space-y-1">
            <li>Schools within 2km</li>
            <li>Shopping centers nearby</li>
            <li>Public transportation</li>
            <li>Healthcare facilities</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PropertyLocation;