import React from 'react';
import { Toaster } from 'react-hot-toast';
import MainPage from './pages/MainPage';
import AuthGuard from './components/auth/AuthGuard';
import { AuthProvider } from './contexts/AuthContext';
import { ProfileProvider } from './contexts/ProfileContext';
import { BookProvider } from './contexts/BookContext';
import { MessengerProvider } from './features/messenger/contexts/MessengerContext';

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <AuthProvider>
        <ProfileProvider>
          <BookProvider>
            <MessengerProvider>
              <AuthGuard>
                <MainPage />
              </AuthGuard>
            </MessengerProvider>
          </BookProvider>
        </ProfileProvider>
      </AuthProvider>
    </>
  );
};

export default App;