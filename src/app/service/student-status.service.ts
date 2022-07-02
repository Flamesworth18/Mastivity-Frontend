import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentStatus } from '../models/student-status.model';

@Injectable({
  providedIn: 'root'
})
export class StudentStatusService {


  readonly student_statusURL = 'https://mastivityapp.azurewebsites.net/api/studentstatus';

  constructor(private http: HttpClient) { }
  
  //get all student statuses
  getAllStudentStatuses(): Observable<StudentStatus[]>{
    return this.http.get<StudentStatus[]>(this.student_statusURL);
  }
}
