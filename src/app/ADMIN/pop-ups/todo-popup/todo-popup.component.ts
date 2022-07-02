import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToDo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-todo-popup',
  templateUrl: './todo-popup.component.html',
  styleUrls: ['./todo-popup.component.scss']
})
export class TodoPopupComponent implements OnInit{

  todo: ToDo = {
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
  tasks: any[] = [
    {
      id: '00000000-0000-0000-0000-000000000000',
      title: '',
      isCompleted: false
    }
  ]
  taskNumber: number = 0;

  constructor(
    private dialogRef: MatDialogRef<TodoPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.todo = data.todo;
      this.tasks = this.todo.tasks

     }

  ngOnInit(): void {
    const matDialogConfig = new MatDialogConfig()
    const rect: DOMRect = this.data.buttonPosition.nativeElement.getBoundingClientRect();

    matDialogConfig.position = { right: `65px`, top: `${rect.bottom + 2}px` }
    this.dialogRef.updatePosition(matDialogConfig.position)
  }

  addEditTodo(){
    this.dialogRef.close({ data: this.todo });
  }

  addTask(){
    this.tasks.push(
      {
        id: '',
        title: '',
        isCompleted: false
      }
    )
  }

  removeTask(){
    this.tasks.splice(this.taskNumber, 1);
  }

  currentTask(n:number){
    this.taskNumber = n;
  }
}
