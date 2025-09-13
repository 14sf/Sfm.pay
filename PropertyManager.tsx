import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Building, Plus, FileText, Search } from 'lucide-react';
import { Property } from '../../../types/real-estate';
import { Document } from '../../../types/real-estate/documents';
import DocumentManager from './DocumentManager';
import AddPropertyForm from '../forms/AddPropertyForm';
import PropertyList from '../PropertyList';
import { useToast } from '../../../hooks/useToast';
import { useProperties } from '../../../hooks/real-estate/useProperties';
import { ROLE_PERMISSIONS } from '../../../types/real-estate/roles';

const PropertyManager: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { properties, isLoading } = useProperties();
  const { showToast } = useToast();
  const permissions = ROLE_PERMISSIONS.Owner;
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    minPrice: '',
    maxPrice: ''
  });

  const filteredProperties = useCallback(() => {
    if (!searchQuery) return properties;
    let filtered = properties.filter(property => 
      property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location?.sector?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (filters.type !== 'all') {
      filtered = filtered.filter(p => p.type === filters.type);
    }
    if (filters.status !== 'all') {
      filtered = filtered.filter(p => p.status === filters.status);
    }
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(filters.maxPrice));
    }
    
    return filtered;
  }, [properties, searchQuery]);

  const handleDocumentUpload = async (doc: Omit<Document, 'id' | 'url'>) => {
    try {
      // In a real app, this would upload to a server
      showToast('Document uploaded successfully!', 'success');
    } catch (error) {
      showToast('Failed to upload document', 'error');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Property Management
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage your properties and documents
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Property
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search properties..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          />
        </div>
        
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
        >
          <option value="all">All Types</option>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </select>
        
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="rented">Rented</option>
          <option value="sold">Sold</option>
        </select>
        
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            className="w-1/2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            className="w-1/2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Properties List */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <PropertyList
              properties={filteredProperties()}
              onSelectProperty={setSelectedProperty}
              onRequestMaintenance={() => showToast('Maintenance request sent!', 'success')}
              permissions={permissions}
            />
          )}
        </div>

        {/* Document Management */}
        <div>
          {selectedProperty ? (
            <DocumentManager
              propertyId={selectedProperty.id}
              onUpload={handleDocumentUpload}
            />
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
              <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Select a property to manage documents
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Add Property Form Modal */}
      {showAddForm && (
        <AddPropertyForm
          onClose={() => setShowAddForm(false)}
          onSubmit={(data) => {
            showToast('Property added successfully!', 'success');
            setShowAddForm(false);
          }}
        />
      )}
    </div>
  );
};

export default PropertyManager;