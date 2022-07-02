import { TodoPopupComponent } from '../pop-ups/todo-popup/todo-popup.component';
import { LoaderService } from '../../service/loader.service';
import { ToastrService } from 'ngx-toastr';
import { TodosService } from '../../service/todos.service';
import { MatDialog } from '@angular/material/dialog';
import { ToDo } from 'src/app/models/todo.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-crud-todos',
  templateUrl: './admin-crud-todos.component.html',
  styleUrls: ['./admin-crud-todos.component.scss']
})
export class AdminCrudTodosComponent implements OnInit {

  @ViewChild('addTodo', { static: false }) public addTodoRef !: ElementRef;

  todos: ToDo[] = [];
  emptyTodo: ToDo = {
    id: '00000000-0000-0000-0000-000000000000',
    title: '',
    author: '',
    tasks: [{
      id: '00000000-0000-0000-0000-000000000000',
      title: '',
      author: '',
      isCompleted: false,
      status: '',
      dateCreated: '',
      dateUpdated: '',
    }],
    taskCompleted: 0,
    dueDate: new Date(),
    statusId: 0,
    isArchived: false,
    dateCreated: '',
    dateUpdated: '',
  };
  todosCount: number = 0;
  searchTodo: any;

  mode: any;

  constructor(
    private dialogRef: MatDialog,
    private todoService: TodosService,
    private toastr: ToastrService,
    public loader: LoaderService
  ) { 

  }

  ngOnInit(): void {
    this.getAllTodos();
  }

  openAddTodoDialog(){
    var modal = this.dialogRef.open(TodoPopupComponent, {
      data: {
        buttonPosition: this.addTodoRef,
        todo: this.emptyTodo,
        add: true
    }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
        this.emptyTodo = {
          id: '00000000-0000-0000-0000-000000000000',
          title: '',
          author: '',
          tasks: [{
            id: '00000000-0000-0000-0000-000000000000',
            title: '',
            author: '',
            isCompleted: false,
            status: '',
            dateCreated: '',
            dateUpdated: '',
          }],
          taskCompleted: 0,
          dueDate: new Date(),
          statusId: 0,
          isArchived: false,
          dateCreated: '',
          dateUpdated: '',
        };
      }else{
        this.addTodo(res.data)
      }
    })
  }

  openUpdateTodoDialog(todo: ToDo){
    var modal = this.dialogRef.open(TodoPopupComponent, {
      data: {
        buttonPosition: this.addTodoRef,
        todo: todo,
        add: false
      }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
      }else{
        this.updateTodo(res.data);
      }
    })
  }

  getAllTodos(){
    this.todoService.getAllTodos()
    .subscribe(
      response => {
        console.log(response)
        this.todos = response;
        this.todosCount = response.length;
      }
    )
  }

  addTodo(todo: ToDo){
    this.todoService.addToDo(todo)
    .subscribe(
      response => {
        this.toastr.success('Added successfully', response.title);
        this.getAllTodos();
      }
    )
  }

  updateTodo(todo: ToDo){
    this.todoService.updateToDo(todo)
    .subscribe(
      response => {
        this.toastr.success('Updated successfully', response.title);
        this.getAllTodos();
      }
    )
  }

  removeTodo(id: string){
    this.todoService.removeTodo(id)
    .subscribe(
      response => {
        this.toastr.success('Removed successfully', response.title);
        this.getAllTodos()
      }
    )
  }
}
