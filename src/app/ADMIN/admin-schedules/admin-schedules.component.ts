import { UserTimeEventsComponent } from './../../USER/pop-ups/user-time-events/user-time-events.component';
import { UserEventsComponent } from './../../USER/pop-ups/user-events/user-events.component';
import { SubjectSchedule } from './../../models/subjectSchedule.model';
import  interactionPlugin  from '@fullcalendar/interaction';
import  dayGridPlugin  from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Schedule } from './../../models/schedule.model';
import { AuthService } from 'src/app/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/angular';
import { Event } from 'src/app/models/event.model';
import { UserSubject } from 'src/app/models/userSubject.model';

@Component({
  selector: 'app-admin-schedules',
  templateUrl: './admin-schedules.component.html',
  styleUrls: ['./admin-schedules.component.scss']
})
export class AdminSchedulesComponent implements OnInit {

  events: Event[] = [];
  event: Schedule = {
    id: '',
    title: '',
    date: '',
    color: '',
    author: '',
    dateCreated: Date.now.toString(),
    dateUpdated: Date.now.toString()
  }

  allEvents: any[] = [];

  subjectSchedule: SubjectSchedule[] = [];
  userSubjects: UserSubject[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [],
    dateClick: this.openEventAddModal.bind(this),
    eventClick: this.openEventUpdateModal.bind(this),
    editable: true,
    lazyFetching: false,
    nowIndicator: true,
    plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
  };

  constructor(
    private dialogRef: MatDialog,
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.getAllUserSchedules();
  }

  openEventAddModal(arg: any){
    if(arg.allDay){
      let modal = this.dialogRef.open(UserEventsComponent, {
        data: {
          schedule: this.event,
          date: arg.dateStr,
          add: true,
          time: ''
        }
      });
  
      modal.afterClosed().subscribe(res => {
        if(res === undefined){
          console.log('no data');
        }else{
          this.event = {
            id: '',
            title: '',
            date: '',
            color: '',
            author: '',
            dateCreated: Date.now.toString(),
            dateUpdated: Date.now.toString()
          }
          this.addUserSchedule(res.data);
        }
      })
    }
    else if(!arg.allDay){
      let modal = this.dialogRef.open(UserTimeEventsComponent, {
        data: {
          schedule: this.event,
          date: arg.dateStr,
          add: true,
          time: arg.date.toLocaleTimeString()
        }
      });
  
      modal.afterClosed().subscribe(res => {
        if(res === undefined){
          console.log('no data');
        }else{
          this.event = {
            id: '',
            title: '',
            date: '',
            color: '',
            author: '',
            dateCreated: Date.now.toString(),
            dateUpdated: Date.now.toString()
          }
          this.addUserSchedule(res.data);
        }
      })
    }
  }

  openEventUpdateModal(arg: any){
    if(arg.el.fcSeg.eventRange.def.allDay){
      let modal = this.dialogRef.open(UserEventsComponent, {
        data: {
          schedule: {
            id: arg.event._def.extendedProps.extraParams[0],
            title: arg.event._def.title,
            date: arg.event._def.extendedProps.extraParams[1],
            color: arg.event._def.ui.backgroundColor
          },
          date: arg.event._def.extendedProps.extraParams[1],
          add: false,
          time: ''
        }
      });
  
      modal.afterClosed().subscribe(res => {
        if(res === undefined){
          console.log("no data");
        }
        else if(res.isRemoved){
          this.event = {
            id: '',
            title: '',
            date: '',
            color: '',
            author: '',
            dateCreated: '',
            dateUpdated: Date.now.toString()
          }
          this.removeUserSchedule(res.data);
        }
        else{
          this.event = {
            id: '',
            title: '',
            date: '',
            color: '',
            author: '',
            dateCreated: '',
            dateUpdated: Date.now.toString()
          }
          this.updateUserSchedule(res.data);
        }
      })
    }
    else if(!arg.el.fcSeg.eventRange.def.allDay){
      let modal = this.dialogRef.open(UserTimeEventsComponent, {
        data: {
          schedule: {
            id: arg.event._def.extendedProps.extraParams[0],
            title: arg.event._def.title,
            date: arg.event._def.extendedProps.extraParams[1],
            color: arg.event._def.ui.backgroundColor
          },
          date: arg.event._def.extendedProps.extraParams[1],
          add: false,
          time: arg.event._instance.range.start.toLocaleTimeString()
        }
      });
  
      modal.afterClosed().subscribe(res => {
        if(res === undefined){
          console.log("no data");
        }
        else if(res.isRemoved){
          this.event = {
            id: '',
            title: '',
            date: '',
            color: '',
            author: '',
            dateCreated: '',
            dateUpdated: Date.now.toString()
          }
          this.removeUserSchedule(res.data);
        }
        else{
          this.event = {
            id: '',
            title: '',
            date: '',
            color: '',
            author: '',
            dateCreated: '',
            dateUpdated: Date.now.toString()
          }
          this.updateUserSchedule(res.data);
        }
      })
    }
  }


  getAllUserSchedules(){
    this.userService.getAllSchedules(this.authService.user.id)
    .subscribe(
      res => {
        var date = new Date();
        for(let i = 0; i < res.length; i++){

          var eventDate = res[i].date.split("-");
          var day = eventDate[2];
          var month = eventDate[1];


          if(parseInt(day) < date.getUTCDate() || parseInt(month) < date.getUTCMonth() + 1){
            res[i].color = "#FF3131";
          }
          else if(parseInt(day) === date.getUTCDate() && parseInt(month) === date.getUTCMonth() + 1){
            res[i].color = "#39FF14";
          }
          else if(parseInt(day) > date.getUTCDate() || parseInt(month) > date.getUTCMonth() + 1){
            res[i].color = "#1F51FF";
          }

          this.events.push({
            title: res[i].title,
            date: res[i].date,
            color: res[i].color,
            extraParams: [
              res[i].id,
              res[i].date
            ]
          })
        }
        
        for(let i = 0; i < this.events.length; i++){
          this.allEvents.push(this.events[i]);
        }
        this.getAllUserSubjects();
      }
    )
  }

  addUserSchedule(schedule: Schedule){
    schedule.author = this.authService.user.firstname;
    schedule.dateUpdated = Date.now.toString();

    this.userService.addSchedule(this.authService.user.id, schedule)
    .subscribe(
      res => {
        this.calendarOptions.events = [];
        this.events = []; 
        this.allEvents = [];
        this.getAllUserSchedules();
        this.toastr.success("Added Successfully", "Event");
      }
    )
  }

  updateUserSchedule(schedule: Schedule){
    schedule.author = this.authService.user.firstname;
    schedule.dateUpdated = Date.now.toString();

    this.userService.updateSchedule(this.authService.user.id, schedule)
    .subscribe(
      res => {
        this.calendarOptions.events = [];
        this.events = [];
        this.allEvents = [];
        this.getAllUserSchedules();
        this.toastr.success("Updated Successfully", "Event");
      }
    )
  }

  
  removeUserSchedule(schedule: Schedule){
    this.userService.removeSchedule(this.authService.user.id, schedule)
    .subscribe(
      res => {
        this.calendarOptions.events = [];
        this.events = [];
        this.allEvents = [];
        this.getAllUserSchedules();
        this.toastr.success("Removed Successfully", "Event");
      }
    )
  }

  getAllUserSubjects(){
    this.userService.getAllSubjects(this.authService.user.id)
    .subscribe(
      res => {
        this.userSubjects = res;
        var recurrenceNumber: number[] = []
        for(let i = 0; i < res.length; i++){
          if(res[i].onMonday){
            recurrenceNumber.push(1);
          }
          if(res[i].onTuesday){
            recurrenceNumber.push(2);
          }
          if(res[i].onWednesday){
            recurrenceNumber.push(3);
          }
          if(res[i].onThursday){
            recurrenceNumber.push(4);
          }
          if(res[i].onFriday){
            recurrenceNumber.push(5);
          }

          this.subjectSchedule.push(
            {
              title: res[i].subjectName,
              startTime: res[i].startingTime,
              endTime: res[i].endingTime,
              daysOfWeek: recurrenceNumber,
              startRecur: res[i].startingDate,
              endRecur: res[i].endingDate
            }
          )

          
        recurrenceNumber = []
        }

        for(let i = 0; i < this.subjectSchedule.length; i++){
          this.allEvents.push(this.subjectSchedule[i]);
        }
        this.calendarOptions.events = this.allEvents;
      }
    )
  }

}
