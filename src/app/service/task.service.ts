import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  readonly taskURL = "https://mastivityapp.azurewebsites.net/api/task";

  //Get all tasks
  getAllTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.taskURL);
  }

  //Add task
  addTask(task: Task): Observable<Task>{
    task.id = '00000000-0000-0000-0000-000000000000';
    var now = new Date();
    task.dateCreated = now.toDateString();
    task.dateUpdated = now.toDateString();
    return this.http.post<Task>(this.taskURL, task);
  }

  //Edit task
  updateNote(task: Task): Observable<Task>{
    var now = new Date();
    task.dateUpdated = now.toDateString();
    return this.http.put<Task>(this.taskURL + "/" + task.id, task);
  }

  //Remove task
  removeTask(id: string): Observable<Task>{
    return this.http.delete<Task>(this.taskURL + '/' + id);
  }
}
