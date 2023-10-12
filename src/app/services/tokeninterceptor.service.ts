import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor{

  constructor(private localserv: LocalstorageService) { }

  token = this.localserv.get('token');

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let tokenheadfer = req.clone({
      setHeaders: {
        Authorization: 'bearer ' + this.token
      }
    });
    return next.handle(tokenheadfer);
  }

}
