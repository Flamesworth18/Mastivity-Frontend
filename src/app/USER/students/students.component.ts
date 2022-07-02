import { UserSubject } from 'src/app/models/userSubject.model';
import { SubjectStudentService } from './../../service/subject-student.service';
import { SubStudent } from './../../models/subStudent.model';
import { ToastrService } from 'ngx-toastr';
import { StudentStatus } from 'src/app/models/student-status.model';
import { StudentStatusService } from './../../service/student-status.service';
import { UserStatusComponent } from './../pop-ups/user-status/user-status.component';
import { StudentService } from './../../service/student.service';
import { Subject } from 'src/app/models/subject.model';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit{

  colors: any[] = [
    '#54478c',
    '#2c699a',
    '#048ba8',
    '#0db39e',
    '#16db93',
    '#83e377',
    '#b9e769',
    '#efea5a',
    '#f1c453',
    '#f29e4c'
  ]

  userSubjects: UserSubject[] = [];
  userStudents: Student[] = [];
  selectedStudents: Student[] = [];

  adminStudents: Student[] = [];

  noGradeStudents: any[] = [];
  passedStudents: any[] = [];
  incompleteStudents: any[] = [];
  failedStudents: any[] = [];

  statuses: StudentStatus[] = [];

  subjectColors: Subject[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private studentService: StudentService,
    private subjectStudentService: SubjectStudentService,
    private dialogRef: MatDialog,
    private statusService: StudentStatusService,
    private toastr: ToastrService
  ) { }

  ngAfterContentChecked(){
  }


  ngOnInit(): void {
    this.getAllUserSubjects();
    this.getAllStudents();
    this.getAllStatuses();
  }

  generateColor(index: number){
    return this.colors[index % this.colors.length]
  }

  getAllStatuses(){
    this.statusService.getAllStudentStatuses()
    .subscribe(
      res => {
        this.statuses = res;
      }
    )
  }

  getAllUserSubjects(){
    this.userService.getAllSubjects(this.authService.user.id)
    .subscribe(
      res => {
        this.userSubjects = res
      }
    )
  }

  getAllStudents(){
    this.studentService.getAllStudents()
    .subscribe(
      res => {
        this.adminStudents = res;
      }
    )
  }

  selectedSubject(userStuds : any){
    this.selectedStudents = userStuds;

    this.userStudents = this.userStudents.filter( ( el ) => !this.userStudents.includes( el ) );
    this.noGradeStudents = this.noGradeStudents.filter( ( el ) => !this.noGradeStudents.includes( el ) );
    this.passedStudents = this.passedStudents.filter( ( el ) => !this.passedStudents.includes( el ) );
    this.incompleteStudents = this.incompleteStudents.filter( ( el ) => !this.incompleteStudents.includes( el ) );
    this.failedStudents = this.failedStudents.filter( ( el ) => !this.failedStudents.includes( el ) );

    // for(let i = 0; i < userStuds.length; i++){
    //   var s = this.adminStudents.find(x => x.fullName === userStuds[i].fullName);
    //   if(s !== undefined){
    //     this.userStudents.push(s);
    //   }
    // }

    for(let i = 0; i < userStuds.length; i ++){
      if(userStuds[i].status === 'NG'){
        this.noGradeStudents.push(userStuds[i]);
      }
      else if(userStuds[i].status === 'Passed'){
        this.passedStudents.push(userStuds[i]);
      }
      else if(userStuds[i].status === 'INC'){
        this.incompleteStudents.push(userStuds[i]);
      }
      else if(userStuds[i].status === 'Failed'){
        this.failedStudents.push(userStuds[i]);
      }
    }
  }

  changeStatus(student: Student){
    var modal = this.dialogRef.open(UserStatusComponent, {
      data: {
        statuses: this.statuses,
        student: student
      }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
      }else{
        this.updateStudentStatus(res.data);
      }
    })
  }

  updateStudentStatus(student: SubStudent){
    this.subjectStudentService.updateSubjectStudents(student)
    .subscribe(
      res => {
        this.selectedSubject(this.selectedStudents);
        this.toastr.success('Status Updated Successfully', res.fullName);
      }
    )
  }

}
