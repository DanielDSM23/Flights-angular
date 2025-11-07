import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public getUsers():Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  public getUsersById(id: string): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3000/users/${id}`);
  }

  public getUser(email: string, password: string): Observable<User[]>  {
    return this.http.get<User[]>('http://localhost:3000/users?email=' + email + '&password=' + password);
  }

  public loginUser(id: string, surname: string, name: string): void {
    localStorage.setItem('user', id);
    localStorage.setItem('surname', surname);
    localStorage.setItem('name', name);
  }

  public logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('surname');
    localStorage.removeItem('name');
  }

  public isUserLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users', user);
  }

}
