import { Component, OnInit } from '@angular/core';
import { FlightInterface } from '../models/flight.interface';
import { FlightService } from '../shared/services/flight.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight',
  imports: [CommonModule],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})

export class FlightComponent implements OnInit {
  flights: FlightInterface[] = [];

  constructor(
    private flightsService: FlightService,
    private router: Router
  ) { }

    ngOnInit(): void {
      this.flightsService.getFlights().subscribe((data: FlightInterface[]) => {
        this.flights = data
        console.log(data);
      })
    }

    navigateToDetails(reference: string) {
      this.router.navigate(['flight-details/', reference]);
    }
}
