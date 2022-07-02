import { TotalService } from './../../service/total.service';
import { ToastrService } from 'ngx-toastr';
import { RequestUserService } from './../../service/request-user.service';
import { RequestUserPopupComponent } from './../pop-ups/request-user-popup/request-user-popup.component';
import { UserService } from 'src/app/service/user.service';
import { Counter } from '../../models/counter.model';
import { CounterService } from '../../service/counter.service';
import { LoaderService } from './../../service/loader.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { Total } from 'src/app/models/total.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{

  datePipe: DatePipe = new DatePipe('en-US');
  suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];

  totals: Total = {
    id: '',
    userCount: 0,
    noteCount: 0,
    todoCount: 0,
    taskCount: 0,
    programCount: 0,
    subjectCount: 0,
    studentCount: 0
  }

  users = '';
  notes = '';
  todos = '';
  tasks = '';
  programs = '';
  subjects = '';
  students = '';

  isCounted:boolean = false;

  counter: Counter = {
    id: '',
    count: 0,
    overallCount: 0,
    onlineCount: 0,
  };

  mode: any;

  requestUsers: User[] = [];

  constructor(

    private counterService: CounterService,
    public loader: LoaderService,
    private userService: UserService,
    private dialogRef: MatDialog,
    private requestUserService: RequestUserService,
    private toastr : ToastrService,
    private totalService: TotalService

  ) {

      this.counterService.userCounted.subscribe(c => this.isCounted = c);
   }

  ngOnInit(): void {
    this.getAllRequestUsers();
    this.getAllTotals();
    this.getCounter();
  }

  getUserTotal(){
    this.users = this.getCountFormat(this.totals.userCount.toString()).toString();
  }
  getNoteTotal(){
    this.notes = this.getCountFormat(this.totals.noteCount.toString()).toString();
  }
  getTodoTotal(){
    this.todos = this.getCountFormat(this.totals.todoCount.toString()).toString();
  }
  getTaskTotal(){
    this.tasks = this.getCountFormat(this.totals.taskCount.toString()).toString();
  }
  getProgramTotal(){
    this.programs = this.getCountFormat(this.totals.programCount.toString()).toString();
  }
  getSubjectTotal(){
    this.subjects = this.getCountFormat(this.totals.subjectCount.toString()).toString();
  }
  getStudentTotal(){
    this.students = this.getCountFormat(this.totals.studentCount.toString()).toString();
  }

  getFormattedDate(){
    
    var date = new Date();
    var transformDate = this.datePipe.transform(date, 'EEEE, MMMM d, y');
    return transformDate;

  }

  getTime(){
    var time = new Date();
    var transformTime = this.datePipe.transform(time, 'HH:mm');
    return transformTime;
  }

  getCountFormat(count: string){
    if(parseInt(count) == 0) {
      return 0;
    }
    else
    {        
      // hundreds
      if(parseInt(count) <= 999){
        return parseInt(count) ;
      }
      // thousands
      else if(parseInt(count) >= 1000 && parseInt(count) <= 999999){
        return (parseInt(count) / 1000) + 'K';
      }
      // millions
      else if(parseInt(count) >= 1000000 && parseInt(count) <= 999999999){
        return (parseInt(count) / 1000000) + 'M';
      }
      // billions
      else if(parseInt(count) >= 1000000000 && parseInt(count) <= 999999999999){
        return (parseInt(count) / 1000000000) + 'B';
      }
      else
        return parseInt(count) ;
    }
}

  getAllTotals(){
    this.totalService.getTotals()
    .subscribe(
      res => {
        this.totals = res;
        this.getUserTotal();
        this.getNoteTotal();
        this.getTodoTotal();
        this.getTaskTotal();
        this.getProgramTotal();
        this.getSubjectTotal();
        this.getStudentTotal();
      }
    )
  }

  getAllRequestUsers(){
    this.requestUserService.getAllRequestUsers()
    .subscribe(
      res => {
        this.requestUsers = res;
      }
    )
  }

  getCounter(){
    this.counterService.getAllCounter()
    .subscribe(
      res => {
        this.counter = res[0];
      }
    )
  }

  openRequestUserDialog(){
    var modal = this.dialogRef.open(RequestUserPopupComponent, {
      data: {
        requestUsers: this.requestUsers
      }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
      }else{

        if(res.verified.length > 0 ){
          this.verifyUsers(res.verified);
        }

        if(res.notVerified.length > 0){
          this.removeVerifiedUsers(res.notVerified);
        }

      }
    });
  }

  verifyUsers(users: any){
    this.userService.addRequestUsers(users)
    .subscribe(
      res => {
        this.toastr.success("have been verified", "Users");
        this.removeVerifiedUsers(users);
      }
    )
  }

  removeVerifiedUsers(requestUsers: any){
    this.requestUserService.removeRequestUsers(requestUsers)
    .subscribe(
      res => {
      }
    )
  }
}
