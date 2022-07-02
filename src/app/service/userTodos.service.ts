import { BehaviorSubject, Observable } from 'rxjs';
import { ToDo } from '../models/todo.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodosDataService {

  constructor() { }

  private addEdit:boolean = false;
  private todosIsEmpty:boolean = true;
  private todo: ToDo = {
    id: '',
    title: '',
    author: '',
    tasks: [
      {
        id: '',
        title: '',
        author: '',
        isCompleted: false,
        status: '',
        dateCreated: '',
        dateUpdated: '',
      }
    ],
    taskCompleted: 0,
    dueDate: new Date(),
    statusId: 0,
    isArchived: false,
    dateCreated: '',
    dateUpdated: '',
  };

  private addEditSource = new BehaviorSubject(this.addEdit);
  getAddEditSource = this.addEditSource.asObservable();

  private todoIsEmptySource = new BehaviorSubject(this.todosIsEmpty);
  getTodoIsEmptySource = this.todoIsEmptySource.asObservable();

  private todosSource = new BehaviorSubject(this.todo);
  getTodosSource = this.todosSource.asObservable();

  createTodo(value: boolean){
    this.addEditSource.next(value);
  }

  isEmpty(value: boolean){
    this.todoIsEmptySource.next(value);
  }

  setTodo(value: ToDo){
    this.todosSource.next(value);
  }

  activateMethods(): Observable<any>{
    return this.addEditSource.asObservable();
  }
}
