/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState, useCallback } from 'react';

interface UseFetchResult<T> {
  response: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useFetch = <T = any>(fetchFunction: () => Promise<T>): UseFetchResult<T> => {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFunction();
      setResponse(result);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { response, loading, error, refetch: fetchData };
};

export default useFetch;
