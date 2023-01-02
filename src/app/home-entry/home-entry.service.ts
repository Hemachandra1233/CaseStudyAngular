import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RoleAssignRequest } from '../role-assign-request';
import { SharedserviceService } from '../sharedservice.service';

@Injectable({
  providedIn: 'root'
})
export class HomeEntryService {

  private baseUrl = environment.baseUrl;

  constructor(private _http: HttpClient,
    private service2: SharedserviceService) { }

    assignUserWithRole(roleReq : RoleAssignRequest): Observable<Object>{
      return this._http.post(`${this.baseUrl}/assigning/`+this.service2.getGlobalHomeId(),roleReq).pipe(
        catchError(this.handleError)
      )
    }

    updateUserRole(roleReq : RoleAssignRequest): Observable<Object> {
      return this._http.put(`${this.baseUrl}/roleupdate/`+this.service2.getGlobalHomeId(),roleReq)
    }

    getAllRoles(): Observable<Object> {
      return this._http.get(`${this.baseUrl}/roles`);
    }

    getRoleByUserId(): Observable<Object> {
      return this._http.get(`${this.baseUrl}/assignedTo2/`);
    }

    deleteAssignedUser(assigneeId: number): Observable<Object> {
      return this._http.delete(`${this.baseUrl}/deleteAssignee/`+this.service2.getGlobalHomeId()+'/'+assigneeId)
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
}
