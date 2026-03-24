import { useState, useEffect, useCallback } from 'react';
import { useDataUpdate } from '../contexts/DataUpdateContext';

type DataChangeType = 'about' | 'highlights' | 'experiences' | 'projects' | 'skills' | 'contact' | 'all';

interface UseAPIOptions {
  // List of data change types that should trigger a refresh
  refreshOn?: DataChangeType[];
}

// Generic hook for API data fetching with auto-refresh support
export const useAPI = <T>(
  apiCall: () => Promise<T>, 
  fallbackData: T,
  options: UseAPIOptions = {}
) => {
  const [data, setData] = useState<T>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);
  
  const { onDataChange } = useDataUpdate();
  const memoizedApiCall = useCallback(apiCall, [apiCall]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await memoizedApiCall();
      setData(result);
    } catch (err) {
      console.warn('API call failed, using fallback data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      // Keep fallback data in case of error
    } finally {
      setLoading(false);
    }
  }, [memoizedApiCall]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Listen for data changes and refresh if needed
  useEffect(() => {
    if (!options.refreshOn || options.refreshOn.length === 0) {
      return;
    }

    const unsubscribe = onDataChange((changeType: DataChangeType) => {
      // Refresh if this is a type we care about
      const shouldRefresh = options.refreshOn && (
        options.refreshOn.includes(changeType) || 
        options.refreshOn.includes('all') || 
        changeType === 'all'
      );
      
      if (shouldRefresh) {
        console.log(`[useAPI] Refreshing data due to ${changeType} change`);
        setRefreshCount(prev => prev + 1);
        fetchData();
      }
    });

    return unsubscribe;
  }, [onDataChange, options.refreshOn, fetchData]);

  return { data, loading, error, refresh: fetchData };
};