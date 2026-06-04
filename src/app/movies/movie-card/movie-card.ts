import { Component, input, output } from '@angular/core';
import { Movie } from '../shared/movie';
import { RatingDisplay } from "../rating-display/rating-display";

@Component({
  selector: 'app-movie-card',
  imports: [RatingDisplay],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
})
export class MovieCard {

  // Input: hier fiessen die Daten der Elternkomponenten hinein
  // von oben nach unten
  readonly movie = input.required<Movie>();

  // Output: hier fliessen Daten zur Elternkomponente hinaus
  // von unten nach oben
  readonly rateUp = output<Movie>();
  readonly rateDown = output<Movie>();

  doRateUp() {
    this.rateUp.emit(this.movie());
  }

  doRateDown() {
    this.rateDown.emit(this.movie());
  }

}
