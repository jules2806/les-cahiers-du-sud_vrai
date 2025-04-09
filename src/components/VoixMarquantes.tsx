import { useVoixMarquantes } from '../hooks/useDirectusData';

export const VoixMarquantes = () => {
  const { data, loading, error } = useVoixMarquantes();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Une erreur est survenue</div>;
  if (!data.length) return <div>Aucune voix marquante trouvée</div>;

  return (
    <section className="voix-marquantes">
      <h2>Les voix qui ont marqué Les Cahiers du Sud</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((voix) => (
          <article key={voix.id} className="voix-card">
            <img 
              src={`http://localhost:8055/assets/${voix.image}`}
              alt={voix.nom}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold">{voix.nom}</h3>
              <p className="text-gray-600">{voix.annee}</p>
              <p className="font-medium">{voix.poste}</p>
              <div 
                className="mt-2"
                dangerouslySetInnerHTML={{ __html: voix.description }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}; 