import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private service: AuthService,
              private router: Router,
              private userAuthService: UserAuthService,
              private toastr: ToastrService){ }

  canActivate() {
    if(this.userAuthService.isLoggedIn()){
      return true;
    }
    this.toastr.error('You have not Logged in','Message',{
      timeOut: 2000
    })
    this.router.navigate(['login'])
    return false;
  } 
}
