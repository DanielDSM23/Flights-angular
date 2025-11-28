import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FlightInterface } from '../../models/flight.interface';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) { }

  public getFlights() {
    return this.http.get<FlightInterface[]>('http://localhost:3000/flights');
  }

  public getFlightById(id :string){
    return this.http.get<FlightInterface>(`http://localhost:3000/flights/${id}`)
  }

  
}
