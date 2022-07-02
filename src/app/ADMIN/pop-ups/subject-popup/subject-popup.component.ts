import { AuthService } from 'src/app/service/auth.service';
import { SubjectService } from 'src/app/service/subject.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';
import { Subject } from 'src/app/models/subject.model';
import { Day } from 'src/app/models/day.model';

@Component({
  selector: 'app-subject-popup',
  templateUrl: './subject-popup.component.html',
  styleUrls: ['./subject-popup.component.scss']
})
export class SubjectPopupComponent implements OnInit {

  programNumber = 0;
  studentNumber = 0;

  programs: any[] = [];
  students: any[] = [];

  subject: Subject = {
    id: '',
    subjectCode: '',
    subjectName: '',
    startingTime: '',
    endingTime: '',
    startingTimeView: '',
    endingTimeView: '',
    startingDate: '',
    endingDate: '',
    days: [
      {
        id: '',
        abbreviation: ''
      }
    ],
    daysView: '',
    onMonday: false,
    onTuesday: false,
    onWednesday: false,
    onThursday: false,
    onFriday: false,
    department: '',
    students: []
  }

  student: Student = {
    id: '',
    fullName: '',
    yearLevel: '',
    program: '',
    department: '',
    status: ''
  }

  days: Day[] = [];
  day: Day = {
    id: '',
    abbreviation: '',
  }

  constructor(
    private dialogRef: MatDialogRef<SubjectPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.subject = data.subject;
      this.students = data.students;
  }

  ngOnInit(): void {

    const matDialogConfig = new MatDialogConfig()
    const rect: DOMRect = this.data.buttonPosition.nativeElement.getBoundingClientRect();

    matDialogConfig.position = { right: `65px`, top: `${rect.bottom + 2}px` }
    this.dialogRef.updatePosition(matDialogConfig.position); 
  }

  addEditSubject(){

    if(this.subject.onMonday){
      this.days.push(
        this.day = {
          id: '',
          abbreviation: 'M'
        }
      )
    }

    if(this.subject.onTuesday){
      this.days.push(
        this.day = {
          id: '',
          abbreviation: 'T'
        }
      )
    }

    if(this.subject.onWednesday){
      this.days.push(
        this.day = {
          id: '',
          abbreviation: 'W'
        }
      )
    }

    if(this.subject.onThursday){
      this.days.push(
        this.day = {
          id: '',
          abbreviation: 'Th'
        }
      )
    }

    if(this.subject.onFriday){
      this.days.push(
        this.day = {
          id: '',
          abbreviation: 'F'
        }
      )
    }

    this.subject.days = this.days;
    this.dialogRef.close({ data: this.subject });
  }

  addStudent(student: Student){
    this.subject.students.push({
      id: '',
      fullName: student.fullName,
      status: student.status,
      remarks: ''
    })
  }

  removeStudent(student: Student){
    for(let i = 0; i < this.subject.students.length; i++){
      if(this.subject.students[i].fullName === student.fullName){
        this.subject.students.splice(i, 1);
      }
    }
  }

  selectedStudent(n:number){
    this.studentNumber = n;
  }

  hasStudent(student: Student){
    return this.subject.students.findIndex(x => x.fullName === student.fullName) > -1;
  }

  onMonday(){
    this.subject.onMonday = !this.subject.onMonday;
  }
  onTuesday(){
    this.subject.onTuesday = !this.subject.onTuesday;
  }
  onWednesday(){
    this.subject.onWednesday = !this.subject.onWednesday;
  }
  onThursday(){
    this.subject.onThursday = !this.subject.onThursday;
  }
  onFriday(){
    this.subject.onFriday = !this.subject.onFriday;
  }
}
