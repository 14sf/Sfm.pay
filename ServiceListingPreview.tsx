import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, DollarSign, Shield, Calendar } from 'lucide-react';

interface ServiceListingPreviewProps {
  data: {
    category: string;
    title: string;
    description: string;
    location: string;
    hourlyRate: string;
    minimumHours: string;
    availability: Record<string, { enabled: boolean; start: string; end: string }>;
    skills: string[];
    languages: string[];
    images: string[];
    instantBooking: boolean;
    cancellationPolicy: string;
  };
}

const ServiceListingPreview: React.FC<ServiceListingPreviewProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
      {/* Image Gallery */}
      <div className="relative h-64">
        {data.images.length > 0 ? (
          <img
            src={data.images[0]}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400">No images uploaded</span>
          </div>
        )}
        <div className="absolute top-4 right-4 px-2 py-1 bg-green-600 text-white text-sm rounded-full">
          Verified Provider
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {data.title}
          </h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">New</span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {data.description}
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            <span>{data.location}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <DollarSign className="w-4 h-4" />
            <span>{data.hourlyRate} SFM/hour (minimum {data.minimumHours} hours)</span>
          </div>

          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Available {Object.entries(data.availability)
              .filter(([_, { enabled }]) => enabled)
              .map(([day]) => day)
              .join(', ')}</span>
          </div>
        </div>

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 text-sm bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {data.languages.map((language) => (
                <span
                  key={language}
                  className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Booking Info */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-medium text-gray-900 dark:text-white">
              Booking Information
            </h4>
          </div>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              {data.instantBooking ? 'Instant booking available' : 'Booking requires approval'}
            </li>
            <li>Cancellation policy: {data.cancellationPolicy}</li>
          </ul>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Book Now
        </motion.button>
      </div>
    </div>
  );
};

export default ServiceListingPreview;