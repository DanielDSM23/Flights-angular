import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlightInterface } from '../../models/flight.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  private _searchedFlights = new BehaviorSubject<FlightInterface[]>([]);

  public searchedFlights$ = this._searchedFlights.asObservable();

  public passengerNumber = 0;

  public returnDate = "";

  constructor(private http: HttpClient) { }

  public getFlights() {
    return this.http.get<FlightInterface[]>('http://localhost:3000/flights');
  }

  public getFlightById(id :string){
    return this.http.get<FlightInterface>(`http://localhost:3000/flights/${id}`)
  }

  public searchFlights(departurePlace: string, arrivalPlace: string, departureDate: string, passengerNumber : number, returnDate : string): void {
    this.passengerNumber = passengerNumber;
    this.returnDate = returnDate;
    this.getFlights().subscribe(allFlights => {
      
      const filtered = allFlights.filter(flight => {
        if (!flight.segments || flight.segments.length === 0) return false;

        const firstSegment = flight.segments[0].flight;
        const lastSegment = flight.segments[flight.segments.length - 1].flight;

        const matchDeparturePlace = !departurePlace || 
            firstSegment.from.toLowerCase().includes(departurePlace.toLowerCase());

        const matchArrivalPlace = !arrivalPlace || 
            lastSegment.to.toLowerCase().includes(arrivalPlace.toLowerCase());

        let matchDepartureDate = true;
        if (departureDate) {
            const realDepartureDate = new Date(firstSegment.depart);
            const askedDepartureDate = new Date(departureDate);
            const realDateString = realDepartureDate.toISOString().split('T')[0];
            const askedDepartureDateString = askedDepartureDate.toISOString().split('T')[0];
            matchDepartureDate = realDateString === askedDepartureDateString;
        }
        return matchDeparturePlace && matchArrivalPlace && matchDepartureDate;
      });

      this._searchedFlights.next(filtered);
    });
  }
}
