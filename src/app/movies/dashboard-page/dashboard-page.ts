import { Component, signal, inject } from '@angular/core';
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

  #ratingHelper = inject(MovieRatingHelper);

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
