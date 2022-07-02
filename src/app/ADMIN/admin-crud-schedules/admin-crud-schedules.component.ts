import { SchedulePopupComponent } from '../pop-ups/schedule-popup/schedule-popup.component';
import { ScheduleService } from '../../service/schedule.service';
import { Schedule } from 'src/app/models/schedule.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/service/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-crud-schedules',
  templateUrl: './admin-crud-schedules.component.html',
  styleUrls: ['./admin-crud-schedules.component.scss']
})
export class AdminCrudSchedulesComponent implements OnInit {

  @ViewChild('addSchedule', { static: false }) public schedBtn !: ElementRef;

  schedules: Schedule[] = [];
  schedule: Schedule = {
    id: '',
    title: '',
    date: '',
    color: '',
    author: '',
    dateCreated: '',
    dateUpdated: ''
  }
  tempSched: Schedule = {
    id: '00000000-0000-0000-0000-000000000000',
    title: '',
    date: '',
    color: '',
    author: '',
    dateCreated: '',
    dateUpdated: '',
  }
  schedulesCount = 0;
  searchSchedule: any;

  mode: any;

  constructor(
    private dialogRef: MatDialog,
    private scheduleService: ScheduleService,
    private toastr: ToastrService,
    public loader: LoaderService) {

     }

  ngOnInit(): void {
    this.getAllSchedules()
  }

  openAddScheduleDialog(){
    var modal = this.dialogRef.open(SchedulePopupComponent, {
      data: {
        buttonPosition: this.schedBtn,
        schedule: this.tempSched,
        add: true
      }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
        this.tempSched = {
          id: '00000000-0000-0000-0000-000000000000',
          title: '',
          date: '',
          color: '',
          author: '',
          dateCreated: '',
          dateUpdated: '',
        }
      }else{
        this.addSchedule(res.data);
      }
    })
  }

  openUpdateScheduleDialog(schedule: Schedule){
    var modal = this.dialogRef.open(SchedulePopupComponent, {
      data: {
        buttonPosition: this.schedBtn,
        schedule: schedule,
        add: false
      }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
      }else{
        this.updateSchedule(res.data);
      }
    })
  }

  getAllSchedules(){
    this.scheduleService.getAllSchedules()
    .subscribe(
      response => {
        this.schedules = response;
        this.schedulesCount = response.length
      }
    )
  }

  addSchedule(schedule: Schedule){
    this.scheduleService.addSchedule(schedule)
    .subscribe(
      response => {
        this.toastr.success('Added successfully', response.title);
        this.getAllSchedules();
      }
    )
  }

  updateSchedule(schedule: Schedule){
    this.scheduleService.updateSchedule(schedule)
    .subscribe(
      response => {
        this.toastr.success('Updated successfully', response.title);
      }
    )
  }

  removeSchedule(id: string){
    this.scheduleService.removeSchedule(id)
    .subscribe(
      response => {
        this.toastr.success('Removed successfully', response.title);
        this.getAllSchedules()
      }
    )
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
        this.removeSchedule(id);
      }
    })
  }

}
