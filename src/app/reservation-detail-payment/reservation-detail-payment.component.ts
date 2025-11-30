import { Component, computed, inject, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Currency, LucideAngularModule, Shield } from 'lucide-angular';
import { AirportService } from '../shared/services/airport.service';
import { FlightService } from '../shared/services/flight.service';

@Component({
  selector: 'app-reservation-detail-payment',
  imports: [LucideAngularModule],
  templateUrl: './reservation-detail-payment.component.html',
  styleUrl: './reservation-detail-payment.component.css'
})
export class ReservationDetailPaymentComponent implements OnInit, OnChanges {
  airportService = inject(AirportService)
  flightService = inject(FlightService)
  readonly shield = Shield;
  @Input() flightPriceAmount = 0
  @Input() passengersNumber = 1
  @Input() bagageNumber = 0
  @Input() mealPriceInput = 0
  @Input() seatPriceInput = 0
  totalPrice = signal(0);
  taxes = signal(this.airportService.airportTaxes);
  passengers = signal(1);
  seatPrice = signal(0);
  mealPrice = signal(0);
  bagBasePrice = signal(60);
  bagPrice = signal(0);
  checkedBags = signal(this.bagageNumber);
  returnPrice = signal(0);
  basePrice= signal(0);

  

  constructor(){
    
  }
  
  ngOnInit(): void {
    this.basePrice.set((this.flightPriceAmount/2)*this.passengers())
    this.returnPrice.set((this.flightPriceAmount/2)*this.passengers());
    this.passengers.set(this.passengersNumber);
    this.bagPrice.set(this.bagageNumber*this.bagBasePrice());
    this.mealPrice.set(this.mealPriceInput*this.passengersNumber);
    this.seatPrice.set(this.seatPriceInput*this.passengersNumber);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.flightPriceAmount)
    const calculateTotalPrice = computed(() => ((this.flightPriceAmount/2)*this.passengersNumber)+((this.flightPriceAmount/2)*this.passengersNumber)+(this.bagageNumber*this.bagBasePrice())+this.taxes()+(this.mealPriceInput*this.passengersNumber)+(this.seatPriceInput*this.passengersNumber));
    this.totalPrice.set(calculateTotalPrice())
  }

 
  
}
