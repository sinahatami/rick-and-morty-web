import { useState, useEffect } from 'react';

import { UseEntityDetailResult } from '~/types';

export function useEntityDetail<T>(
  fetchFn: (id: string) => Promise<T>,
  id: string,
  errorMessage = 'Failed to load data'
): UseEntityDetailResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      // Reset state when ID changes
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFn(id);
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError(errorMessage);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [id, fetchFn, errorMessage]);

  return { data, loading, error };
}