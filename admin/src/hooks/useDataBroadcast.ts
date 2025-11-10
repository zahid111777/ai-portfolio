import { notifyPortfolioUpdate, DataChangeType } from '../utils/dataUpdateBroadcast';

/**
 * Wraps any save operation and broadcasts data change notification
 */
export const withDataBroadcast = async <T>(
  saveOperation: () => Promise<T>,
  changeType: DataChangeType,
  errorMessage: string = 'Save failed'
): Promise<{ success: boolean; data?: T; error?: string }> => {
  try {
    const data = await saveOperation();
    console.log(`[Admin Hook] Save successful, broadcasting: ${changeType}`);
    notifyPortfolioUpdate(changeType);
    return { success: true, data };
  } catch (error) {
    console.error(`[Admin Hook] Save failed:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : errorMessage
    };
  }
};
