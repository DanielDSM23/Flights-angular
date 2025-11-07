import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { FlightComponent } from './flight/flight.component';

export const routes: Routes = [
  {
    path: '',
    component : AuthComponent
  },
  {
    path: 'flights',
    component: FlightComponent
  }
];
