import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { debounceTime, distinctUntilChanged, EMPTY, filter, of, Subject, switchMap } from 'rxjs';
import { MovieStore } from '../shared/movie-store';

@Component({
  selector: 'app-movie-search-page',
  imports: [FormField],
  templateUrl: './movie-search-page.html',
  styleUrl: './movie-search-page.scss',
})
export class MovieSearchPage {
  protected readonly searchTerm = signal('');
  protected readonly searchForm = form(this.searchTerm);

  #movieStore = inject(MovieStore);

  protected readonly results = toSignal(toObservable(this.searchTerm).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term => {
      if (term.length >= 3) {
        return this.#movieStore.search(term);
      } else {
        return of([]);
      }
    })
  ), { initialValue: [] })
}

/*
leerer Suchbegriff: leere Liste
ab 3 Zeichen: echte Suche
*/
