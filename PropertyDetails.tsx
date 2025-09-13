import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Home, Calendar, Shield, Check } from 'lucide-react';
import { Property } from '../../../types/real-estate/property';
import PropertyGallery from './PropertyGallery';
import PropertyFeatures from './PropertyFeatures';
import PropertyLocation from './PropertyLocation';
import SFMPayButton from '../../payment/SFMPayButton';
import { useToast } from '../../../hooks/useToast';

interface PropertyDetailsProps {
  property: Property;
  onClose: () => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, onClose }) => {
  const [activeImage, setActiveImage] = useState(0);
  const { showToast } = useToast();

  const handlePayment = () => {
    showToast('Redirecting to payment...', 'info');
  };

  const handleContact = () => {
    showToast('Contact form will be implemented soon', 'info');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Property Gallery */}
          <div className="relative h-64 md:h-96">
            <PropertyGallery
              images={property.images}
              activeImage={activeImage}
              onImageChange={setActiveImage}
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70"
            >
              ×
            </button>
          </div>

          {/* Property Details */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {property.title}
                  </h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-full text-sm">
                    {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location.sector}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    <span className="capitalize">{property.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Available Now</span>
                  </div>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
                  <div className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
                    <DollarSign className="w-6 h-6" />
                    {property.price.toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleContact}
                    className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    Contact Agent
                  </motion.button>
                  <SFMPayButton
                    amount={property.price}
                    onSuccess={() => showToast('Payment successful!', 'success')}
                    onError={() => showToast('Payment failed', 'error')}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {property.description}
                </p>
              </div>

              {/* Features */}
              <PropertyFeatures features={property.features} />

              {/* Location */}
              <PropertyLocation
                title={property.title}
                coordinates={property.location.coordinates}
              />

              {/* Security Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Security & Safety
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['24/7 Security', 'CCTV Surveillance', 'Gated Community', 'Fire Safety'].map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PropertyDetails;