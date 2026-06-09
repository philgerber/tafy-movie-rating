import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Movie } from './movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieStore {
  #http = inject(HttpClient);
  #apiUrl = 'http://localhost:3000';

  getAll(): Observable<Movie[]> {
    return this.#http.get<Movie[]>(this.#apiUrl + '/movies');
  }

  getSingle(isbn: string): Observable<Movie> {
    return this.#http.get<Movie>(this.#apiUrl + '/movies/' + isbn);
  }

  create(movie: Movie): Observable<Movie> {
    return this.#http.post<Movie>(this.#apiUrl + '/movies', movie);
  }

  search(term: string): Observable<Movie[]> {
    return this.#http.get<Movie[]>(this.#apiUrl + '/movies/search/' + term);
  }

  delete(id: number): Observable<unknown> {
    return this.#http.delete<unknown>(this.#apiUrl + '/movies/' + id);
  }
}
