import { Component, signal, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieStore } from '../shared/movie-store';
import { Movie } from '../shared/movie';
import { filter, map, switchMap } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movie-details-page',
  imports: [RouterLink],
  templateUrl: './movie-details-page.html',
  styleUrl: './movie-details-page.scss',
})
export class MovieDetailsPage {

  #route = inject(ActivatedRoute);
  #store = inject(MovieStore);
  
  protected readonly movie = toSignal(this.#route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    filter(id => !isNaN(id)),
    switchMap(id => this.#store.getSingle(id))
  ));
}
