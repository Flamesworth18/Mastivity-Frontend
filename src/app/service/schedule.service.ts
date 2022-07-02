import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Schedule } from '../models/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private readonly scheduleURL = 'https://mastivityapp.azurewebsites.net/api/schedule';

  constructor(private http: HttpClient) { }

  //Get all schedule
  getAllSchedules(): Observable<Schedule[]>{
    return this.http.get<Schedule[]>(this.scheduleURL);
  }

  //Add schedule
  addSchedule(schedule: Schedule): Observable<Schedule>{
    schedule.id = '00000000-0000-0000-0000-000000000000';
    var now = new Date();
    schedule.dateCreated = now.toDateString();
    schedule.dateUpdated = now.toDateString();
    return this.http.post<Schedule>(this.scheduleURL, schedule);
  }

  //Remove schedule
  removeSchedule(id: string): Observable<Schedule>{
    return this.http.delete<Schedule>(this.scheduleURL + "/" + id);
  }

  //Edit schedule
  updateSchedule(note: Schedule): Observable<Schedule>{
    var now = new Date();
    note.dateUpdated = now.toDateString();
    return this.http.put<Schedule>(this.scheduleURL + "/" + note.id, note);
  }

}
