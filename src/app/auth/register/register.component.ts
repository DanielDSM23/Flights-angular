import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [AuthService, HttpClient],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService : AuthService) {}

  registerForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordcheck: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  onSubmit(): void {
    console.log(this.registerForm.value);

    if (this.registerForm.value.password !== this.registerForm.value.passwordcheck) {
      alert('Passwords do not match.');
      return;
    }

    const newUser : User = {
      id : crypto.randomUUID(),
      first_name: this.registerForm.value.firstname!,
      last_name: this.registerForm.value.lastname!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
    };

    this.authService.addUser(newUser).subscribe(user => {
      alert('Registration successful! You can now log in.');
      this.registerForm.reset();
    });
  }

}
