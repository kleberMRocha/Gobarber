import React from 'react';
import { AuthProvider } from './authContext';
import { ToastProvider } from './toastContext';

const ContextWrapper: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default ContextWrapper;
