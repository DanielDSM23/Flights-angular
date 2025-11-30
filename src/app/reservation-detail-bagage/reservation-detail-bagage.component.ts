import { Component, EventEmitter, Output, signal } from '@angular/core';
import { Plus, Minus, LucideAngularModule, Plane, UtensilsCrossed, Luggage } from 'lucide-angular';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@Component({
  selector: 'app-reservation-detail-bagage',
  imports: [
    LucideAngularModule, 
    FormsModule
  ],
  templateUrl: './reservation-detail-bagage.component.html',
  styleUrl: './reservation-detail-bagage.component.css'
})
export class ReservationDetailBagageComponent {
  readonly utensilsCrossed = UtensilsCrossed;
  readonly plane = Plane;
  readonly minus = Minus;
  readonly plus = Plus;
  readonly luggage = Luggage;

  @Output() bagPriceOutput = new EventEmitter<number>();
  @Output() mealPriceOutput = new EventEmitter<number>();
  @Output() seatPriceOutput = new EventEmitter<number>();


  isMinusCheckedBagageDisabled = signal(true);
  seatSelection= signal(false)
  mealSelection = signal(false)

  bagPrice = signal(60);
  checkedBags = signal(0);
  mealPrice = signal(30);
  seatPrice = signal(15);

  onAddBagage(){
    this.checkedBags.set(this.checkedBags()+1);
    this.bagPriceOutput.emit(this.checkedBags());
  }

  onSubstractBagage(){
    if(this.checkedBags()==0){
      return;
    }
    this.checkedBags.set(this.checkedBags()-1);
    this.bagPriceOutput.emit(this.checkedBags());
  }

  onMealChecked(event : any){
    console.log(event)
    if(!event.target.checked){
      this.mealPriceOutput.emit(0)
      return;
    }
    this.mealPriceOutput.emit(this.mealPrice())
  }

  onSeatChecked(event: any){
    if(!event.target.checked){
      this.seatPriceOutput.emit(0)
      return;
    }
    this.seatPriceOutput.emit(this.seatPrice())
  }
}
