import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Total } from '../models/total.model';

@Injectable({
  providedIn: 'root'
})
export class TotalService {

  readonly totalURL = 'https://mastivityapp.azurewebsites.net/api/total/';

  constructor(
    private http: HttpClient
  ) { }

  getTotals(): Observable<Total>{
    return this.http.get<Total>(this.totalURL)
  }
}
