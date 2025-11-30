import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../shared/services/flight.service';
import { CommonModule } from '@angular/common';
import { FlightCardDetailComponent } from '../flight-card-detail/flight-card-detail.component';
import { ReservationDetailBagageComponent } from '../reservation-detail-bagage/reservation-detail-bagage.component';
import { ReservationDetailPaymentComponent } from '../reservation-detail-payment/reservation-detail-payment.component';
import { SegmentInterface,FlightInfoInterface } from '../models/flight.interface';
import { LucideAngularModule, User, Calendar } from 'lucide-angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-reservation-details',
  imports: [
    HeaderComponent, 
    FooterComponent,
    FlightCardDetailComponent,
    CommonModule,
    ReservationDetailBagageComponent,
    ReservationDetailPaymentComponent,
    LucideAngularModule,
    ReactiveFormsModule
  ],
  templateUrl: './reservation-details.component.html',
  styleUrl: './reservation-details.component.css'
})
export class ReservationDetailsComponent implements OnInit {
  hasReturnFlight = signal(false);
  readonly user = User;
  readonly calendar = Calendar;
  route = inject(ActivatedRoute);
  service = inject(FlightService);

  OutboundFlightId  = signal("");
  ref = signal("");
  total = signal({
    amount: 0,
    currency: ''
  });

  passengersArray = signal(this.passengerCounter(this.service.passengerNumber));
  passengerNumber = signal(1);


  status = signal("");

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

  returnFlightInfo = signal<SegmentInterface[]>([]);

  totalReturnFlight = signal({
      amount: this.total().amount,
      currency: this.total().currency
  });

  BagPrice = signal(0)
  MealPrice = signal(0)
  SeatPrice = signal(0)
  returnDepartureDate = signal(new Date(this.service.returnDate));
  returnArrivalDate = signal(new Date)
  travelTime = signal(0);
  passengerForm : FormGroup;


  constructor(private formBuilder: FormBuilder,) {
    this.route.params.subscribe(params => {
      this.OutboundFlightId.set(params['reference']);
    });
    this.service.getFlightById(this.OutboundFlightId()).subscribe((f)=>{
      this.ouboundFlightInfo.set(f.segments);
      this.total.set(f.total);
      this.status.set(f.status);
      this.ref.set(f.id);
    });
    this.passengerForm = this.formBuilder.group({
    passengerFirstName: ["",Validators.required],
    passengerLastName: ["",Validators.required],
    passengerBirthDate: ["",Validators.required],
    
    });
    this.passengersArray.set(this.passengerCounter(this.service.passengerNumber));
  }
  
  ngOnInit(): void {
    this.passengersArray.set(this.passengerCounter(this.service.passengerNumber));
    console.log(this.passengersArray().length)
    this.passengerNumber.set(this.passengersArray().length);
  }

  //temporary creating a return flight from an outbound flight here 
  //because the code does not provide return flight data yet
  private createReturnFlight(sengmentArray : SegmentInterface[] = [{
    flight: {
      airline: "",
      number: "",
      from: "",
      to: "",
      depart: new Date,
      arrive: new Date
    }
  }], returnDate: Date){
    let flightInfo : FlightInfoInterface = {
      airline: '',
      number: '',
      from: '',
      to: '',
      depart: new Date,
      arrive: new Date
    };
    
      //mapping outbound data to return flight data
      const airlineName = sengmentArray[0].flight.airline
      const flightNumber = sengmentArray[0].flight.number
      const flightFrom = sengmentArray[0].flight.to
      const flightTo = sengmentArray[0].flight.from
      const flightDepart = returnDate;
      const flightArrive = new Date(flightDepart.getTime() + this.travelTime());

      flightInfo["airline"] = airlineName
      flightInfo["number"] = flightNumber
      flightInfo["from"] = flightFrom
      flightInfo["to"] = flightTo
      flightInfo["depart"] = flightDepart
      flightInfo["arrive"] = flightArrive
      let returnInfoToadd = [{
        flight: flightInfo
      }]
      this.returnFlightInfo.set(returnInfoToadd);
  }

  onTravelTimeChange(event : any){
    this.hasReturnFlight.set(false);
    this.returnFlightInfo().pop();
    let travelTimeInMilliseconds = (event * 3600) * 1000
    this.travelTime.set(travelTimeInMilliseconds);
    this.createReturnFlight(this.ouboundFlightInfo(),this.returnDepartureDate());
    this.hasReturnFlight.set(true);
  }

  isValidDate(date :Date) {
    if (Object.prototype.toString.call(date) === "[object Date]") {
        if (isNaN(date.getTime())) {
            return false
        }
        else {
            return true
        }
    }
    return false
  }
  
  passengerCounter(length: number) {
    const array = new Array()
    for( let i = 0; i<length; i++){
      const counter = i+1
      array.push("Passenger "+counter);
    }
    return array;
  }

  onBackToResults(){
    console.log("back");
  }

  onBagPriceChange(event : number){
    console.log(event)
    this.BagPrice.set(event)
  }

  onMealPriceChange(event : number){
    console.log(event)
    this.MealPrice.set(event)
  }

  onSeatPriceChange(event : number){
    console.log(event)
    this.SeatPrice.set(event)
  }
}
