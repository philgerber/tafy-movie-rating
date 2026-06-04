import { Component, inject, signal } from '@angular/core';
import { Movie } from '../shared/movie';
import { MovieCard } from '../movie-card/movie-card';
import { MovieRatingHelper } from '../shared/movie-rating-helper';

@Component({
  selector: 'app-dashboard-page',
  imports: [MovieCard],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {

  #ratingHelper = inject(MovieRatingHelper);

    protected readonly movies = signal<Movie[]>([
    {
      id: 1,
      title: 'Inception',
      description: 'Ein Dieb stiehlt Geheimnisse aus dem Unterbewusstsein.',
      director: 'Christopher Nolan',
      year: 2010,
      genre: 'Science-Fiction',
      rating: 5,
      imageUrl: 'https://example.com/inception.jpg',
    },
    {
      id: 2,
      title: 'Parasite',
      description: 'Eine arme Familie schleicht sich in ein reiches Haus ein.',
      director: 'Bong Joon-ho',
      year: 2019,
      genre: 'Drama',
      rating: 3,
      imageUrl: 'https://example.com/parasite.jpg',
    },
  ]);

  doRateUp(movie: Movie): void {
    const ratedMovie = this.#ratingHelper.rateUp(movie);
    this.#updateList(ratedMovie);
  }

  doRateDown(movie: Movie): void {
    const ratedMovie = this.#ratingHelper.rateDown(movie);
    this.#updateList(ratedMovie);
  }

  #updateList(ratedMovie: Movie): void {
    // [1,2,3,4,5,6].map(e => e * 10) // [10, 20, 30, 40, 50, 60]
    // [1,2,3,4,5,6].filter(e => e % 2 === 0) // [2,4,6]
    // Aufgabe: das neue Buch in die Liste einfügen
    this.movies.update(oldList => {
      return oldList.map(m => {
        if (m.id == ratedMovie.id) {
          return ratedMovie;
        }
        return m;
      });
    });
  }

}
