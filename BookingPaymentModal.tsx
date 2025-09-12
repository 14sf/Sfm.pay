import React from 'react';
import { motion } from 'framer-motion';
import { X, DollarSign, Shield } from 'lucide-react';
import { useBookingPayment } from '../../../hooks/booking/useBookingPayment';
import SFMPayButton from '../../payment/SFMPayButton';

interface BookingPaymentModalProps {
  booking: {
    id: string;
    title: string;
    amount: number;
    date: string;
    time: string;
  };
  onClose: () => void;
  onSuccess: (transactionId: string) => void;
}

const BookingPaymentModal: React.FC<BookingPaymentModalProps> = ({
  booking,
  onClose,
  onSuccess
}) => {
  const { isProcessing } = useBookingPayment();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Complete Booking
          </h3>
        </div>

        <div className="space-y-6">
          {/* Booking Details */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              {booking.title}
            </h4>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
              <p>Amount: {booking.amount} SFM</p>
            </div>
          </div>

          {/* Security Info */}
          <div className="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Secure payment processed by SFMPay
            </p>
          </div>

          {/* Payment Button */}
          <SFMPayButton
            amount={booking.amount}
            onSuccess={(transactionId) => onSuccess(transactionId)}
            disabled={isProcessing}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default BookingPaymentModal;