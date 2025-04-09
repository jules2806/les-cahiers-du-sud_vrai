import { useState, useEffect } from 'react';
import { directus, HomePage, Heritage, VoixMarquante, NumeroSpecial } from '../lib/directus';
import { readItems } from '@directus/sdk';

// Hook pour la page d'accueil
export const useHomePage = () => {
  const [data, setData] = useState<HomePage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await directus.request(readItems('home_page'));
        if (items && items.length > 0) {
          setData(items[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

// Hook pour la section héritage
export const useHeritage = () => {
  const [data, setData] = useState<Heritage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await directus.request(readItems('heritage'));
        if (items && items.length > 0) {
          setData(items[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

// Hook pour les voix marquantes
export const useVoixMarquantes = () => {
  const [data, setData] = useState<VoixMarquante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await directus.request(
          readItems('voix_marquantes', {
            sort: ['order']
          })
        );
        setData(items);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

// Hook pour les numéros spéciaux
export const useNumerosSpeciaux = () => {
  const [data, setData] = useState<NumeroSpecial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await directus.request(
          readItems('numeros_speciaux', {
            sort: ['order']
          })
        );
        setData(items);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}; 