import React from 'react';
import { motion } from 'framer-motion';
import { Chat } from '../../../../types/messenger';
import { formatMessagePreview, formatTime } from '../../../../utils/format';

interface ChatListProps {
  chats: Chat[];
  selectedChatId?: string;
  onSelectChat: (chat: Chat) => void;
  isLoading: boolean;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChatId,
  onSelectChat,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      {chats.map((chat) => (
        <motion.div
          key={chat.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => onSelectChat(chat)}
          className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
            chat.id === selectedChatId ? 'bg-blue-50 dark:bg-blue-900/20' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <img
              src={`https://ui-avatars.com/api/?name=${chat.participants.join('+')}`}
              alt="Chat avatar"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">
                  {chat.participants.join(', ')}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTime(chat.lastMessage?.timestamp || chat.updatedAt)}
                </span>
              </div>
              {chat.lastMessage && (
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {formatMessagePreview(chat.lastMessage)}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}

      {chats.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 dark:text-gray-400">
            No conversations yet
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatList;