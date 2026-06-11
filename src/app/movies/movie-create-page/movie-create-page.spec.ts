import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCreatePage } from './movie-create-page';

describe('MovieCreatePage', () => {
  let component: MovieCreatePage;
  let fixture: ComponentFixture<MovieCreatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCreatePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieCreatePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
