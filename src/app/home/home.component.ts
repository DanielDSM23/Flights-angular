import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FlightSearchFormComponent } from '../flight-search-form/flight-search-form.component';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent, 
    FooterComponent,
    FlightSearchFormComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
