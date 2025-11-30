import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { FlightInterface } from '../models/flight.interface';
import { FlightService } from '../shared/services/flight.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FlightCardComponent } from "../flight-card/flight-card.component";
import { FooterComponent } from "../footer/footer.component";
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { FlightRecapFormComponent } from '../flight-recap-form/flight-recap-form.component';

@Component({
  selector: 'app-flight',
  imports: [CommonModule, HeaderComponent, FlightCardComponent, FooterComponent, LucideAngularModule, FlightRecapFormComponent],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})

export class FlightComponent implements OnInit {

  flights: FlightInterface[] = [];
  readonly arrowLeft = ArrowLeft;

  constructor(
    private flightsService: FlightService,
    private router: Router
  ) {
    this.flightsService.searchedFlights$.subscribe(data => {
      this.flights = data;
    });
  }

  ngOnInit() {
    
  }

  onBackToSearch() {
    this.router.navigate(['/']);
  }

  navigateToDetails(reference: string) {
    this.router.navigate(['flight-details/', reference]);
  }
}
