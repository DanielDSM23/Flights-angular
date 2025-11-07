import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  providers: [AuthService, HttpClient, Router],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  constructor(private authService : AuthService, private router : Router) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onSubmit(): void {
    this.authService.getUser(this.loginForm.value.email!, this.loginForm.value.password!).subscribe(users => {
      if (users.length > 0) {
        this.authService.loginUser(users[0].id, users[0].first_name, users[0].last_name);
        this.router.navigate(['']);
      } else {
        alert('Invalid email or password.');
      }
    });
  }
}
