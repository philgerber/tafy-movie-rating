import { Routes } from "@angular/router";
import { DashboardPage } from "./dashboard-page/dashboard-page";
import { MovieDetailsPage } from "./movie-details-page/movie-details-page";
import { MovieCreatePage } from "./movie-create-page/movie-create-page";

export const moviesRoutes: Routes = [
    { path: 'movies', component: DashboardPage },
    { path: 'movies/create', component: MovieCreatePage },
    { path: 'movies/:id', component: MovieDetailsPage }
]