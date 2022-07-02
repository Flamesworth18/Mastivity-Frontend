import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Day } from '../models/day.model';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  private readonly dayURL = 'https://mastivityapp.azurewebsites.net/api/day/';

  constructor(
    private http: HttpClient
  ) { }

  //get all days
  getAllDays(): Observable<Day[]>{
    return this.http.get<Day[]>(this.dayURL);
  }

  //add day
  addDay(day: Day): Observable<Day>{
    day.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Day>(this.dayURL, day);
  }

  //update day
  updateDay(day: Day): Observable<Day>{
    return this.http.put<Day>(this.dayURL + day.id, day);
  }

  //remove day
  removeProgram(id: string): Observable<Day>{
    return this.http.delete<Day>(this.dayURL + '/' + id);
  }
}
