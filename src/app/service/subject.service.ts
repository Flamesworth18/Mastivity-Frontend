import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from '../models/subject.model';
import { Day } from '../models/day.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  readonly subjectURL = 'https://mastivityapp.azurewebsites.net/api/subject';

  constructor(private http: HttpClient) { }

  //get all subjects
  getAllSubjects(): Observable<Subject[]>{
    return this.http.get<Subject[]>(this.subjectURL)
  }

  //Add subject
  addSubject(subject: Subject): Observable<Subject>{
    subject.id = '00000000-0000-0000-0000-000000000000';
    for(let i = 0; i < subject.students.length; i++){
      if(subject.students[i].id === ''){
        subject.students[i].id = '00000000-0000-0000-0000-000000000000';
      }
    }
    for(let i = 0; i < subject.days.length; i++){
      if(subject.days[i].id === ''){
        subject.days[i].id = '00000000-0000-0000-0000-000000000000';
      }
    }
    return this.http.post<Subject>(this.subjectURL, subject);
  }

  //update subject
  updateSubject(subject: Subject): Observable<Subject>{
    for(let i = 0; i < subject.students.length; i++){
      if(subject.students[i].id === ''){
        subject.students[i].id = '00000000-0000-0000-0000-000000000000';
      }
    }
    for(let i = 0; i < subject.days.length; i++){
      if(subject.days[i].id === ''){
        subject.days[i].id = '00000000-0000-0000-0000-000000000000';
      }
    }
    return this.http.put<Subject>(this.subjectURL + "/" + subject.id, subject);
  }

  //remove subject
  removeSubject(id: string): Observable<Subject>{
    return this.http.delete<Subject>(this.subjectURL + '/' + id);
  }

  

  //add subject day
  addDay(id: string, day: Day): Observable<Day>{
    if(id === ''){
      id = '00000000-0000-0000-0000-000000000000';
    }
    if(day.id === ''){
      day.id = '00000000-0000-0000-0000-000000000000';
    }
    return this.http.post<Day>(this.subjectURL + "/" + id + '/' + 'Days', day);
  }

  //remove subject day
  removeDay(id: string, dayAbbreviation: string): Observable<Day>{
    return this.http.delete<Day>(this.subjectURL + '/' + id + '/' + 'Days' + '/' + dayAbbreviation);
  }
}
