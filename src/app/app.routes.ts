import { Routes } from '@angular/router';
import { moviesRoutes } from './movies/movies.routes';
import { ErrorPage } from './error-page/error-page';

export const routes: Routes = [
    ...moviesRoutes,
    // bei Weiterleitung vom leeren Pfad
    { path: '', redirectTo: 'movies', pathMatch: 'full' },
    ...moviesRoutes,
    { path: '**', component: ErrorPage} // **: Wildcard-Route
];
