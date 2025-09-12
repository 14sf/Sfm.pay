import React from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCheck, Clock, CreditCard } from 'lucide-react';
import { Message } from '../../../types/messenger';
import { formatTime } from '../../../utils/format';

interface MessageItemProps {
  message: Message;
  showAvatar: boolean;
  onPaymentClick?: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  showAvatar,
  onPaymentClick
}) => {
  const isOutgoing = message.senderId === 'current-user';

  const renderStatus = () => {
    switch (message.status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const renderContent = () => {
    switch (message.type) {
      case 'payment':
        return (
          <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Payment Request
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Amount: {message.metadata?.paymentAmount} {message.metadata?.paymentCurrency}
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onPaymentClick}
              className="w-full bg-green-500 text-white py-2 px-4 rounded flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Pay Now
            </motion.button>
          </div>
        );
      default:
        return (
          <p className="text-gray-900 dark:text-white whitespace-pre-wrap">
            {message.content}
          </p>
        );
    }
  };

  return (
    <div
      className={`flex items-end gap-2 ${
        isOutgoing ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {showAvatar && !isOutgoing && (
        <img
          src={`https://ui-avatars.com/api/?name=${message.senderId}`}
          alt="Avatar"
          className="w-8 h-8 rounded-full"
        />
      )}

      <div
        className={`max-w-[70%] ${
          isOutgoing
            ? 'bg-blue-500 text-white rounded-l-lg rounded-tr-lg'
            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-r-lg rounded-tl-lg'
        } p-3`}
      >
        {renderContent()}

        <div className={`flex items-center gap-1 mt-1 ${
          isOutgoing ? 'justify-end' : 'justify-start'
        }`}>
          <span className="text-xs opacity-70">
            {formatTime(message.timestamp)}
          </span>
          {isOutgoing && renderStatus()}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;