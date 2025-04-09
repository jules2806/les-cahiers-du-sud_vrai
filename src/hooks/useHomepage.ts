import { useState, useEffect } from 'react';
import { directus } from '../lib/directus';
import type { Schema } from '../lib/directus';

export function useHomepage() {
  const [data, setData] = useState<Schema['homepage'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8055/items/homepage/1', {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const json = await response.json();
        setData(json.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
} 