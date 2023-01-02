import { Injectable } from '@angular/core';
import { SharedserviceService } from '../sharedservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;
  constructor(private service2: SharedserviceService) { }
  isLoggedIn(){
    this.token = this.service2.globalToken;
    if(this.token !== null){
      return true;
    }
    else{
      return false;
    }
    // return !!this.token;
  }
}
