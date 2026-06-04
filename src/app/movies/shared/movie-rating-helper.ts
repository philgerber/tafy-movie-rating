import { Injectable } from '@angular/core';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root',
})
export class MovieRatingHelper {
  rateUp(movie: Movie): Movie {
    // Early Exit
    if (movie.rating >= 5) {
      return movie;
    }

    return {
      ...movie,
      rating: movie.rating + 1
    };
  }

  rateDown(movie: Movie): Movie {
    return {
      ...movie,
      rating: movie.rating > 1 ? movie.rating - 1 : 1
      // rating: Math.max(1, movie.rating - 1)
    }
  }
}