'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

type ToastType = 'success' | 'error';

interface ToastMessage {
  message: string;
  type: ToastType;
}

interface ToasterContextType {
  toast: ToastMessage | null;
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
}

interface ToasterProviderProps {
  children: ReactNode;
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};

export const ToasterProvider: React.FC<ToasterProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 10000);
  };

  const hideToast = () => {
    setToast(null);
  };

  return (
    <ToasterContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
    </ToasterContext.Provider>
  );
};
