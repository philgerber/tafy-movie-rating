import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieStore } from '../shared/movie-store';
import { Movie } from '../shared/movie';
import { map, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movie-details-page',
  imports: [RouterLink],
  templateUrl: './movie-details-page.html',
  styleUrl: './movie-details-page.scss',
})
export class MovieDetailsPage {

  #route = inject(ActivatedRoute);
  #store = inject(MovieStore);
  protected readonly movie = signal<Movie | undefined>(undefined);

  constructor() {
    this.#route.paramMap
      .pipe(
        map(param => Number(param.get('id'))),
        switchMap(id => this.#store.getSingle(id)),
        takeUntilDestroyed()
      )
      .subscribe(movie => this.movie.set(movie));
  }

}
