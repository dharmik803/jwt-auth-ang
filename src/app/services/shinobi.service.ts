import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { Shinobi } from '../models/shinobi.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShinobiService {

  token!: string;
  constructor(private http: HttpClient,
              private localservice: LocalstorageService  
  ) {}

  // getShinobi(): Observable<Shinobi>{
  //   let token = this.localservice.get('token');
  //   let head_obj = new HttpHeaders().set('Authorization', `bearer ${token}`);
  //   return this.http.get<Shinobi>('https://localhost:7239/api/Shinobis', {headers: head_obj});
  // }

  GetShinobi(): Observable<Shinobi[]>{
    return this.http.get<Shinobi[]>('https://localhost:7239/api/Shinobis');
  }

  PostShinobi(shinobi: Shinobi): Observable<Shinobi> {
    return this.http.post<Shinobi>('https://localhost:7239/api/Shinobis', shinobi);
  }

  UpdateShinobi(shinobi: Shinobi): Observable<Shinobi> {
    return this.http.put<Shinobi>(`https://localhost:7239/api/Shinobis/${shinobi.id}`, shinobi);
  }

  DeleteShinobi(id: number): Observable<Shinobi>{
    return this.http.delete<Shinobi>(`https://localhost:7239/api/Shinobis/${id}`);
  }

}
