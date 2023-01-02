import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Home } from '../home';
import { SharedserviceService } from '../sharedservice.service';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  private baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient,
              private service2: SharedserviceService) { }

  createhomeByUserId(home: Home): Observable<object>{
    console.log(home);
    return this._http.post(`${this.baseUrl}/createhome/`, home).pipe(
      catchError(this.handleError)
    );
  }
  getExpensesByHomeId(id: number): Observable<object> {
    return this._http.get(`${this.baseUrl}/expenses/`+id);
  }

  getAllHomesByUserId() {
    return this._http.get(`${this.baseUrl}/homes12/`)
  }

  checkAssignedByHomeIdAndAssigneeId(id1: number, id2: number){
    return this._http.get(`${this.baseUrl}/userHomes/`+id1+`/`+id2)
  }

  getListOfExpenseTo():Observable<object>{
    return this._http.get(`${this.baseUrl}/expenseTo/`+this.service2.getGlobalHomeId());
  }

  getHomeAssignedToDetails(id: any): Observable<object> {
    return this._http.get(`${this.baseUrl}/assignedTo/`+id);
  }
  updateHome(home: Home): Observable<Object> {
    return this._http.put(`${this.baseUrl}/updateHome/`+this.service2.getGlobalHomeId(), home);
  }
  deleteHomebyHomeId(id: number): Observable<Object> {
    return this._http.delete(`${this.baseUrl}/delete/`+id);
  }

  deleteExpenseByTransactionId(id: number): Observable<object> {
    return this._http.delete(`${this.baseUrl}/deleteexpense/${this.service2.getGlobalHomeId()}/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    let errormessage = ''
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      // console.error(
      //   `Backend returned code ${error.status}, body was: `, error.error);
        errormessage = error.error.message
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(errormessage));
  }

  // deleteHomeByHomeId(id: number): Observable<String>{
  //   this._http.delete(`${this.baseUrl}/delete/`+id);
  // }
}
