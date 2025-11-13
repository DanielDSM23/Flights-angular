import { Component, computed, signal } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { LucideAngularModule, MapPin } from 'lucide-angular';

@Component({
  selector: 'app-flight-search-form',
  imports: [
    ButtonComponent,
    LucideAngularModule
  ],
  templateUrl: './flight-search-form.component.html',
  styleUrl: './flight-search-form.component.css'
})
export class FlightSearchFormComponent {
  tripTypeList = ["Round Trip","Oneway","Multicity"];
  readonly mapPin = MapPin;
}
