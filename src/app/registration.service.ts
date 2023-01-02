import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http : HttpClient) { }

  public LoginUserFromRemote(user : User): Observable<any>{
    return this._http.post(`http://localhost:1919/api/v1/login`,user);
  }
}
