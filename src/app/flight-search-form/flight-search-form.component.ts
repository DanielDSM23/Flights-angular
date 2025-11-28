import { Component, computed, EventEmitter, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ComboBoxComponent } from '../comboBox/comboBox.component';
import { LucideAngularModule, MapPin, Plane } from 'lucide-angular';
import { AirportService } from '../shared/services/airport.service';
import { AirportInterface } from '../models/airport.interface';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FlightInterface } from '../models/flight.interface';
import { FlightService } from '../shared/services/flight.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-search-form',
  imports: [
    LucideAngularModule,
    ReactiveFormsModule
  ],
  templateUrl: './flight-search-form.component.html',
  styleUrl: './flight-search-form.component.css'
})
export class FlightSearchFormComponent implements OnInit {
  tripTypeList = ["Round Trip","Oneway","Multicity"];
  readonly mapPin = MapPin;
  readonly plane = Plane;
  comboBoxStateFrom = signal(true);
  comboBoxStateTo = signal(true);
  private airportService = inject(AirportService);
  airportList = signal<AirportInterface[]>([]);
  filteredairportList = signal<AirportInterface[]>([]);
  search = signal('');
  flightForm : FormGroup;
  
  
  // flightFormGroupObject = signal({
  //   departfrom: ["",Validators.required],
  //   to: ["",Validators.required],
  //   start: ["",Validators.required],
  //   end: ["",Validators.required],
  //   passengerNumber: ["1",Validators.required],
  //   ticketClass:  ["Economy",Validators.required],
  // });

  constructor(
    private formBuilder: FormBuilder,
    private flightService: FlightService,
    private router: Router
  ) {
    this.flightForm = this.formBuilder.group({
    from: ["",Validators.required],
    to: ["",Validators.required],
    start: ["",Validators.required],
    end: ["",Validators.required],
    passengerNumber: ["1",Validators.required],
    ticketClass:  ["Economy",Validators.required],
    });
  }

  
  

  ngOnInit(): void {
    
  }
  

  onSearchAirport(event: any){
    this.search.set(event.target.value);
    
    this.airportService.getAirports().subscribe({
      next:(res)=>{
        const data = res.filter((airport : AirportInterface ) =>{
          return airport.attributes["name"].toLowerCase().includes(this.search().toLowerCase())
        });
        this.filteredairportList.set(data);
      },
      error: ()=>{},
      complete:()=>{}
    })
  }

  onComboBoxBlur(stateFrom :  WritableSignal<boolean>, stateTo :  WritableSignal<boolean>){
    stateFrom.set(true);
    stateTo.set(true);
  }

  onFocusSearch(state :  WritableSignal<boolean>, event: Event){
    event.stopPropagation();
    state.set(false);
  }

  onSubmit() {
    const formValues = this.flightForm.value;
    
    const origin = formValues.from;
    const destination = formValues.to;

    const departureDate = formValues.start;
    let dateDeparture = "";

    if (departureDate) {
        const splittedDate = departureDate.split('/').reverse().join('-');
        dateDeparture = new Date(splittedDate).toISOString().split('T')[0]; 
    }

    this.flightService.searchFlights(origin, destination, dateDeparture);
    this.router.navigate(['/flights']);
  }

  handleComboBoxFromClick(event : any){
    event.stopPropagation();
    this.flightForm.patchValue({
      from:event.target.innerText
    })
    this.comboBoxStateFrom.set(true);
    this.filteredairportList.set(this.airportList());
  }

  handleComboBoxToClick(event : any){
    event.stopPropagation();
    this.flightForm.patchValue({
      to:event.target.innerText
    })
    this.comboBoxStateTo.set(true);
    this.filteredairportList.set(this.airportList());
  }

  handleStartDate(event : any){
    this.flightForm.patchValue({
      start:event.target.value
    })
  }

  handleEndDate(event : any){
    this.flightForm.patchValue({
      end:event.target.value
    })
  }
}
