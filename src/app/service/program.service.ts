import { Program } from './../models/program.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http: HttpClient) { }

  readonly programURL = 'https://mastivityapp.azurewebsites.net/api/program';

  //get all programs
  getAllPrograms(): Observable<Program[]>{
    return this.http.get<Program[]>(this.programURL);
  }

  //add program
  addProgram(program: Program): Observable<Program>{
    program.id = '00000000-0000-0000-0000-000000000000';
    for(let i = 0; i < program.subjects.length; i++){
      if(program.subjects[i].id === ''){
        program.subjects[i].id = '00000000-0000-0000-0000-000000000000';
      }
    }
    return this.http.post<Program>(this.programURL, program);
  }

  //update program
  updateProgram(program: Program): Observable<Program>{
    for(let i = 0; i < program.subjects.length; i++){
      if(program.subjects[i].id === ''){
        program.subjects[i].id = '00000000-0000-0000-0000-000000000000';
      }
    }
    return this.http.put<Program>(this.programURL + "/" + program.id, program);
  }

  //remove program
  removeProgram(id: string): Observable<Program>{
    return this.http.delete<Program>(this.programURL + '/' + id);
  }
}
