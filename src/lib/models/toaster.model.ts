import { ReactNode } from "react";

export type ToastType = 'success' | 'error';

export interface ToastMessage {
  message: string;
  type: ToastType;
}

export interface ToasterContextType {
  toast: ToastMessage | null;
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
}

export interface ToasterProviderProps {
  children: ReactNode;
}