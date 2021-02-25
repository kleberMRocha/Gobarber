import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from '../components/ToastContainer';

interface ToastData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToat(id: string): void;
}
export interface ToastMessage {
  id: string;
  type?: 'sucess' | 'info' | 'error';
  title: string;
  description?: string;
}

const ToastContext = createContext<ToastData>({} as ToastData);

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();
      const toast = {
        id,
        type,
        title,
        description,
      };
      setMessages((state) => [...state, toast]);
    },
    [],
  );

  const removeToat = useCallback((id: string) => {
    setMessages((state) => state.filter((mesage) => mesage.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToat }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

export function useToast(): ToastData {
  const contex = useContext(ToastContext);
  if (!contex) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return contex;
}
