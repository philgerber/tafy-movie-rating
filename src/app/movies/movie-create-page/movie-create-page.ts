import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SbbButtonModule } from "@sbb-esta/angular/button";
import { SbbInputModule, SbbInput } from "@sbb-esta/angular/input";
import { SbbFormFieldModule, SbbFormField } from "@sbb-esta/angular/form-field";
import { MovieCreate } from '../shared/movie';
import { MovieStore } from '../shared/movie-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-create-page',
  imports: [SbbFormField, SbbInput, ReactiveFormsModule, SbbInputModule, SbbFormFieldModule, SbbButtonModule],
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
      validators: [Validators.required, Validators.minLength(5)],
    }),
    year: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1888), Validators.max(2030,)]
    }),
    genre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    imageUrl: new FormControl('', {
      nonNullable: false
    })
  })

  doCreate(): void {
    this.movieForm.markAllAsTouched();

    if (this.movieForm.invalid) {
      return;
    }

    const formValue = this.movieForm.getRawValue();


    const movie: MovieCreate = {
      ...formValue,
      rating: 1,
      imageUrl: formValue.imageUrl ?? ''
    };

    this.isSaving.set(true);

    this.#store.create(movie).subscribe({
      next: createdMovie => {
        this.#router.navigate(['/movies', createdMovie.id])
      },
      error: error => {
        console.log('Movie could not be created', error)
        this.isSaving.set(false);
      }
    })
    
  }

}
