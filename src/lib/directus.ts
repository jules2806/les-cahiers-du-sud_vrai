import { createDirectus, rest, Query } from '@directus/sdk';

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
  home_page: HomePage;
  heritage: Heritage;
  voix_marquantes: VoixMarquante;
  numeros_speciaux: NumeroSpecial;
}

// Création du client Directus avec le schéma typé
export const directus = createDirectus<Schema>('http://localhost:8055').with(rest());

export const getItems = async <T extends keyof Schema>(collection: T) => {
  return await directus.request(readItems(collection, {
    sort: ['order']
  }));
};

export default directus; 