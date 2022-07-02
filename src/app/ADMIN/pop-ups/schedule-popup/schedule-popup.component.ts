import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Schedule } from 'src/app/models/schedule.model';

@Component({
  selector: 'app-schedule-popup',
  templateUrl: './schedule-popup.component.html',
  styleUrls: ['./schedule-popup.component.scss']
})
export class SchedulePopupComponent implements OnInit {

  schedule: Schedule = {
    id: '',
    title: '',
    date: '',
    color: '',
    author: '',
    dateCreated: '',
    dateUpdated: ''
  }

  constructor(
    private dialogRef: MatDialogRef<SchedulePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.schedule = data.schedule;
  }

  ngOnInit(): void {
    const matDialogConfig = new MatDialogConfig()
    const rect: DOMRect = this.data.buttonPosition.nativeElement.getBoundingClientRect();

    matDialogConfig.position = { right: `65px`, top: `${rect.bottom + 2}px` }
    this.dialogRef.updatePosition(matDialogConfig.position)
  }

  addEditSchedule(){

    this.dialogRef.close({ data: this.schedule });
  }

}
