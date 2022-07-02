import { Observable } from 'rxjs';
import { SubStudent } from './../models/subStudent.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectStudentService {

  private readonly subjectStudentURL = "https://mastivityapp.azurewebsites.net/api/UserSubStudent/";

  constructor(
    private http: HttpClient
  ) { }

  //update subject students
  updateSubjectStudents(student: SubStudent) : Observable<SubStudent>{
    return this.http.put<SubStudent>(this.subjectStudentURL + student.id, student)
  }
}
