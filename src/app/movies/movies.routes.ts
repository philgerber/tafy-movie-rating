import { Routes } from "@angular/router";
import { DashboardPage } from "./dashboard-page/dashboard-page";
import { MovieDetailsPage } from "./movie-details-page/movie-details-page";
import { MovieCreatePage } from "./movie-create-page/movie-create-page";
import { MovieSearchPage } from "./movie-search-page/movie-search-page";

export const moviesRoutes: Routes = [
  { path: '', component: DashboardPage },
  { path: 'create', component: MovieCreatePage },
  { path: 'search', component: MovieSearchPage },
  { path: ':id', component: MovieDetailsPage }
];