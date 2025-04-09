import { useNumerosSpeciaux } from '../hooks/useDirectusData';

export const NumerosSpeciaux = () => {
  const { data, loading, error } = useNumerosSpeciaux();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Une erreur est survenue</div>;
  if (!data.length) return <div>Aucun numéro spécial trouvé</div>;

  return (
    <section className="numeros-speciaux">
      <h2>Les numéros spéciaux</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((numero) => (
          <article key={numero.id} className="numero-card p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-bold mb-2">{numero.titre}</h3>
            <div 
              className="prose"
              dangerouslySetInnerHTML={{ __html: numero.description }}
            />
          </article>
        ))}
      </div>
    </section>
  );
}; 