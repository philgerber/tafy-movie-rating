import { TestBed } from '@angular/core/testing';

import { MovieRatingHelper } from './movie-rating-helper';

describe('MovieRatingHelper', () => {
  let service: MovieRatingHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieRatingHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
