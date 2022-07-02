import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ToDo } from 'src/app/models/todo.model';
import { Status } from 'src/app/models/status.model';
import { UserService } from 'src/app/service/user.service';
import { TodosDataService } from 'src/app/service/userTodos.service';
import { TodoStatusService } from 'src/app/service/todo-status.service';
import { LoaderService } from 'src/app/service/loader.service';
import { AuthService } from 'src/app/service/auth.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

  datePipe: DatePipe = new DatePipe('en-US');

  todos: ToDo[] = [];
  todo: ToDo = {
    id: '',
    title: 'Things to do...',
    author: '',
    tasks: [
      {
        id: '',
        title: 'Untitled task',
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

  taskCount:number = 0;

  todoIsEmpty:boolean = true;
  todosCount:number = 0;
  activeTodo:string = '';
  activeTask:string = '';
  addEdit:boolean = false;
  addEditService:boolean = false;

  statuses$!: Observable<Status[]>;
  statuses: Status[] = [];
  statusMap: Map<number, string> = new Map();

  constructor(
    private userService: UserService,
    private auth: AuthService,
    public todosDataService: TodosDataService,
    private statusService: TodoStatusService,
    private toastr: ToastrService,
    public loader: LoaderService) {

      var isEmpty = sessionStorage.getItem("todoIsEmpty");
      if(isEmpty != null){
        this.todosDataService.isEmpty(JSON.parse(isEmpty));
      }

      let canAddEdit = JSON.parse(sessionStorage.getItem("addTodo") || 'false');
      if(canAddEdit){
        this.addEdit = true;
      } 

      this.todosDataService.getAddEditSource.subscribe(addEditService => this.addEditService = addEditService);
      this.todosDataService.getTodoIsEmptySource.subscribe(todoIsEmpty => this.todoIsEmpty = todoIsEmpty);
      this.todosDataService.getTodosSource.subscribe(todo => this.todo = todo);

      this.todosDataService.activateMethods().subscribe(() => {
        this.resetForm();
        this.showTodoIcons(this.todo.id);
      });

   }

  ngOnInit(): void {
    this.statuses$ = this.statusService.getAllStatus();
    this.refreshStatuses();
    this.getAllTodo(this.todo);
  }

  ngOnDestroy(): void{
    this.todosDataService.createTodo(false);
    sessionStorage.setItem("addTodo", 'false');

    if(this.todosCount === 0){
      this.todosDataService.isEmpty(true);
    }else{
      this.todosDataService.isEmpty(false);
    }
    
  }

  refreshStatuses(){
    this.statusService.getAllStatus().subscribe(
      response => {
        this.statuses = response;

        for(let i = 0; i < this.statuses.length; i++){
          this.statusMap.set(this.statuses[i].id, this.statuses[i].statusName);
        }

      }
    );
  }

  //#region TODO
  resetForm(){
    if(this.addEditService || this.addEdit){
      this.todo = {
        id: '',
        title: 'Things to do...',
        author: '',
        tasks: [
          {
            id: '',
            title: 'Untitled task',
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
    }
  }

  populateTodoForm(todo: ToDo){
    this.todo = todo;
  }

  showTodoIcons(id: string){
    this.activeTodo = id;
  }

  focusTask(id: string){
    this.activeTask = id;
  }

  onTodoSubmit(){
    if(this.todo.id === ''){
      this.addTodo();
    }else{
      this.updateTodo(this.todo);
    }
  }

  getAllTodo(todo: ToDo){
    this.userService.getAllTodos(this.auth.user.id)
    .subscribe(
      response => {
        this.todos = response;
        this.todosCount = this.todos.length;

        if(this.todosCount === 0){
          this.todosDataService.isEmpty(true);
        }else{
          this.todosDataService.isEmpty(false);
          this.todosDataService.createTodo(false);

          if(this.todo.id === "" && !this.addEdit){
            this.populateTodoForm(this.todos[0]);
            this.showTodoIcons(this.todos[0].id);
          }else{
            this.populateTodoForm(todo);
            this.showTodoIcons(todo.id);
          }

          for(let i = 0; i < this.todo.tasks.length; i++){
            if(this.todo.tasks[i].isCompleted){
              if(this.todo.taskCompleted < this.todo.tasks.length){
                this.todo.taskCompleted++;
              }
            }
          }
  
          if(this.todo.taskCompleted === this.todo.tasks.length){
            this.todo.statusId = 1;
          }else{
            this.todo.statusId = 2;
          }
        }

        sessionStorage.setItem('addTodo', 'false');
        sessionStorage.setItem("todoIsEmpty", JSON.stringify(this.todoIsEmpty));
      }
    );
  }

  addTodo(){
    this.todo.taskCompleted = 0;
    for(let i = 0; i < this.todo.tasks.length; i++){
      if(this.todo.tasks[i].isCompleted){
        if(this.todo.taskCompleted < this.todo.tasks.length){
          this.todo.taskCompleted++;
        }
      }
    }

    if(this.todo.taskCompleted === this.todo.tasks.length){
      this.todo.statusId = 1;
    }else{
      this.todo.statusId = 2;
    }

    this.todo.author = this.auth.user.firstname;
    var date = this.getFormattedDate();
    if(date != null){
      this.todo.dateCreated = date;
      this.todo.dateUpdated = date;
    }
    
    this.userService.addTodo(this.auth.user.id, this.todo)
    .subscribe(
      response => {
        this.todo = response;
        this.getAllTodo(response);

        this.toastr.success('Saved Successfully', response.title);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateTodo(todo: ToDo){

    var date = this.getFormattedDate();
    if(date != null){
      todo.dateUpdated = date;
    }

    todo.taskCompleted = 0;
    for(let i = 0; i < todo.tasks.length; i++){
      if(todo.tasks[i].isCompleted){
        if(todo.taskCompleted < todo.tasks.length){
          todo.taskCompleted++;
        }
      }
    }

    if(todo.taskCompleted === todo.tasks.length){
      todo.statusId = 1;
    }else{
      todo.statusId = 2;
    }
    
    this.userService.updateTodo(this.auth.user.id, todo)
    .subscribe(
      response => {
        this.todo = response;
        this.getAllTodo(response);

        this.toastr.success('Updated Successfully', 'To Do' );
      }
    );
  }

  onRemoveTodo(id: string){
    this.userService.removeTodo(this.auth.user.id, this.todo)
    .subscribe(
      response => {
        
        if(this.todos.length !== 0){
          this.todo = this.todos[0];
        }
      
        
        this.getAllTodo(response);
        this.todo = {
          id: '',
          title: 'Things to do...',
          author: '',
          tasks: [
            {
              id: '',
              title: 'Untitled task',
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

        this.toastr.success('Removed Successfully', response.title );
      }
    );
  }

  confirmationDialog(id: string){
    Swal.fire({
      title: "Are you sure you want to remove?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if(result.value){
        this.onRemoveTodo(id);
      }
    })
  }

  addTask(){
    this.taskCount++;
    this.todo.tasks.push({
      id: JSON.stringify(this.taskCount),
      author: this.auth.user.firstname,
      title: 'Untitled task',
      isCompleted: false,
      status: 'In Progress',
      dateCreated: Date.UTC.toString(),
      dateUpdated: Date.UTC.toString(),
    });
  }

  onRemoveTask(id: string){

    this.todo.tasks.forEach((task, index) => {
      if(task.id === id && this.todo.tasks.length > 1){
        this.todo.tasks.splice(index, 1);
      }
    });

  }

//#endregion

  getFormattedDate(){
      
    var date = new Date();
    var transformDate = this.datePipe.transform(date, 'EEEE, MMMM d, y');
    return transformDate;

  }

}
