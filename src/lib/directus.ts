import { createDirectus, rest, readItems } from '@directus/sdk';

// Types pour nos collections
export interface HomePage {
  id: string;
  image_fond: string;
}

export interface Heritage {
  id: string;
  titre: string;
  image: string;
  contenu: string;
}

export interface VoixMarquante {
  id: string;
  order: number;
  image: string;
  annee: number;
  nom: string;
  poste: string;
  description: string;
}

export interface NumeroSpecial {
  id: string;
  order: number;
  titre: string;
  description: string;
}

// Définition du schéma pour Directus
interface Schema {
  home_page: HomePage[];
  heritage: Heritage[];
  voix_marquantes: VoixMarquante[];
  numeros_speciaux: NumeroSpecial[];
}

// URL de l'API Directus depuis la variable d'environnement ou fallback vers localhost pour le développement
const DIRECTUS_URL = import.meta.env.VITE_DIRECTUS_URL || 'http://localhost:8055';

// Création du client Directus avec le schéma typé
export const directus = createDirectus<Schema>(DIRECTUS_URL).with(rest());

// Fonction simplifiée pour récupérer les éléments d'une collection
export const getItems = async (collection: keyof Schema) => {
  return await directus.request(readItems(collection));
};

export default directus; 