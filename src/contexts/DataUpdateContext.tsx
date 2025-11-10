import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { listenForDataChanges } from '../utils/dataUpdateBroadcast';

type DataChangeType = 'about' | 'highlights' | 'experiences' | 'projects' | 'skills' | 'contact' | 'all';

interface DataUpdateContextType {
  onDataChange: (callback: (changeType: DataChangeType) => void) => () => void;
  notifyDataChange: (changeType: DataChangeType) => void;
}

const DataUpdateContext = createContext<DataUpdateContextType | undefined>(undefined);

// Store listeners
const listeners = new Set<(changeType: DataChangeType) => void>();

export const DataUpdateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const onDataChange = useCallback((callback: (changeType: DataChangeType) => void) => {
    listeners.add(callback);
    
    // Return unsubscribe function
    return () => {
      listeners.delete(callback);
    };
  }, []);

  const notifyDataChange = useCallback((changeType: DataChangeType) => {
    console.log(`[DataUpdateContext] Data changed: ${changeType}`);
    listeners.forEach(callback => {
      try {
        callback(changeType);
      } catch (error) {
        console.error('Error in data change callback:', error);
      }
    });
  }, []);

  // Listen for changes from other windows/tabs via localStorage
  useEffect(() => {
    const unsubscribe = listenForDataChanges((changeType) => {
      notifyDataChange(changeType);
    });

    return unsubscribe;
  }, [notifyDataChange]);

  return (
    <DataUpdateContext.Provider value={{ onDataChange, notifyDataChange }}>
      {children}
    </DataUpdateContext.Provider>
  );
};

export const useDataUpdate = () => {
  const context = useContext(DataUpdateContext);
  if (!context) {
    throw new Error('useDataUpdate must be used within DataUpdateProvider');
  }
  return context;
};

// For external use (from admin app via localStorage or other methods)
export const getDataUpdateNotifier = () => {
  return {
    notify: (changeType: DataChangeType) => {
      listeners.forEach(callback => {
        try {
          callback(changeType);
        } catch (error) {
          console.error('Error in data change callback:', error);
        }
      });
    }
  };
};
