/**
 * Data Update Broadcast Utility
 * Allows admin panel to notify frontend of data changes
 * Uses localStorage event to communicate across windows/tabs
 */

export type DataChangeType = 'about' | 'highlights' | 'experiences' | 'projects' | 'skills' | 'contact' | 'all';

const STORAGE_KEY = 'portfolio_data_change';

export const broadcastDataChange = (changeType: DataChangeType) => {
  console.log(`[Broadcast] Notifying data change: ${changeType}`);
  
  // Use localStorage to broadcast to other tabs/windows
  const timestamp = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ changeType, timestamp }));
  
  // Also dispatch a custom event for same window listeners
  window.dispatchEvent(
    new CustomEvent('portfolio-data-change', {
      detail: { changeType, timestamp }
    })
  );
};

export const listenForDataChanges = (callback: (changeType: DataChangeType) => void) => {
  // Listen for storage changes (from other tabs/windows)
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY && e.newValue) {
      try {
        const { changeType } = JSON.parse(e.newValue);
        console.log(`[Listen] Data change detected: ${changeType}`);
        callback(changeType);
      } catch (error) {
        console.error('Error parsing storage change:', error);
      }
    }
  };

  // Listen for custom events (from same window)
  const handleCustomEvent = (e: Event) => {
    const customEvent = e as CustomEvent;
    const changeType = customEvent.detail?.changeType;
    if (changeType) {
      console.log(`[Listen] Custom event detected: ${changeType}`);
      callback(changeType);
    }
  };

  window.addEventListener('storage', handleStorageChange);
  window.addEventListener('portfolio-data-change', handleCustomEvent);

  // Return unsubscribe function
  return () => {
    window.removeEventListener('storage', handleStorageChange);
    window.removeEventListener('portfolio-data-change', handleCustomEvent);
  };
};
