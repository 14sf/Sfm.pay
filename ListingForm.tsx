import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, MapPin, DollarSign, Clock, Camera, Shield, Calendar } from 'lucide-react';
import { ServiceListing } from '../../../types/booking/listing';
import { useToast } from '../../../hooks/useToast';

const ListingForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '' as ServiceListing['type'],
    title: '',
    description: '',
    location: {
      address: '',
      city: ''
    },
    pricing: {
      amount: 0,
      currency: 'SFM',
      per: 'hour' as const
    },
    images: [] as string[],
    availability: {
      days: [] as string[],
      hours: [] as string[]
    },
    instantBook: false,
    cancellationPolicy: 'flexible' as const
  });

  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, this would make an API call
      showToast('Listing created successfully!', 'success');
    } catch (error) {
      showToast('Failed to create listing', 'error');
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Listing Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as ServiceListing['type'] })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                required
              >
                <option value="">Select type</option>
                <option value="activity">Activity</option>
                <option value="experience">Experience</option>
                <option value="hotel">Hotel</option>
                <option value="house">House</option>
                <option value="service">Service</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                placeholder="Enter a descriptive title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                rows={4}
                placeholder="Describe your offering in detail"
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    value={formData.location.address}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: { ...formData.location, address: e.target.value }
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    placeholder="Address"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={formData.location.city}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: { ...formData.location, city: e.target.value }
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    placeholder="City"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pricing
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={formData.pricing.amount}
                    onChange={(e) => setFormData({
                      ...formData,
                      pricing: { ...formData.pricing, amount: Number(e.target.value) }
                    })}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    placeholder="Amount"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                <div>
                  <select
                    value={formData.pricing.currency}
                    onChange={(e) => setFormData({
                      ...formData,
                      pricing: { ...formData.pricing, currency: e.target.value }
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  >
                    <option value="SFM">SFM</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
                <div>
                  <select
                    value={formData.pricing.per}
                    onChange={(e) => setFormData({
                      ...formData,
                      pricing: { ...formData.pricing, per: e.target.value as ServiceListing['pricing']['per'] }
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  >
                    <option value="hour">Per Hour</option>
                    <option value="day">Per Day</option>
                    <option value="night">Per Night</option>
                    <option value="person">Per Person</option>
                    <option value="session">Per Session</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Photos
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div
                    key={index}
                    className="aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400"
                  >
                    <div className="text-center">
                      <Camera className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Add photo
                      </span>
                    </div>
                    <input type="file" className="hidden" accept="image/*" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Availability
              </label>
              <div className="space-y-4">
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                  <div key={day} className="flex items-center gap-4">
                    <label className="w-32">
                      <input
                        type="checkbox"
                        checked={formData.availability.days.includes(day)}
                        onChange={(e) => {
                          const days = e.target.checked
                            ? [...formData.availability.days, day]
                            : formData.availability.days.filter(d => d !== day);
                          setFormData({
                            ...formData,
                            availability: { ...formData.availability, days }
                          });
                        }}
                        className="mr-2"
                      />
                      <span className="capitalize">{day}</span>
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="time"
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <span>to</span>
                      <input
                        type="time"
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Booking Settings
              </label>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.instantBook}
                    onChange={(e) => setFormData({ ...formData, instantBook: e.target.checked })}
                    className="mr-2"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Enable instant booking
                  </span>
                </label>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cancellation Policy
                  </label>
                  <select
                    value={formData.cancellationPolicy}
                    onChange={(e) => setFormData({
                      ...formData,
                      cancellationPolicy: e.target.value as ServiceListing['cancellationPolicy']
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  >
                    <option value="flexible">Flexible</option>
                    <option value="moderate">Moderate</option>
                    <option value="strict">Strict</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[
            { step: 1, label: 'Basic Info', icon: Building },
            { step: 2, label: 'Location & Pricing', icon: MapPin },
            { step: 3, label: 'Photos', icon: Camera },
            { step: 4, label: 'Availability', icon: Calendar }
          ].map(({ step: stepNumber, label, icon: Icon }) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= stepNumber
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`mt-2 text-sm ${
                step >= stepNumber
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 h-1 bg-gray-200 dark:bg-gray-700 w-full rounded">
            <motion.div
              className="absolute top-0 left-0 h-full bg-blue-600 rounded"
              initial={{ width: '0%' }}
              animate={{ width: `${((step - 1) / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <form onSubmit={handleSubmit}>
          {renderStepContent()}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(prev => prev - 1)}
                className="px-6 py-2 text-gray-600 dark:text-gray-400"
              >
                Back
              </motion.button>
            )}
            <motion.button
              type={step === 4 ? 'submit' : 'button'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => step < 4 && setStep(prev => prev + 1)}
              className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {step === 4 ? 'Create Listing' : 'Continue'}
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListingForm;