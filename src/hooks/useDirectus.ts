import { useState, useEffect } from 'react';
import { directus } from '../lib/directus';
import type { Schema } from '../lib/directus';

export function useDirectus<K extends keyof Schema>(
  collection: K,
  query?: Record<string, any>
) {
  const [data, setData] = useState<Schema[K][] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await directus.request(`/items/${collection}`, {
          method: 'GET',
          params: query
        });
        setData(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [collection, query]);

  return { data, loading, error };
} 