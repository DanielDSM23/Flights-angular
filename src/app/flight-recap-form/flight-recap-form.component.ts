import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-recap-form',
  imports: [CommonModule],
  templateUrl: './flight-recap-form.component.html',
  styleUrls: ['./flight-recap-form.component.css'],
})
export class FlightRecapFormComponent {
  @Input() from = '';
  @Input() to = '';
  @Input() date?: string | Date | null;
}
