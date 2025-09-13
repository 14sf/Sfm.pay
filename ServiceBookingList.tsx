import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, DollarSign } from 'lucide-react';
import { ServiceBooking } from '../../types/service';
import { useToast } from '../../hooks/useToast';

const ServiceBookingList: React.FC = () => {
  const { showToast } = useToast();

  const bookings: ServiceBooking[] = [
    {
      id: '1',
      providerId: '1',
      clientId: '2',
      service: 'plumbing',
      date: '2024-03-20',
      time: '10:00',
      duration: 2,
      status: 'pending',
      totalAmount: 100,
      paymentStatus: 'pending',
      createdAt: Date.now()
    },
    {
      id: '2',
      providerId: '1',
      clientId: '3',
      service: 'electrical',
      date: '2024-03-21',
      time: '14:00',
      duration: 3,
      status: 'confirmed',
      totalAmount: 150,
      paymentStatus: 'paid',
      createdAt: Date.now() - 86400000
    }
  ];

  const handleStatusChange = (bookingId: string, status: ServiceBooking['status']) => {
    showToast(`Booking status updated to ${status}`, 'success');
  };

  return (
    <div className="space-y-4">
      {bookings.map((booking, index) => (
        <motion.div
          key={booking.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                {booking.service} Service
              </h4>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{booking.date}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{booking.time} ({booking.duration}h)</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 text-sm rounded-full ${
                booking.status === 'confirmed'
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                  : booking.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400'
              }`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
              <select
                value={booking.status}
                onChange={(e) => handleStatusChange(booking.id, e.target.value as ServiceBooking['status'])}
                className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirm</option>
                <option value="completed">Complete</option>
                <option value="cancelled">Cancel</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">{booking.totalAmount} SFM</span>
              </div>
              <span className={`text-sm ${
                booking.paymentStatus === 'paid'
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-yellow-600 dark:text-yellow-400'
              }`}>
                {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => showToast('Chat feature coming soon!', 'info')}
              className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
            >
              Message Client
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceBookingList;