'use client';

import React, { createContext, useState, useContext } from 'react';
import { ToasterContextType, ToasterProviderProps, ToastMessage, ToastType } from '../models/toaster.model';

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
      { children }
    </ToasterContext.Provider>
  );
};
