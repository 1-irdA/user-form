import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  public getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:3000/users');
  }

  public create(user: User): Observable<User> {
    return this.httpClient.post<User>('http://localhost:3000/users', user);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(`http://localhost:3000/users/${id}`);
  }

  public get(id: number): Observable<User> {
    return this.httpClient.get<User>(`http://localhost:3000/users/${id}`);
  }

  public patch(id: number, user: User): Observable<User> {
    return this.httpClient.patch<User>(`http://localhost:3000/users/${id}`, user);
  }
}
