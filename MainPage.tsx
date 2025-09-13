import React from 'react';
import { Toaster } from 'react-hot-toast';
import MainLayout from '../components/layout/MainLayout';
import SectionRenderer from '../components/sections/SectionRenderer';
import { NavigationProvider } from '../contexts/NavigationContext';
import { AuthProvider } from '../contexts/AuthContext';
import { ProfileProvider } from '../contexts/ProfileContext';
import { BookProvider } from '../contexts/BookContext';
import { MessengerProvider } from '../features/messenger/contexts/MessengerContext';

const MainPage: React.FC = () => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <BookProvider>
          <MessengerProvider>
            <NavigationProvider>
              <MainLayout>
                <SectionRenderer />
              </MainLayout>
              <Toaster position="top-right" />
            </NavigationProvider>
          </MessengerProvider>
        </BookProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};

export default MainPage;