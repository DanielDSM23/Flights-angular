import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FlightSearchFormComponent } from '../flight-search-form/flight-search-form.component';
import { LucideAngularModule, TrendingUp, Shield, Headphones, CreditCard } from 'lucide-angular';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent, 
    FooterComponent,
    FlightSearchFormComponent,
    LucideAngularModule

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly trendingUp = TrendingUp;
  readonly shield = Shield;
  readonly headphones = Headphones;
  readonly creditCard = CreditCard;
}
