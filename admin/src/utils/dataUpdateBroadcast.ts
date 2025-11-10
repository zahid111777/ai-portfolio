/**
 * Data Update Broadcast Utility for Admin Panel
 * Notifies the frontend portfolio of data changes
 */

export type DataChangeType = 'about' | 'highlights' | 'experiences' | 'projects' | 'skills' | 'contact' | 'all';

const STORAGE_KEY = 'portfolio_data_change';

export const broadcastDataChange = (changeType: DataChangeType) => {
  console.log(`[Admin Broadcast] Notifying data change: ${changeType}`);
  
  // Use localStorage to broadcast to other tabs/windows (cross-origin if on same domain)
  const timestamp = Date.now();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ changeType, timestamp }));
  
  // Also dispatch a custom event for same window listeners
  window.dispatchEvent(
    new CustomEvent('portfolio-data-change', {
      detail: { changeType, timestamp }
    })
  );
};

/**
 * Call this in admin services after save operations
 * Example: broadcastDataChange('projects') after saving a project
 */
export const notifyPortfolioUpdate = (changeType: DataChangeType) => {
  console.log(`[Admin] Broadcasting update to portfolio: ${changeType}`);
  broadcastDataChange(changeType);
};
