import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Shield, Calendar, DollarSign, ClipboardCheck, X } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';
import PaymentBookSync from './PaymentBookSync';
import SFMPayButton from '../../payment/SFMPayButton';

interface RealEstatePaymentFormProps {
  onClose?: () => void;
  propertyId?: string;
}

const RealEstatePaymentForm: React.FC<RealEstatePaymentFormProps> = ({
  onClose,
  propertyId
}) => {
  const [formData, setFormData] = useState({
    propertyRef: propertyId || '',
    amount: 0,
    paymentType: 'rent',
    schedule: 'monthly',
    dueDate: new Date().toISOString().split('T')[0]
  });

  const [additionalExpenses] = useState([
    { type: 'cleaning', amount: 50, frequency: 'monthly' },
    { type: 'security', amount: 100, frequency: 'monthly' },
    { type: 'maintenance', amount: 200, frequency: 'quarterly' }
  ]);

  const { showToast } = useToast();

  const totalAmount = formData.amount + additionalExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl relative"
      >
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Real Estate Payment
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Secure payment processing with SFMPay
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Property Reference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Property Reference
            </label>
            <input
              type="text"
              value={formData.propertyRef}
              onChange={(e) => setFormData({ ...formData, propertyRef: e.target.value })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
              placeholder="Enter property reference"
              required
            />
          </div>

          {/* Payment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Payment Type
              </label>
              <select
                value={formData.paymentType}
                onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
              >
                <option value="rent">Monthly Rent</option>
                <option value="deposit">Security Deposit</option>
                <option value="utilities">Utilities</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount (SFM)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Schedule */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Payment Schedule
            </label>
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <select
                value={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                className="flex-1 bg-transparent border-none focus:ring-0"
              >
                <option value="weekly">Weekly Payments</option>
                <option value="biweekly">Bi-weekly Payments</option>
                <option value="monthly">Monthly Payments</option>
              </select>
            </div>
          </div>

          {/* Additional Expenses */}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2 mb-4">
              <ClipboardCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Additional Expenses
            </h4>

            <div className="space-y-3">
              {additionalExpenses.map((expense) => (
                <div
                  key={expense.type}
                  className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">
                      {expense.type}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      {expense.amount} SFM
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Billed {expense.frequency}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Escrow Information */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-3"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h4 className="font-medium text-blue-600 dark:text-blue-400">
                Secure Escrow Service
              </h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Funds are held securely in escrow</li>
              <li>• Automatic monthly release to landlord</li>
              <li>• Protection for both parties</li>
              <li>• Transparent transaction history</li>
            </ul>
          </motion.div>

          {/* Payment Summary */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Base Amount</span>
              <span>{formData.amount} SFM</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Additional Expenses</span>
              <span>{additionalExpenses.reduce((sum, exp) => sum + exp.amount, 0)} SFM</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Transaction Fee</span>
              <span>3 SFM</span>
            </div>
            <div className="pt-2 border-t border-gray-200 dark:border-gray-600 flex justify-between font-medium text-gray-900 dark:text-white">
              <span>Total Amount</span>
              <span>{totalAmount + 3} SFM</span>
            </div>
          </div>

          {/* Payment Button */}
          <PaymentBookSync
            propertyId={formData.propertyRef}
            amount={totalAmount + 3}
          />

          <SFMPayButton
            amount={totalAmount + 3}
            onSuccess={() => {
              showToast('Payment processed successfully!', 'success');
              onClose?.();
            }}
            onError={() => {
              showToast('Payment failed. Please try again.', 'error');
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default RealEstatePaymentForm;