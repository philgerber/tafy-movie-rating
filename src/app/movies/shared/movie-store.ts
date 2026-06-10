import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './movie';

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

  create(movie: Movie): Observable<Movie> {
    return this.#http.post<Movie>(this.#apiUrl + '/movies', movie)
  }

  search(term: string): Observable<Movie[]> {
    return this.#http.get<Movie[]>(this.#apiUrl + '/movies/search/' + term)
  }
  
}
