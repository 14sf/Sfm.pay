import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Contact } from '../../../../types/messenger';
import { useMessenger } from '../../../../hooks/messenger/useMessenger';
import { useToast } from '../../../../hooks/useToast';

interface ContactListProps {
  onClose: () => void;
}

const ContactList: React.FC<ContactListProps> = ({ onClose }) => {
  const { createChat } = useMessenger();
  const { showToast } = useToast();

  const handleSelectContact = async (contact: Contact) => {
    try {
      await createChat([contact.id]);
      onClose();
    } catch (error) {
      showToast('Failed to create chat', 'error');
    }
  };
  // Mock contacts for demonstration
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'John Doe',
      phone: '+250789123456',
      status: 'online',
      role: 'owner',
      properties: ['1', '2']
    },
    {
      id: '2',
      name: 'Jane Smith',
      phone: '+250789123457',
      status: 'offline',
      role: 'tenant',
      properties: ['1']
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          New Chat
        </h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <motion.div
            key={contact.id}
            whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
            onClick={() => handleSelectContact(contact)}
            className="flex items-center gap-4 p-4 cursor-pointer"
          >
            <div className="relative">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}`}
                alt={contact.name}
                className="w-12 h-12 rounded-full"
              />
              {contact.status === 'online' && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {contact.name}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {contact.role}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {contact.phone}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;