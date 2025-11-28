import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FlightCardComponent } from '../flight-card/flight-card.component';
import { ActivatedRoute } from '@angular/router';
import { SegmentInterface, FlightInterface } from '../models/flight.interface';
import { FlightService } from '../shared/services/flight.service';

@Component({
  selector: 'app-reservation-details',
  imports: [
    HeaderComponent, 
    FooterComponent,
    FlightCardComponent
  ],
  templateUrl: './reservation-details.component.html',
  styleUrl: './reservation-details.component.css'
})
export class ReservationDetailsComponent implements OnInit {
  hasReturnFlight = signal(true);
  route = inject(ActivatedRoute)
  service = inject(FlightService);
  OutboundFlightId  = signal("");
  ref = signal("");
  total = signal({
    amount: 0,
    currency: ''
  });
  status = signal("")
  flight  = signal({
    id: "",
    status: "",
    segments: [{
      flight:{}
    }],
    total: {
      amount: 0,
      currency: ""
    }
  });
  ouboundFlightInfo = signal([{
    flight: {
      airline: "",
      number: "",
      from: "",
      to: "",
      depart: new Date,
      arrive: new Date
    }
  }])
  returnFlightInfo = signal([{}])
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.OutboundFlightId.set(params['reference']);
    });
    this.service.getFlightById(this.OutboundFlightId()).subscribe((f)=>{
      // this.flight.set(f);
      this.ouboundFlightInfo.set(f.segments);
      console.log(this.ouboundFlightInfo());
    })
  }

  

  onBackToResults(){
    console.log("back");
  }
}
