import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { authRedirectGuard } from './shared/guards/auth.redirect.guard';
import { HomeComponent } from './home/home.component';
import { FlightComponent } from './flight/flight.component';

export const routes: Routes = [
  {
    path: '',
    component : HomeComponent
  },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [authRedirectGuard]

  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authRedirectGuard]
  },
  {
    path: 'flights',
    component: FlightComponent
  },
  {
    path: 'flight-details/:reference',
    component: HomeComponent
  }
];
