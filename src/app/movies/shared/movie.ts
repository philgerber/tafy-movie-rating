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