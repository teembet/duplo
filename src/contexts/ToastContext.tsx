// ToastContext.js

import React, { createContext, useContext, ReactNode } from 'react';
import { toast, Toaster } from 'react-hot-toast';

type ToastContextProps = {
  children: ReactNode;
};

const ToastContext = createContext<any>(null);

const ToastProvider = ({ children }: ToastContextProps) => {
  return (
    <ToastContext.Provider value={{ toast }}>
      <Toaster position="top-right" />
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export { ToastProvider, useToast };
