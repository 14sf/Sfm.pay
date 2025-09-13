import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, DollarSign } from 'lucide-react';
import { ServiceProvider } from '../../types/service';
import { useToast } from '../../hooks/useToast';

const ServiceProviderList: React.FC = () => {
  const { showToast } = useToast();

  const providers: ServiceProvider[] = [
    {
      id: '1',
      name: 'John Smith',
      category: 'plumbing',
      description: 'Professional plumber with 10+ years experience',
      location: 'Kigali',
      rating: 4.8,
      reviews: 156,
      hourlyRate: 50,
      availability: {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        hours: ['09:00', '17:00']
      },
      skills: ['Emergency Repairs', 'Installation', 'Maintenance'],
      languages: ['English', 'Kinyarwanda'],
      verified: true,
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1',
      bookingCount: 245,
      completionRate: 98
    }
  ];

  const handleBook = (provider: ServiceProvider) => {
    showToast('Redirecting to booking...', 'info');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {providers.map((provider) => (
        <motion.div
          key={provider.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm"
        >
          <div className="relative">
            <img
              src={provider.profileImage}
              alt={provider.name}
              className="w-full h-48 object-cover"
            />
            {provider.verified && (
              <div className="absolute top-4 right-4 px-2 py-1 bg-green-600 text-white text-sm rounded-full">
                Verified
              </div>
            )}
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {provider.name}
              </h3>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {provider.rating}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ({provider.reviews})
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {provider.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{provider.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  {provider.availability.days[0]} - {provider.availability.days[provider.availability.days.length - 1]}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">{provider.hourlyRate} SFM/hour</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {provider.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleBook(provider)}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Book Now
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceProviderList;