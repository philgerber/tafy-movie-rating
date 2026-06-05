import { Injectable } from '@angular/core';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root',
})
export class MovieRatingHelper {

  rateUp(movie: Movie): Movie {
    return {
      ...movie,
      rating: movie.rating + 1
    };
  }

  rateDown(movie: Movie): Movie {
    return {
      ...movie,
      rating: movie.rating -1
    };
  }
  
}
