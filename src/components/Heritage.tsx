import { useEffect, useState } from 'react';

export const Heritage = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8055/items/heritage');
        const json = await response.json();
        console.log('Heritage data:', json); // Pour déboguer
        setData(json.data[0]);
      } catch (err) {
        console.error('Error fetching heritage:', err);
        setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error.message}</div>;
  if (!data) return <div>Aucune donnée trouvée</div>;

  return (
    <section className="heritage p-8">
      <h2 className="text-3xl font-bold mb-4">{data.titre}</h2>
      <img 
        src={`http://localhost:8055/assets/${data.image}`}
        alt={data.titre}
        className="w-full max-w-2xl mx-auto mb-4"
      />
      <div 
        className="prose max-w-3xl mx-auto"
        dangerouslySetInnerHTML={{ __html: data.contenu }}
      />
    </section>
  );
}; 