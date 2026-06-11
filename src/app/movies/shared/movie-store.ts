import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieCreate } from './movie';

@Injectable({
  providedIn: 'root',
})
export class MovieStore {

  #http = inject(HttpClient);
  #apiUrl = 'http://localhost:3000';

  getAll(): Observable<Movie[]> {
    return this.#http.get<Movie[]>(this.#apiUrl + '/movies');
  }

  getSingle(id: number): Observable<Movie> {
    return this.#http.get<Movie>(this.#apiUrl + '/movies/' + id);
  }

  create(movie: MovieCreate): Observable<Movie> {
    return this.#http.post<Movie>(this.#apiUrl + '/movies', movie)
  }

  search(term: string): Observable<Movie[]> {
    return this.#http.get<Movie[]>(this.#apiUrl + '/movies/search/' + term)
  }

  delete(id: number): Observable<unknown> {
    return this.#http.delete<unknown>(this.#apiUrl + '/movies/' + id);
  }
  
}
