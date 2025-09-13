import React from 'react';
import { motion } from 'framer-motion';
import { Message } from '../../../../types/messenger';
import MessageItem from './MessageItem';

interface MessageListProps {
  messages: Message[];
  onPaymentClick?: () => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, onPaymentClick }) => {
  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = new Date(message.timestamp).toLocaleDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-100 dark:bg-gray-900 space-y-4">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date}>
          <div className="flex justify-center mb-4">
            <span className="px-3 py-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-800 rounded-full">
              {date}
            </span>
          </div>

          <div className="space-y-2">
            {dateMessages.map((message, index) => (
              <MessageItem
                key={message.id}
                message={message}
                showAvatar={
                  index === 0 ||
                  dateMessages[index - 1]?.senderId !== message.senderId
                }
                onPaymentClick={onPaymentClick}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;