import { Component, signal } from '@angular/core';
import { Movie } from '../shared/movie';
import { MovieCard } from '../movie-card/movie-card';

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

  

}
