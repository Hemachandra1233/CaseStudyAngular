import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../category';
import { SharedserviceService } from '../sharedservice.service';
import { Transaction } from '../transaction';

@Injectable({
  providedIn: 'root'
})
export class ExpenseEntryService {

  private baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient,
              private service2: SharedserviceService) { }

  expenseEntry(transaction: Transaction): Observable<object>{
    console.log("Global Home id is",this.service2.getGlobalHomeId());
    return this._http.post(`${this.baseUrl}/expenses1/add/`+ this.service2.getGlobalHomeId(),transaction);
  }

  getAllCategories(): Observable<object> {
    return this._http.get(`${this.baseUrl}/categories/`);
  }

  getAllSpendTypes(): Observable<object> {
    return this._http.get(`${this.baseUrl}/spendtypes`);
  }

  getAllTransactionTypes(): Observable<object> {
    return this._http.get(`${this.baseUrl}/transactiontypes`)
  }
  updateExpense(id: number, transaction: Transaction): Observable<object> {
    return this._http.put(`${this.baseUrl}/expenses2/`+id+`/`+this.service2.getGlobalHomeId(),transaction)
  }
  getExpenseById(id: number): Observable<object> {
    return this._http.get(`${this.baseUrl}/expenses/transactionId/`+id);
  }

  createCategoryByUserId(category: Category ): Observable<object> {
    return this._http.post(`${this.baseUrl}/createCategory/`, category);
  }

  getAllExpenseTo(){
    
  }


   // define function to upload files
  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this._http.post<string[]>(`${this.baseUrl}/upload/`+ this.service2.getFileTransactionId(), formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

   // define function to download files
   download(filename: string): Observable<HttpEvent<Blob>> {
    return this._http.get(`${this.baseUrl}/download/${filename}/`+ this.service2.getFileTransactionId(), {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }
  // download(filename: string): Observable<any>{
  //   return this._http.get(`${this.baseUrl}/download/${filename}/`+ this.service2.getFileTransactionId());
  // }
  getFileNames(id: number): Observable<object> {
    return this._http.get(`${this.baseUrl}/filenames/${id}`);
  }
}
