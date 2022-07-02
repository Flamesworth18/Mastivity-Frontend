import { ToDo } from './../models/todo.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  now = new Date();

  constructor(private http: HttpClient) { }

  readonly todosURL = 'https://mastivityapp.azurewebsites.net/api/todos';

  //Get all todos
  getAllTodos(): Observable<ToDo[]>{
    return this.http.get<ToDo[]>(this.todosURL);
  }

  //Add todo
  addToDo(todo: ToDo): Observable<ToDo>{
    todo.id = '00000000-0000-0000-0000-000000000000';
    var now = new Date();
    todo.dateCreated = now.toDateString();
    todo.dateUpdated = now.toDateString();
    for(let i = 0; i < todo.tasks.length; i++){
      todo.tasks[i].id = '00000000-0000-0000-0000-000000000000';
      todo.tasks[i].dateCreated = now.toDateString();
      todo.tasks[i].dateUpdated = now.toDateString();

      if(todo.tasks[i].isCompleted){
        todo.tasks[i].status = "Completed";
      }else{
        todo.tasks[i].status = "In Progress";
      }
    }
    return this.http.post<ToDo>(this.todosURL, todo);
  }

  //Remove todo
  removeTodo(id: string): Observable<ToDo>{
    return this.http.delete<ToDo>(this.todosURL + "/" + id);
  }

  //Edit todo
  updateToDo(todo: ToDo): Observable<ToDo>{
    var now = new Date();
    todo.dateUpdated = now.toDateString();
    for(let i = 0; i < todo.tasks.length; i++){
      if(todo.tasks[i].id === ''){
        todo.tasks[i].id = '00000000-0000-0000-0000-000000000000';
      }
    }
    return this.http.put<ToDo>(this.todosURL + "/" + todo.id, todo);
  }
}
