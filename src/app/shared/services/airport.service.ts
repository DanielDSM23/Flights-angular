import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AirportInterface } from '../../models/airport.interface';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  constructor(private http: HttpClient) { }

  public getAirports() {
      return this.http.get<AirportInterface[]>('http://localhost:3000/airport');
  }
}
