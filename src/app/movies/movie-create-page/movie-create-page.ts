import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SbbButtonModule } from '@sbb-esta/angular/button';
import { SbbFormFieldModule } from '@sbb-esta/angular/form-field';
import { SbbInputModule } from '@sbb-esta/angular/input';

import { MovieCreate } from '../shared/movie';
import { MovieStore } from '../shared/movie-store';

@Component({
  selector: 'app-movie-create-page',
  imports: [
    ReactiveFormsModule,
    SbbButtonModule,
    SbbFormFieldModule,
    SbbInputModule,
  ],
  templateUrl: './movie-create-page.html',
  styleUrl: './movie-create-page.scss',
})
export class MovieCreatePage {
  #store = inject(MovieStore);
  #router = inject(Router);

  protected readonly isSaving = signal(false);

  protected readonly movieForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
    director: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    year: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(1888), Validators.max(2030)],
    }),
    genre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    imageUrl: new FormControl('', {
      nonNullable: true,
    }),
  });

  doCreate(): void {
    this.movieForm.markAllAsTouched();

    if (this.movieForm.invalid) {
      return;
    }

    const formValue = this.movieForm.getRawValue();

    if (formValue.year === null) {
      return;
    }

    const movie: MovieCreate = {
      ...formValue,
      year: formValue.year,
      rating: 0,
    };

    this.isSaving.set(true);

    this.#store.create(movie).subscribe({
      next: createdMovie => {
        this.#router.navigate(['/movies', createdMovie.id]);
      },
      error: error => {
        console.error('Movie could not be created', error);
        this.isSaving.set(false);
      },
    });
  }
}