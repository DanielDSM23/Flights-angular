import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   component : HomeComponent
  // },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];
