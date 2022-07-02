import { Schedule } from './../models/schedule.model';
import { UserSubject } from './../models/userSubject.model';
import { SubUser } from './../models/subUser.model';
import { UserProgram } from '../models/userProgram.model';
import { Program } from './../models/program.model';
import { ToDo } from './../models/todo.model';
import { User } from './../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { Subject } from '../models/subject.model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  datePipe: DatePipe = new DatePipe('en-US');

  constructor(private http: HttpClient) { }

  readonly userURL = "https://mastivityapp.azurewebsites.net/api/user";

  //#region USERS

  //get all users
  getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.userURL);
  }

  //add user
  addUser(user: SubUser): Observable<User>{
    user.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<User>(this.userURL + '/' + 'Add-User', user);
  }

  //add user
  addRequestUsers(users: SubUser[]){
    for(let i = 0; i < users.length; i++){
      users[i].id = '00000000-0000-0000-0000-000000000000';
    }
    return this.http.post(this.userURL + '/' + 'Request-Users', users);
  }
  
  //edit user
  updateUser(user: User): Observable<User>{
    return this.http.put<User>(this.userURL + '/' + user.id, user);
  }

  //remove user
  removeUser(id: string): Observable<User>{
    return this.http.delete<User>(this.userURL + '/' + id);
  }

  //#endregion

  //#region NOTES

  //get all users notes
  getAllNotes(id: string): Observable<Note[]>{
    if(id === ''){
      id = '00000000-0000-0000-0000-000000000000';
    }
    return this.http.get<Note[]>(this.userURL + '/' + id + '/' + 'Notes');
  }

  //add user note
  addNote(id: string, name: string, note: Note): Observable<Note>{
    note.id = '00000000-0000-0000-0000-000000000000';
    note.author = name;
    var now = new Date();
    note.dateCreated = now.toDateString();
    note.dateUpdated = now.toDateString();
    return this.http.post<Note>(this.userURL + '/' + id + '/' + 'Notes', note);
  }

  //update user note
  updateNote(id: string, note: Note): Observable<Note>{
    var now = new Date();
    note.dateUpdated = now.toDateString();
    return this.http.put<Note>(this.userURL + '/' + id + '/' + 'Notes' + '/' + note.id, note);
  }

  //remove user note
  removeNote(id: string, note: Note): Observable<Note>{
    return this.http.delete<Note>(this.userURL + '/' + id + '/' + 'Notes' + '/' + note.id);
  }
  
  //#endregion

  //#region TODOS

  //get all users todos
  getAllTodos(id: string): Observable<ToDo[]>{
    return this.http.get<ToDo[]>(this.userURL + '/' + id + '/' + 'ToDos');
  }

  //add user todo
  addTodo(id: string, todo: ToDo): Observable<ToDo>{
    todo.id = '00000000-0000-0000-0000-000000000000';

    for(let i = 0; i < todo.tasks.length; i++){
      todo.tasks[i].id = '00000000-0000-0000-0000-000000000000';
    }

    return this.http.post<ToDo>(this.userURL + '/' + id + '/' + 'Todos', todo);
  }

  //update user todo
  updateTodo(id: string, todo: ToDo): Observable<ToDo>{
    return this.http.put<ToDo>(this.userURL + '/' + id + '/' + 'Todos' + '/' + todo.id, todo);
  }

  //remove user todo
  removeTodo(id: string, todo: ToDo): Observable<ToDo>{
    return this.http.delete<ToDo>(this.userURL + '/' + id + '/' + 'Todos' + '/' + todo.id);
  }
  
  //#endregion

  //#region PROGRAMS

  //get all users programs
  getAllPrograms(id: string): Observable<Program[]>{
    if(id === ''){
      id = '00000000-0000-0000-0000-000000000000';
    }
    return this.http.get<Program[]>(this.userURL + '/' + id + '/' + 'Programs');
  }

  //add user program
  addProgram(id: string, subProgram: UserProgram): Observable<UserProgram>{
    if(id === ''){
      id = '00000000-0000-0000-0000-000000000000';
    }
    if(subProgram.id === ''){
      subProgram.id = '00000000-0000-0000-0000-000000000000';
    }
    return this.http.post<UserProgram>(this.userURL + '/' + id + '/' + 'Programs', subProgram);
  }

  //update user program
  updateProgram(id: string, programId: string, program: UserProgram): Observable<UserProgram>{
    return this.http.put<UserProgram>(this.userURL + '/' + id + '/' + 'Programs' + '/' + programId, program);
  }

  //remove user program
  removeProgram(id: string, programId: string): Observable<UserProgram>{
    return this.http.delete<UserProgram>(this.userURL + '/' + id + '/' + 'Programs' + '/' + programId);
  }

  //#endregion

  //#region SUBJECTS

  //get all user subjects
  getAllSubjects(id: string): Observable<UserSubject[]>{
    if(id === ''){
      id = '00000000-0000-0000-0000-000000000000';
    }
    return this.http.get<UserSubject[]>(this.userURL + '/' + id + '/' + 'Subjects');
  }

  //add user subject
  addSubject(id: string, subSubject: UserSubject): Observable<UserSubject>{
    if(id === ''){
      id = '00000000-0000-0000-0000-000000000000';
    }
    if(subSubject.id === ''){
      subSubject.id = '00000000-0000-0000-0000-000000000000';
    }
    for(let i = 0; i < subSubject.students.length; i++){
      subSubject.students[i].id = '00000000-0000-0000-0000-000000000000';
      subSubject.students[i].status = 'NG';
      subSubject.students[i].remarks = 'Write remarks...';
    }
    
    return this.http.post<UserSubject>(this.userURL + '/' + id + '/' + 'Subjects', subSubject);
  }

  //update user subject
  updateSubject(id: string, subjectId: string, subject: UserSubject): Observable<UserSubject>{
    return this.http.put<UserSubject>(this.userURL + '/' + id + '/' + 'Subjects' + '/' + subjectId, subject);
  }

  //remove user subject
  removeSubject(id: string, subjectId: string): Observable<UserSubject>{
    return this.http.delete<UserSubject>(this.userURL + '/' + id + '/' + 'Subjects' + '/' + subjectId);
  }
  //#endregion

  //#region SCHEDULES

  //get all users schedules
  getAllSchedules(id: string): Observable<Schedule[]>{
    if(id === ''){
      id = '00000000-0000-0000-0000-000000000000';
    }
    return this.http.get<Schedule[]>(this.userURL + '/' + id + '/' + 'Schedules');
  }

  //add user schedule
  addSchedule(id: string, schedule: Schedule): Observable<Schedule>{
    schedule.id = '00000000-0000-0000-0000-000000000000';

    var date = this.getFormattedDate();
    if(date != null){
      schedule.dateCreated = date;
      schedule.dateUpdated = date;
    }
    return this.http.post<Schedule>(this.userURL + '/' + id + '/' + 'Schedules', schedule);
  }

  //update user schedule
  updateSchedule(id: string, schedule: Schedule): Observable<Schedule>{
    return this.http.put<Schedule>(this.userURL + '/' + id + '/' + 'Schedules' + '/' + schedule.id, schedule);
  }

  //remove user schedule
  removeSchedule(id: string, schedule: Schedule): Observable<Schedule>{
    return this.http.delete<Schedule>(this.userURL + '/' + id + '/' + 'Schedules' + '/' + schedule.id);
  }
  
  //#endregion

  getFormattedDate(){
    
    var date = new Date();
    var transformDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    return transformDate;

  }
}