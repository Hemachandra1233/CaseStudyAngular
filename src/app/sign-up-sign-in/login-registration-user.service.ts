import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  requestHeader = new HttpHeaders({
    "No-Auth": "True"
  });
  private baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient,
    private router: ActivatedRoute) { }
  
  loginUser(user: User): Observable<object>{

    console.log(user);
    return this._http.post(`${this.baseUrl}/login1`,user,{headers: this.requestHeader});
  }

  registerUser(user: User): Observable<object> {
    return this._http.post(`${this.baseUrl}/register`,user, {headers: this.requestHeader}).pipe(
      catchError(this.handleError)
    );
  }

  // loginUser1(): Observable<object>{

  //   // console.log(user);
  //   return this._http.get(`http://localhost:1919/api/v1/login2`);
  // }
  getAllHomesByUserId(id: number) {
    return this._http.get(`${this.baseUrl}/homes1/`+id)
  }

  private handleError(error: HttpErrorResponse) {
    let errormessage = ''
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
        errormessage = error.error.message;
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(errormessage));
  }
}
