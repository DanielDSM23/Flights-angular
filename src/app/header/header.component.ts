import { Component, inject, Input } from '@angular/core';
import { LucideAngularModule, User } from 'lucide-angular';
import { Router } from '@angular/router';
import { SpinLogoDirective } from '../shared/directives/spin-logo.directive';

@Component({
  selector: 'app-header',
  imports: [
    LucideAngularModule,
    SpinLogoDirective
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  animation = 'animate-pulse'
  readonly user = User;
  private router = inject(Router);
  handleSignInClick(){
    this.router.navigate(["/login"])
  }

}
