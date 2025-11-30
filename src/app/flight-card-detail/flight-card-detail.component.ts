import { Component, EventEmitter, Input, LOCALE_ID, Output, signal } from '@angular/core';
import { SegmentInterface, TotalInterface } from '../models/flight.interface';
import { Calendar, Clock, LucideAngularModule, Plane } from 'lucide-angular';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-flight-card-detail',
  imports: [
    LucideAngularModule,
    CommonModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' } 
  ],
  templateUrl: './flight-card-detail.component.html',
  styleUrl: './flight-card-detail.component.css'
})
export class FlightCardDetailComponent {
  //icons sections
  readonly plane = Plane;
  readonly clock = Clock;
  readonly calendar = Calendar;

  //@Inputs
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
  @Input() status = ""
  @Output() traveltime = new EventEmitter<number>();

  //attributes
  airline = signal("");
  flightNumber = signal("");
  flightClass = signal("Economy");
  stops = signal(0);
  departureTime = signal(new Date());
  departureAirport = signal("");
  flightDuration = signal(0);
  arrivalTime = signal(new Date());
  arrivalAirport = signal("");
  price = signal("");
  
  ngOnInit(): void {
    for(let i =0; i<this.flightInfo.length;i++){
      let segment = this.flightInfo[i]
      if(this.flightInfo.length == 1){
        this.airline.set(segment.flight.airline)
        this.flightNumber.set(segment.flight.number)
        this.departureTime.set(segment.flight.depart)
        this.departureAirport.set(segment.flight.from)
        this.arrivalTime.set(segment.flight.arrive)
        this.arrivalAirport.set(segment.flight.to)
      }else{
        if(i == 0){
          this.airline.set(segment.flight.airline)
          this.flightNumber.set(segment.flight.number)
          this.departureTime.set(segment.flight.depart)
          this.departureAirport.set(segment.flight.from)
        }
        if(i == this.flightInfo.length-1){
          this.arrivalTime.set(segment.flight.arrive)
          this.arrivalAirport.set(segment.flight.to)
        }
      }
    }

    if(this.arrivalTime() && this.departureTime()){
      let diffDurationOfFlight = Math.abs(new Date(this.arrivalTime()).getTime() - new Date(this.departureTime()).getTime())  / 1000;
      diffDurationOfFlight /= (60 * 60);
      this.flightDuration.set(diffDurationOfFlight);
      this.traveltime.emit(diffDurationOfFlight);
    }
  }

  onSelect(){
    console.log("Selected")
  }
}
