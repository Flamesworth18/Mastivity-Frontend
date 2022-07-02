import { UserSubject } from './../../models/userSubject.model';
import { TodosDataService } from './../../service/userTodos.service';
import { CalendarOptions } from '@fullcalendar/angular';
import { Router } from '@angular/router';
import { NotesDataService } from './../../service/userNotes.service';
import { AuthService } from './../../service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';
import { Counter } from 'src/app/models/counter.model';
import { Note } from 'src/app/models/note.model';
import { Event } from 'src/app/models/event.model';
import { ToDo } from 'src/app/models/todo.model';
import { LoaderService } from 'src/app/service/loader.service';
import { SubjectSchedule } from 'src/app/models/subjectSchedule.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  counters: Counter[] = [];
  notes: Note[] = [];
  
  isCounted:boolean = false;

  allEvents: any[] = [];

  subjectSchedule: SubjectSchedule[] = [];
  userSubjects: UserSubject[] = [];

  calendar: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [],
    editable: true,
    contentHeight: "auto",
    dateClick: this.redirectToSchedulePage.bind(this),
    eventClick: this.redirectToSchedulePage.bind(this),
  }

  events: Event[] = [];

  todos: ToDo[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private notesDataService: NotesDataService,
    private todosDataService: TodosDataService,
    private router: Router,
    public loader: LoaderService,
  ) {

    var c = sessionStorage.getItem("counted");
    if(c != null){
      this.isCounted = JSON.parse(c);
    }

   }

  ngOnInit(): void {
    this.getAllUserNotes();
    this.getAllUserSchedules();
    this.getAllUserTodos();
  }


  getAllUserNotes(){
    this.userService.getAllNotes(this.authService.user.id)
    .subscribe(
      res => {
        this.notes = res;
      }
    )
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

        this.calendar.events = this.allEvents;
      }
    )
  }

  getAllUserTodos(){
    this.userService.getAllTodos(this.authService.user.id)
    .subscribe(
      res => {
        this.todos = res;
      }
    )
  }

  addUserNote(): void{
    sessionStorage.setItem("addNote", 'true');
    this.notesDataService.createNote(true);
    this.notesDataService.activateMethods();
    this.router.navigate(['/notes']);
  }

  addUserTodo(): void{
    sessionStorage.setItem("addTodo", 'true');
    this.todosDataService.createTodo(true);
    this.todosDataService.activateMethods();
    this.router.navigate(['/to-dos'])
  }

  redirectToSchedulePage(arg: any){
    this.router.navigate(['/schedules']);
  }
}
