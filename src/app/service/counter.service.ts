import { Counter } from '../models/counter.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  private readonly counterURL = 'https://mastivityapp.azurewebsites.net/api/counter/';

  constructor(private http: HttpClient) { }

  //get all visitor counter
  getAllCounter(): Observable<Counter[]>{
    return this.http.get<Counter[]>(this.counterURL);
  }

  //update visitor counter
  updateCounter(counter: Counter): Observable<Counter>{
    return this.http.put<Counter>(this.counterURL + counter.id, counter);
  }

  private _userCounted = new BehaviorSubject<boolean>(false);
  userCounted = this._userCounted.asObservable();

  setUserCounted(){
    this._userCounted.next(true);
  }

  setUserNotCounted(){
    this._userCounted.next(false);
  }
  
}
