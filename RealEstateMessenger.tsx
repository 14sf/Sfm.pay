import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Search, Plus, DollarSign } from 'lucide-react';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import ContactList from './components/ContactList';
import { useMessenger } from '../../../hooks/messenger/useMessenger';
import { Chat } from '../../../types/messenger';
import { useToast } from '../../../hooks/useToast';
import SFMPayButton from '../../payment/SFMPayButton';

const RealEstateMessenger: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [showContacts, setShowContacts] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const { chats, isLoading, sendMessage } = useMessenger();
  const { showToast } = useToast();

  const handleSendMessage = async (chatId: string, content: string, type: 'text' | 'payment' = 'text') => {
    try {
      await sendMessage(chatId, content, type);
      if (type === 'payment') {
        setShowPayment(false);
      }
    } catch (error) {
      showToast('Failed to send message', 'error');
    }
  };

  const handlePaymentRequest = (amount: number) => {
    if (!selectedChat) return;
    setPaymentAmount(amount);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    if (!selectedChat) return;
    handleSendMessage(selectedChat.id, `Payment of ${paymentAmount} SFM completed`, 'payment');
    setShowPayment(false);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="flex h-[700px]">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Messages
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowContacts(true)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 dark:focus:bg-gray-700"
              />
            </div>
          </div>

          {/* Chat/Contact List */}
          {showContacts ? (
            <ContactList onClose={() => setShowContacts(false)} />
          ) : (
            <ChatList
              chats={chats}
              selectedChatId={selectedChat?.id}
              onSelectChat={setSelectedChat}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* Chat Window */}
        <div className="flex-1">
          {selectedChat ? (
            <>
              <ChatWindow
                chat={selectedChat}
                onSendMessage={(content) => handleSendMessage(selectedChat.id, content)}
                onRequestPayment={handlePaymentRequest}
              />
              
              {/* Payment Modal */}
              {showPayment && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Complete Payment
                      </h3>
                    </div>

                    <div className="mb-6">
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        Amount to pay:
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {paymentAmount} SFM
                      </p>
                    </div>

                    <div className="space-y-4">
                      <SFMPayButton
                        amount={paymentAmount}
                        onSuccess={handlePaymentComplete}
                      />
                      <button
                        onClick={() => setShowPayment(false)}
                        className="w-full py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Select a conversation to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealEstateMessenger;