import { useState, useEffect, useCallback } from 'react';

// Generic hook for API data fetching
export const useAPI = <T>(apiCall: () => Promise<T>, fallbackData: T) => {
  const [data, setData] = useState<T>(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const memoizedApiCall = useCallback(apiCall, [apiCall]);

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, [memoizedApiCall]);

  return { data, loading, error };
};