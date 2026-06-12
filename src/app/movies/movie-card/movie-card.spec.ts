import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { MovieCard } from './movie-card';
import { Movie } from '../shared/movie';

const movie: Movie = {
  id: 1,
  title: 'Inception',
  description: 'A thief enters dreams to steal secrets.',
  director: 'Christopher Nolan',
  year: 2010,
  genre: 'Sci-Fi',
  rating: 3,
  imageUrl: 'https://example.com/inception.jpg',
};

describe('MovieCard', () => {
  let component: MovieCard;
  let fixture: ComponentFixture<MovieCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('movie', movie);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the movie when the rating up button is clicked', () => {
    let emittedMovie: Movie | undefined;
    component.rateUp.subscribe(receivedMovie => (emittedMovie = receivedMovie));

    const rateUpButton = fixture.debugElement.query(By.css('button[aria-label="Rating erhöhen"]'));
    rateUpButton.triggerEventHandler('click');

    expect(emittedMovie).toBe(movie);
  });

  it('should emit the movie when the delete button is clicked', () => {
    let emittedMovie: Movie | undefined;
    component.delete.subscribe(receivedMovie => (emittedMovie = receivedMovie));

    const deleteButton = fixture.debugElement.query(By.css('button.btn-yellow'));
    deleteButton.triggerEventHandler('click');

    expect(emittedMovie).toBe(movie);
  });

  it('should disable the rating up button when the movie has the max rating', () => {
    fixture.componentRef.setInput('movie', { ...movie, rating: 5 });
    fixture.detectChanges();

    const rateUpButton = fixture.debugElement.query(By.css('button[aria-label="Rating erhöhen"]'))
      .nativeElement as HTMLButtonElement;

    expect(rateUpButton.disabled).toBe(true);
  });
});
