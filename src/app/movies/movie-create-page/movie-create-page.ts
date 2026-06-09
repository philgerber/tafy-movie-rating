import { Component, inject, signal } from '@angular/core';
import { MovieCreate, MovieFormData } from '../shared/movie';
import { form, FormField, max, maxLength, min, minLength, pattern, provideSignalFormsConfig, required, validate } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { MovieStore } from '../shared/movie-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-create-page',
  imports: [FormField, JsonPipe],
  templateUrl: './movie-create-page.html',
  styleUrl: './movie-create-page.scss',
  providers: [
    provideSignalFormsConfig({
      classes: {
        // CSS-Klasse "invalid" wird auf DOM-Element angewendet, wenn Bedingung erfüllt ist
        invalid: (field) => field.state().touched() && field.state().invalid()
      }
    })
  ]
})
export class MovieCreatePage {
  #store = inject(MovieStore);
  #router = inject(Router);

  // Datenmodell
  #movieFormData = signal<MovieFormData>({
    title: '',
    director: '',
    genre: '',
    description: '',
    year: '',
    rating: 1,
    imageUrl: '',
  });

  // Formularmodell
  protected readonly movieForm = form(this.#movieFormData, path => {
    required(path.title, { message: 'Title is required.' });
    maxLength(path.title, 80, { message: 'Title must not be longer than 80 chars.' });
    required(path.genre, { message: 'Genre is required.' });
    maxLength(path.genre, 60, { message: 'Genre must not be longer than 60 chars.' });

  // TODO: Make validation work: Form is invalid, mark fields as touched when submitting
    required(path.year, { message: 'Year is required' });
    min(path.year, 1800, { message: 'Year must in range of 1888 and 2030' });
    max(path.year, 2030, { message: 'Year must in range of 1888 and 2030' });

    required(path.rating, { message: 'Rating is required' });
    min(path.rating, 1, { message: 'Rating must in range of 1...5' });
    max(path.rating, 5, { message: 'Rating must in range of 1...5' });

    required(path.imageUrl, { message: 'Image URL is required.' });
    maxLength(path.imageUrl, 200, { message: 'Image URL must not be longer than 200 chars.' });
  });

  submitForm() {
    // prüfen, ob das Formular überhaupt gültig ist
    if (this.movieForm().invalid()) {
      return false;
    }

    // Film erzeugen aus den Formulardaten
    const movie = this.#movieFormData();

    if (movie.year === '') {
      alert('Please enter a year.');
      return false;
    }

    const newMovie: MovieCreate = {
      ...movie,
      year: Number(movie.year),
    };

    this.#store.create(newMovie).subscribe(createdMovie => {
      this.#router.navigate(['/movies', createdMovie.id]);
    });

    return false; // prevent reload
  }
}
