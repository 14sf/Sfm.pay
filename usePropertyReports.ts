import { useState } from 'react';
import { useBook } from '../../contexts/BookContext';
import { useToast } from '../useToast';
import { Book, Transaction } from '../../types/book';

interface PropertyReport {
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  transactions: Transaction[];
  startDate: string;
  endDate: string;
}

export const usePropertyReports = (propertyId: string) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { books } = useBook();
  const { showToast } = useToast();

  const generateReport = async (startDate: string, endDate: string): Promise<PropertyReport | null> => {
    setIsGenerating(true);
    try {
      // Find the property book
      const propertyBook = books.find(book => 
        book.type === 'property' && book.metadata?.propertyId === propertyId
      );

      if (!propertyBook) {
        throw new Error('Property book not found');
      }

      // Filter transactions by date range
      const transactions = propertyBook.transactions.filter(tx => {
        const txDate = new Date(tx.timestamp);
        return txDate >= new Date(startDate) && txDate <= new Date(endDate);
      });

      // Calculate totals
      const { income, expenses } = transactions.reduce((acc, tx) => ({
        income: acc.income + (tx.type === 'addition' ? tx.amount : 0),
        expenses: acc.expenses + (tx.type === 'subtraction' ? tx.amount : 0)
      }), { income: 0, expenses: 0 });

      return {
        totalIncome: income,
        totalExpenses: expenses,
        netIncome: income - expenses,
        transactions,
        startDate,
        endDate
      };
    } catch (error) {
      showToast('Failed to generate report', 'error');
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadReport = async (report: PropertyReport, format: 'pdf' | 'excel') => {
    try {
      // In a real app, this would generate and download a file
      const filename = `property-report-${report.startDate}-${report.endDate}.${format}`;
      
      showToast(`Report downloaded: ${filename}`, 'success');
    } catch (error) {
      showToast('Failed to download report', 'error');
    }
  };

  return {
    generateReport,
    downloadReport,
    isGenerating
  };
};