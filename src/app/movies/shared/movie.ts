export interface Movie {
  id: number;
  title: string;
  description: string;
  director: string;
  year: number;
  genre: string;
  rating: number;
  imageUrl: string;
}

export type MovieCreate = Omit<Movie, 'id'>;

export type MovieFormData = Omit<MovieCreate, 'year'> & {
  year: number | '';
};

/* Warum Interfaces+Rohdaten statt Klassen?
- 1. JSON-(De)Serialisierung
- 2. Immutability: Klonen geht mit Plain Objects einfacher
*/
