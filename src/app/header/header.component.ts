import { Component, inject, Input } from '@angular/core';
import { LucideAngularModule, User, LogOut } from 'lucide-angular';
import { Router } from '@angular/router';
import { SpinLogoDirective } from '../shared/directives/spin-logo.directive';
import { AuthService } from '../shared/services/auth.service';

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
  isUserLogged = false
  constructor(private authService: AuthService) {
    this.isUserLogged = this.authService.isUserLoggedIn();
  }
  animation = 'animate-pulse'
  readonly user = User;
  readonly logout = LogOut;
  private router = inject(Router);
  handleSignInClick(){
    this.router.navigate(["/login"])
  }
  handleDisconnectClick() {
    this.authService.logoutUser();
    location.reload();
  }

}
