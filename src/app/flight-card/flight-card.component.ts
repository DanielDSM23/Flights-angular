import { Component, Input, input, OnInit, signal, LOCALE_ID, Pipe, Output, EventEmitter } from '@angular/core';
import { LucideAngularModule, Plane, Clock, Calendar } from 'lucide-angular';
import { FlightInfoInterface, SegmentInterface, TotalInterface } from '../models/flight.interface';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CurrencyConverterPipe } from '../shared/pipes/currency-converter.pipe';

registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-flight-card',
  imports: [
    LucideAngularModule,
    CommonModule,
    CurrencyConverterPipe

  ],
  providers: [
    // 🔑 Set the global locale to 'fr'
    { provide: LOCALE_ID, useValue: 'fr' }
  ],
  templateUrl: './flight-card.component.html',
  styleUrl: './flight-card.component.css'
})
export class FlightCardComponent implements OnInit {
  readonly plane = Plane;
  readonly clock = Clock;
  readonly calendar = Calendar;

  @Output() cardClick = new EventEmitter<void>();
  @Input() flightInfo : SegmentInterface[] = [{
    flight: {
      airline: '',
      number: '',
      from: '',
      to: '',
      depart: new Date,
      arrive: new Date
    }
  }];
  @Input() id = ""
  @Input() total : TotalInterface= {
    amount: 0,
    currency: ''
  }
  @Input() status = ""
  airline = signal("");
  flightNumber = signal("");
  flightClass = signal("");
  stops = signal(0);
  departureTime = signal(new Date());
  departureAirport = signal("");
  departureDate = signal(new Date());
  flightDuration = signal(0);
  arrivalTime = signal(new Date());
  arrivalAirport = signal("");
  price = signal(0);

  ngOnInit(): void {
    //initaliser les attribut du composant ici TODO
    const segment = this.flightInfo[0]
    const arrival = this.flightInfo[this.flightInfo.length - 1]
    const total = this.total
    this.airline.set(segment.flight.airline)
    this.flightNumber.set(segment.flight.number)
    this.departureTime.set(segment.flight.depart)
    this.departureAirport.set(segment.flight.from)
    this.arrivalTime.set(arrival.flight.arrive)
    this.arrivalAirport.set(arrival.flight.to)
    this.price.set(total.amount)
    this.stops.set(this.flightInfo.length - 1)
    // if(this.arrivalTime() && this.departureTime())
    // let diffDurationOfFlight = Math.abs(this.arrivalTime().getTime() - this.departureTime().getTime())  / 1000;
    // diffDurationOfFlight /= (60 * 60);
    // console.log(diffDurationOfFlight)
    // this.flightDuration.set(diffDurationOfFlight);
  }

  onSelect(){
    console.log("Selected")
  }

  onCardClick() {
    this.cardClick.emit();
  }

}
