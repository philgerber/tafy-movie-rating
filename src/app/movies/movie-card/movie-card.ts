import { Component, input } from '@angular/core';
import { Movie } from '../shared/movie';

@Component({
  selector: 'app-movie-card',
  imports: [],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {

  // Input: hier fiessen die Daten der Elternkomponenten hinein
  // von oben nach unten
  readonly movie = input.required<Movie>();

}
