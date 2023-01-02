import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setToken(jwtToken: string) {
    sessionStorage.setItem('jwtToken', jwtToken)
  }
  public getToken(): any {
    return sessionStorage.getItem('jwtToken');
  }

  public isLoggedIn(){
    return !!sessionStorage.getItem('jwtToken');
  }

  public setHomeMessage(data: Boolean){
    sessionStorage.setItem('data',"true");
  }

  public getHomeMessage(){
    return sessionStorage.getItem('data');
  }
}
