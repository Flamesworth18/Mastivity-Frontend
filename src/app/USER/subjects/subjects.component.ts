import { StudentService } from './../../service/student.service';
import { Student } from './../../models/student.model';
import { UserSubject } from '../../models/userSubject.model';
import { SubjectService } from './../../service/subject.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';
import { LoaderService } from 'src/app/service/loader.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'src/app/models/subject.model';
import { Observable } from 'rxjs';
import { UserStudentsComponent } from '../pop-ups/user-students/user-students.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  subjects:Subject[] = [];
  userSubjects: UserSubject[] = [];
  userSubject:UserSubject = {
    id: '00000000-0000-0000-0000-000000000000',
    subjectCode: '',
    subjectName: '',
    startingTime: '',
    endingTime: '',
    startingTimeView: '',
    endingTimeView: '',
    startingDate: '',
    endingDate: '',
    daysView: '',
    onMonday: false,
    onTuesday: false,
    onWednesday: false,
    onThursday: false,
    onFriday: false,
    department: '',
    students: [{
      id: '',
      fullName: '',
      status: '',
      remarks: ''
    }],
  }

  subjectCount:number = 0
  userSubjectCount:number = 0;
  activeSubject:string = '';
  activeUserSubject:UserSubject = {
    id: '',
    subjectCode: '',
    subjectName: '',
    startingTime: '',
    endingTime: '',
    startingTimeView: '',
    endingTimeView: '',
    startingDate: '',
    endingDate: '',
    daysView: '',
    onMonday: false,
    onTuesday: false,
    onWednesday: false,
    onThursday: false,
    onFriday: false,
    department: '',
    students: [],
  }
  selectedSubject:Subject = {
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
    students: [{
      id: '',
      fullName: '',
      status: '',
      remarks: '',
    }],
  }

  hide:boolean = false;

  userSub: any;
  sub: any;

  mode: boolean = true;

  days: string = '';

  students: Student[] = [];

  constructor(
    private dialogRef: MatDialog,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private userService: UserService,
    private authService: AuthService,
    public loader: LoaderService,
    private toastr: ToastrService) { 

    }

  ngOnInit(): void {
    this.getAllSubjects();
    this.getUserSubjects();
    this.getAllStudents();
  }

  //show and get the active subject id
  showIcons(id: string){
    this.activeSubject = id;
  }

  //selected subject to get its students
  selectedSubjectStudents(subject: Subject){
    this.selectedSubject = subject;
  }

  //get the selected subject name
  getSubjectName(subject: Subject){
    this.userSubject.subjectCode = subject.subjectCode;
    this.userSubject.subjectName = subject.subjectName;
    this.userSubject.startingTime = subject.startingTime;
    this.userSubject.endingTime = subject.endingTime;
    this.userSubject.startingTimeView = subject.startingTimeView;
    this.userSubject.endingTimeView = subject.endingTimeView;
    this.userSubject.startingDate = subject.startingDate;
    this.userSubject.endingDate = subject.endingDate;
    this.userSubject.daysView = subject.daysView;
    this.userSubject.onMonday = subject.onMonday;
    this.userSubject.onTuesday = subject.onTuesday;
    this.userSubject.onWednesday = subject.onWednesday;
    this.userSubject.onThursday = subject.onThursday;
    this.userSubject.onFriday = subject.onFriday;
    this.userSubject.department = subject.department;
  }

  //hide subject if already added
  hideSubject(subject: Subject): Observable<boolean>{
    for(let i = 0; i < this.userSubjects.length; i++){
      if(this.userSubjects[i].subjectName === subject.subjectName){
        return new Observable(obs => obs.next(false));
      }
    }
    return new Observable(obs => obs.next(true));
  }

  //get active user subject name
  getActiveUserSubject(subject: UserSubject){
    this.activeUserSubject = subject;
  }

  //get all subjects
  getAllSubjects(){
    this.subjectService.getAllSubjects()
    .subscribe(
      response => {
        this.subjects = response;
      }
    );
  }

  //get all students
  getAllStudents(){
    this.studentService.getAllStudents()
    .subscribe(
      res => {
        this.students = res;
      }
    )
  }

  //get all user subjects
  getUserSubjects(){
    this.userService.getAllSubjects(this.authService.user.id)
    .subscribe(
      response => {
        this.userSubjects = response;
        this.userSubjectCount = response.length;
      }
    );
  }

  //add subject
  addSubject(){
    this.userService.addSubject(this.authService.user.id, this.userSubject)
    .subscribe(
      response => {
        this.getAllSubjects();
        this.getAllStudents();
        this.getUserSubjects();
        this.toastr.success('Added Successfully', response.subjectName);
      }
    );
  }

  //update subject
  updateSubject(userSubject: UserSubject){
    this.userService.updateSubject(this.authService.user.id, this.activeUserSubject.id, userSubject)
    .subscribe(
      res => {
        this.getAllSubjects();
        this.getAllStudents();
        this.getUserSubjects();
        this.toastr.success('Have been updated', 'Students')
      },
      err => {
        console.log(err);
      }
    )
  }

  //remove subject
  removeSubject(){
    this.userService.removeSubject(this.authService.user.id, this.activeUserSubject.id)
    .subscribe(
      response => {
        this.getAllSubjects();
        this.getAllStudents();
        this.getUserSubjects();
        this.toastr.success('Removed Successfully', response.subjectName);
      }
    );
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
        this.removeSubject();
      }
    })
  }

  openAddStudentDialog(student: Student){
    var modal = this.dialogRef.open(UserStudentsComponent, {
      data: {
        students: this.students,
        add: true
      }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
      }else{
        this.userSubject.students = res.data;
        this.toastr.success('Have been added', 'Students')
      }
    })
  }


  openUpdateStudentDialog(){
    console.log(this.students)

    var modal = this.dialogRef.open(UserStudentsComponent, {
      data: {
        students: this.students,
        add: false
      }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
      }else{
        this.activeUserSubject.students = res.data;
        this.updateSubject(this.activeUserSubject);
      }
    })
  }
}
