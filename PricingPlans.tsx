import React from 'react';
import { motion } from 'framer-motion';
import { Building, Home, Car, Check } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

const PricingPlans: React.FC = () => {
  const { showToast } = useToast();

  const plans = [
    {
      type: 'Apartment',
      price: 150,
      icon: Building,
      features: [
        'Property listing management',
        'Tenant screening',
        'Automated rent collection',
        'Maintenance tracking',
        'Basic reporting'
      ]
    },
    {
      type: 'House',
      price: 200,
      icon: Home,
      features: [
        'All Apartment features',
        'Advanced property analytics',
        'Multi-unit management',
        'Document storage',
        'Priority support'
      ]
    },
    {
      type: 'Commercial',
      price: 2.5,
      icon: Building,
      pricePerSqm: true,
      features: [
        'All House features',
        'Commercial lease management',
        'Tenant business verification',
        'Custom reporting',
        'Dedicated account manager'
      ]
    },
    {
      type: 'Parking',
      price: 50,
      icon: Car,
      features: [
        'Basic listing management',
        'Access control',
        'Payment processing',
        'Basic reporting',
        'Email support'
      ]
    }
  ];

  const handleSelectPlan = (plan: string) => {
    showToast(`Selected ${plan} plan. Redirecting to payment...`, 'info');
  };

  return (
    <div className="py-12 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Choose the plan that best fits your property management needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.type}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {plan.type}
                  </h3>
                </div>

                <div className="mb-6">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {plan.price} SFM
                    {plan.pricePerSqm && <span className="text-base font-normal">/m²</span>}
                    {!plan.pricePerSqm && <span className="text-base font-normal">/month</span>}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    No hidden fees
                  </p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectPlan(plan.type)}
                  className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Select Plan
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Why Choose Our Pricing Model?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Simple & Transparent
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fixed pricing based on property type with no hidden fees or commissions
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Cost Effective
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Save up to 55% compared to traditional property management fees
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Full Service
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Comprehensive property management features included in every plan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;