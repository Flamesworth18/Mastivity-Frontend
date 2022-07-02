import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root'
})
export class TodoStatusService {

  constructor(private http: HttpClient) { }

  readonly statusURL = "https://mastivityapp.azurewebsites.net/api/todostatus"

  //Get all statuses
  getAllStatus(): Observable<Status[]>{
    return this.http.get<Status[]>(this.statusURL);
  }
}
