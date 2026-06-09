import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Movie, MovieCreate } from './movie';
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
  
  getSingle(id: string): Observable<Movie> {
    return this.#http.get<Movie>(this.#apiUrl + '/movies/' + id);
  }

  create(movie: MovieCreate): Observable<Movie> {
    return this.#http.post<Movie>(this.#apiUrl + '/movies', movie);
  }

  search(term: string): Observable<Movie[]> {
    if (!term.trim()) {
      return this.getAll();
    }

    return this.#http.get<Movie[]>(
      this.#apiUrl + '/movies?title:contains=' + encodeURIComponent(term)
    );
  }

  delete(id: number): Observable<unknown> {
    return this.#http.delete<unknown>(this.#apiUrl + '/movies/' + id);
  }
}
