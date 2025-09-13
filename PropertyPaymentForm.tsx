import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, DollarSign, Calendar, Shield } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';
import SFMPayButton from '../../payment/SFMPayButton';

interface PropertyPaymentFormProps {
  propertyId?: string;
  planType?: string;
  onClose?: () => void;
}

const PropertyPaymentForm: React.FC<PropertyPaymentFormProps> = ({
  propertyId,
  planType = 'Apartment',
  onClose
}) => {
  const [formData, setFormData] = useState({
    propertySize: '',
    paymentFrequency: 'monthly',
    startDate: new Date().toISOString().split('T')[0]
  });

  const { showToast } = useToast();

  const calculateAmount = () => {
    const basePrice = {
      'Apartment': 150,
      'House': 200,
      'Commercial': 2.5,
      'Parking': 50
    }[planType] || 150;

    if (planType === 'Commercial' && formData.propertySize) {
      return basePrice * Number(formData.propertySize);
    }

    return basePrice;
  };

  const handlePayment = async () => {
    try {
      showToast('Processing payment...', 'info');
      // Payment will be handled by SFMPayButton
    } catch (error) {
      showToast('Payment failed. Please try again.', 'error');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Building className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Property Management Subscription
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {planType} Plan
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {planType === 'Commercial' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Property Size (m²)
            </label>
            <input
              type="number"
              value={formData.propertySize}
              onChange={(e) => setFormData({ ...formData, propertySize: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Payment Frequency
          </label>
          <select
            value={formData.paymentFrequency}
            onChange={(e) => setFormData({ ...formData, paymentFrequency: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly (5% discount)</option>
            <option value="yearly">Yearly (10% discount)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          />
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h4 className="font-medium text-blue-600 dark:text-blue-400">
              Subscription Benefits
            </h4>
          </div>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li>• Full property management features</li>
            <li>• No hidden fees or commissions</li>
            <li>• Cancel anytime with 30-day notice</li>
            <li>• 24/7 support included</li>
          </ul>
        </div>

        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Amount</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {calculateAmount()} SFM
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                /{formData.paymentFrequency === 'yearly' ? 'year' : formData.paymentFrequency === 'quarterly' ? 'quarter' : 'month'}
              </span>
            </p>
          </div>
          <SFMPayButton
            amount={calculateAmount()}
            onSuccess={() => {
              showToast('Subscription activated successfully!', 'success');
              onClose?.();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyPaymentForm;