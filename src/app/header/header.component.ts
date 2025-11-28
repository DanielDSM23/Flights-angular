import { Component, inject } from '@angular/core';
import { LucideAngularModule, User } from 'lucide-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  readonly user = User;
  private router = inject(Router);
  handleSignInClick(){
    this.router.navigate(["/login"])
  }

}
