import { useHomePage } from '../hooks/useDirectusData';

export const HomePage = () => {
  const { data, loading, error } = useHomePage();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Une erreur est survenue</div>;
  if (!data) return <div>Aucune donnée trouvée</div>;

  return (
    <div 
      style={{
        backgroundImage: `url(http://localhost:8055/assets/${data.image_fond})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    >
      {/* Votre contenu ici */}
    </div>
  );
}; 