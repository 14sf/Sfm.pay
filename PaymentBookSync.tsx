import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Link } from 'lucide-react';
import { useBook } from '../../../contexts/BookContext';
import { useToast } from '../../../hooks/useToast';

interface PaymentBookSyncProps {
  propertyId: string;
  amount: number;
}

const PaymentBookSync: React.FC<PaymentBookSyncProps> = ({
  propertyId,
  amount
}) => {
  const { books, addBook, updateBook } = useBook();
  const { showToast } = useToast();

  const handleSync = async () => {
    try {
      // Find or create property book
      let propertyBook = books.find(book => 
        book.type === 'property' && book.metadata?.propertyId === propertyId
      );

      if (!propertyBook) {
        propertyBook = {
          id: Date.now().toString(),
          name: `Property ${propertyId}`,
          type: 'property',
          currency: 'SFM',
          balance: 0,
          documents: [],
          transactions: [],
          team: {
            members: [],
            invitations: []
          },
          createdBy: 'current-user',
          createdAt: Date.now(),
          metadata: {
            propertyId,
            category: 'real-estate'
          }
        };
        addBook(propertyBook);
      }

      // Add transaction
      const transaction = {
        id: Date.now().toString(),
        type: 'addition',
        amount,
        description: 'Property Payment',
        category: 'rent',
        timestamp: Date.now(),
        createdBy: 'current-user'
      };

      updateBook(propertyBook.id, {
        balance: propertyBook.balance + amount,
        transactions: [...propertyBook.transactions, transaction]
      });

      showToast('Payment synced with SFMBook successfully!', 'success');
    } catch (error) {
      showToast('Failed to sync payment with SFMBook', 'error');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
    >
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h4 className="font-medium text-blue-600 dark:text-blue-400">
          SFMBook Integration
        </h4>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Automatically track this payment in your SFMBook account for better financial management.
      </p>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSync}
        className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <Link className="w-4 h-4" />
        Sync with SFMBook
      </motion.button>
    </motion.div>
  );
};

export default PaymentBookSync;