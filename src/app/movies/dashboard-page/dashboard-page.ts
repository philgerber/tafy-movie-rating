import { Component, signal, inject } from '@angular/core';
import { Movie } from '../shared/movie';
import { MovieCard } from '../movie-card/movie-card';
import { MovieRatingHelper } from '../shared/movie-rating-helper';
import { MovieStore } from '../shared/movie-store';
import { RouterLink } from '@angular/router';
import { SbbButtonModule } from '@sbb-esta/angular/button';

@Component({
  selector: 'app-dashboard-page',
  imports: [MovieCard, RouterLink, SbbButtonModule],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {

  protected readonly movies = signal<Movie[]>([]);

  #ratingHelper = inject(MovieRatingHelper);
  #store = inject(MovieStore);

  constructor() {
    this.#store.getAll().subscribe(receivedMovies => {
      this.movies.set(receivedMovies);
    })
  }

  doRateUp(movie: Movie) {
    const ratedMovie = this.#ratingHelper.rateUp(movie);
    this.#updateList(ratedMovie)
    console.log('UP', movie);
  }

  doRateDown(movie: Movie) {
    const ratedMovie = this.#ratingHelper.rateDown(movie);
    this.#updateList(ratedMovie)
    console.log('DOWN', movie);
  }

  doDeleteMovie(movie: Movie): void {
    if (!confirm(`Film "${movie.title}" wirklich löschen?`)) {
      return;
    }
    this.#store.delete(movie.id).subscribe(() => {
      this.movies.update(oldList => oldList.filter(m => m.id !== movie.id));
    });
  }

  #updateList(ratedMovie: Movie) {
    this.movies.update(movies => {
      return movies.map(m => {
        if (m.id == ratedMovie.id) {
          return ratedMovie;
        }
        return m;
      })
    })
  }

}
