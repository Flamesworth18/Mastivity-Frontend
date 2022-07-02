import { UserService } from 'src/app/service/user.service';
import { Schedule } from './../../../models/schedule.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.scss']
})
export class UserEventsComponent implements OnInit {

  event: Schedule = {
    id: '',
    title: '',
    date: '',
    color: '',
    author: '',
    dateCreated: '',
    dateUpdated: Date.now.toString()
  }
  date:string = '';

  constructor(
    private dialogRef: MatDialogRef<UserEventsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.event = data.schedule;
      this.date = data.date;
   }

  ngOnInit(): void {
  }

  addEditSchedule(){
    this.event.date = this.date;
    this.event.color = "#0000FF";
    this.dialogRef.close({ data: this.event });
  }

  removeSchedule(){
    this.dialogRef.close({ data: this.event, isRemoved: true });
  }

  confirmationDialog(){
    Swal.fire({
      title: "Are you sure you want to remove?",
      text: "You will not be able to recover this file!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if(result.value){
        this.removeSchedule();
      }
    })
  }
}
