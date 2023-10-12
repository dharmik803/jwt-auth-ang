import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin, Token } from '../models/UserCred.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserCredService {

  constructor(private http: HttpClient) { }

  login(user: UserLogin): Observable<Token>{
    return this.http.post<Token>('https://localhost:7239/api/User/Authenticate', user);
  }
}
