import { useState, useEffect } from 'react';
import { MaintenanceRequest } from '../../types/real-estate';
import { useToast } from '../useToast';

export const useMaintenanceRequests = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockRequests = [
          {
            id: '1',
            title: 'Plumbing Issue',
            property: 'Modern Apartment',
            status: 'pending',
            priority: 'high',
            createdAt: '2h ago'
          },
          {
            id: '2',
            title: 'AC Maintenance',
            property: 'Luxury Villa',
            status: 'in-progress',
            priority: 'medium',
            createdAt: '1d ago'
          }
        ];
        
        setRequests(mockRequests);
      } catch (error) {
        console.error('Error fetching maintenance requests:', error);
        showToast('Failed to load maintenance requests', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [showToast]);

  const createRequest = async (data: Omit<MaintenanceRequest, 'id' | 'createdAt'>) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRequest = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      setRequests(prev => [newRequest, ...prev]);
      showToast('Maintenance request created successfully!', 'success');
    } catch (error) {
      showToast('Failed to create maintenance request', 'error');
      throw error;
    }
  };

  return {
    requests,
    isLoading,
    createRequest
  };
};