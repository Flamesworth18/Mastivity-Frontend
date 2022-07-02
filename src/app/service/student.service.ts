import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  readonly studentURL = 'https://mastivityapp.azurewebsites.net/api/student';

  //Get all students
  getAllStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(this.studentURL);
  }

  //Add student
  addStudent(student: Student): Observable<Student>{
    student.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Student>(this.studentURL, student);
  }

  //Remove student
  removeStudent(id: string): Observable<Student>{
    return this.http.delete<Student>(this.studentURL + "/" + id);
  }

  //Edit student
  updateStudent(student: Student): Observable<Student>{
    return this.http.put<Student>(this.studentURL + "/" + student.id, student);
  }
}
