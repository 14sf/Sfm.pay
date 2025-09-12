import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import StripePaymentForm from './StripePaymentForm';
import { useToast } from '../../hooks/useToast';

interface SFMPayButtonProps {
  amount: number;
  onSuccess?: () => void;
  onError?: () => void;
  disabled?: boolean;
}

const SFMPayButton: React.FC<SFMPayButtonProps> = ({
  amount,
  onSuccess,
  onError,
  disabled = false
}) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { showToast } = useToast();

  const handlePayment = () => {
    if (disabled) return;
    setShowPaymentForm(true);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        onClick={handlePayment}
        disabled={disabled}
        className={`w-full flex items-center justify-center gap-2 px-4 py-2 ${
          disabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        } text-white rounded-lg transition-colors`}
      >
        <CreditCard className="w-4 h-4" />
        <span>Pay {amount.toLocaleString()} SFM</span>
      </motion.button>

      {showPaymentForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md">
            <StripePaymentForm
              amount={amount}
              onSuccess={() => {
                setShowPaymentForm(false);
                onSuccess?.();
              }}
              onError={() => {
                setShowPaymentForm(false);
                onError?.();
              }}
              onClose={() => setShowPaymentForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SFMPayButton;