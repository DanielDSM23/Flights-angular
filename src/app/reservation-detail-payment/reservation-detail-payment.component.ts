import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Currency, LucideAngularModule, Shield } from 'lucide-angular';
import { AirportService } from '../shared/services/airport.service';
import { FlightService } from '../shared/services/flight.service';

@Component({
  selector: 'app-reservation-detail-payment',
  imports: [LucideAngularModule],
  templateUrl: './reservation-detail-payment.component.html',
  styleUrl: './reservation-detail-payment.component.css'
})
export class ReservationDetailPaymentComponent implements OnInit {
  airportService = inject(AirportService)
  flightService = inject(FlightService)
  readonly shield = Shield;
  @Input() flightPriceAmount = 0
  @Input() passengersNumber = 1
  @Input() bagagePrice = 0
  @Input() mealPriceInput = 0
  @Input() seatPriceInput = 0
  totalPrice = signal(0);
  taxes = signal(this.airportService.airportTaxes);
  passengers = signal(1);
  seatPrice = signal(0);
  seatSelection = signal(false)
  mealPrice = signal(0);
  mealSelection = signal(false);
  bagPrice = signal(0);
  checkedBags = signal(0);
  returnPrice = signal(0);
  basePrice= signal(0);


  ngOnInit(): void {
    this.basePrice.set((this.flightPriceAmount/2)*this.passengers())
    this.returnPrice.set((this.flightPriceAmount/2)*this.passengers());
    this.totalPrice.set(this.basePrice()+this.returnPrice()+this.taxes())
    this.passengers.set(this.passengersNumber);
    this.bagPrice.set(this.bagagePrice);
    this.mealPrice.set(this.mealPriceInput);
    this.seatPrice.set(this.seatPriceInput);
  }

 
  
}
