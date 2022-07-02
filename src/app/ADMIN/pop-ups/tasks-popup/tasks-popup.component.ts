import { Status } from './../../../models/status.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-tasks-popup',
  templateUrl: './tasks-popup.component.html',
  styleUrls: ['./tasks-popup.component.scss']
})
export class TasksPopupComponent implements OnInit {

  task: Task = {
    id: '00000000-0000-0000-0000-000000000000',
    title: '',
    author: '',
    isCompleted: false,
    status: '',
    dateCreated: '',
    dateUpdated: '',
  }

  select: boolean = false
  status: Status = {
    id: 0,
    statusName: '',
  }

  constructor(
    private dialogRef: MatDialogRef<TasksPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.task = data.task;

     }

  ngOnInit(): void {
    const matDialogConfig = new MatDialogConfig()
    const rect: DOMRect = this.data.buttonPosition.nativeElement.getBoundingClientRect();

    matDialogConfig.position = { right: `65px`, top: `${rect.bottom + 2}px` }
    this.dialogRef.updatePosition(matDialogConfig.position)
  }

  addEditTask(){

    this.task.status = this.status.statusName;
    this.dialogRef.close({ data: this.task });
  }

  selectStatus(){
    this.select = !this.select;
  }

  selectedStatus(value: any){
    this.status = value;
  }

}
