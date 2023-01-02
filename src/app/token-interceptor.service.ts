import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedserviceService } from './sharedservice.service';
import { Router } from '@angular/router';
import { UserAuthService } from './authfiles/user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private service2: SharedserviceService,
              private router: Router,
              private userAuthService: UserAuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.service2.globalToken;
    let token2 = this.userAuthService.getToken();
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }
    let jwtToken = req.clone({
      setHeaders: {
        Authorization : `Bearer `+token2
      }
    })
    return next.handle(jwtToken);
  }
}
