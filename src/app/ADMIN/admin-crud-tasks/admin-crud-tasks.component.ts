import { TodoStatusService } from '../../service/todo-status.service';
import { TasksPopupComponent } from '../pop-ups/tasks-popup/tasks-popup.component';
import { TaskService } from '../../service/task.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/service/loader.service';
import { Status } from 'src/app/models/status.model';

@Component({
  selector: 'app-admin-crud-tasks',
  templateUrl: './admin-crud-tasks.component.html',
  styleUrls: ['./admin-crud-tasks.component.scss']
})
export class AdminCrudTasksComponent implements OnInit {

  @ViewChild('taskBtn', { static: false }) public addBtn !: ElementRef;

  tasks: Task[] = [];
  task: Task = {
    id: '',
    title: '',
    author: '',
    isCompleted: false,
    status: '',
    dateCreated: '',
    dateUpdated: '',
  }
  tempTask: Task = {
    id: '00000000-0000-0000-0000-000000000000',
    title: '',
    author: '',
    isCompleted: false,
    status: '',
    dateCreated: '',
    dateUpdated: '',
  }

  statuses: Status[] = [];

  taskCount:number = 0;
  searchTask: any;

  mode: any;

  constructor(
    private dialogRef: MatDialog,
    private taskService: TaskService,
    private toastr: ToastrService,
    public loader: LoaderService,
    private statusService: TodoStatusService) { 

    }

  ngOnInit(): void {
    this.getAllTasks();
    this.getAllStatuses();
  }

  openAddTaskDialog(){
    var modal = this.dialogRef.open(TasksPopupComponent, {
      data: {
        buttonPosition: this.addBtn,
        task: this.tempTask,
        statuses: this.statuses,
        add: true
      }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
        this.tempTask = {
          id: '00000000-0000-0000-0000-000000000000',
          title: '',
          author: '',
          isCompleted: false,
          status: '',
          dateCreated: '',
          dateUpdated: '',
        }
      }else{
        this.addTask(res.data);
      }
    })
  }

  openUpdateTaskDialog(task: Task){
    var modal = this.dialogRef.open(TasksPopupComponent, {
      data: {
        buttonPosition: this.addBtn,
        task: task,
        statuses: this.statuses,
        add: false
      }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
      }else{
        this.updateTask(res.data);
      }
    })
  }

  getAllTasks(){
    this.taskService.getAllTasks()
    .subscribe(
      response => {
        this.tasks = response;
        this.taskCount = response.length;
      }
    )
  }

  getAllStatuses(){
    this.statusService.getAllStatus()
    .subscribe(
      response => {
        this.statuses = response;
      }
    )
  }

  addTask(task: Task){
    this.taskService.addTask(task)
    .subscribe(
      response => {
        this.toastr.success('Added successfully', response.title);
        this.getAllTasks();
      }
    )
  }
  
  updateTask(task: Task){
    this.taskService.updateNote(task)
    .subscribe(
      response => {
        this.toastr.success('Updated successfully', response.title);
      }
    )
  }

  removeTask(id: string){
    this.taskService.removeTask(id)
    .subscribe(
      response => {
        this.toastr.success('Removed successfully', response.title);
        this.getAllTasks()
      }
    )
  }

}
