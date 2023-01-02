import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedserviceService } from '../sharedservice.service';

@Injectable({
  providedIn: 'root'
})
export class ImpersonationService {

  baseUrl = environment.baseUrl
  constructor(private _http: HttpClient,
              private service2: SharedserviceService) { }

  getAllHomesByAssigneeId(): Observable<Object>{
    return this._http.get(`${this.baseUrl}/homes1/assigned/` + this.service2.getUserId());
  }
}
