import { StudentStatusService } from '../../service/student-status.service';
import { StudentPopupComponent } from '../pop-ups/student-popup/student-popup.component';
import { StudentService } from '../../service/student.service';
import { Student } from '../../models/student.model';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/service/loader.service';
import { StudentStatus } from 'src/app/models/student-status.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-crud-students',
  templateUrl: './admin-crud-students.component.html',
  styleUrls: ['./admin-crud-students.component.scss']
})
export class AdminCrudStudentsComponent implements OnInit {

  @ViewChild('studentBtn', { static: false }) public addBtn !: ElementRef;

  students: Student[] = [];
  student: Student = {
    id: '00000000-0000-0000-0000-000000000000',
    fullName: '',
    yearLevel: '',
    program: '',
    department: '',
    status: ''
  }
  tempStudent: Student = {
    id: '00000000-0000-0000-0000-000000000000',
    fullName: '',
    yearLevel: '',
    program: '',
    department: '',
    status: ''
  }
  studentCount = 0;
  searchStudent: any;

  statuses: StudentStatus[] = []

  mode: any;

  constructor(
    private dialogRef: MatDialog,
    private studentService: StudentService,
    private toastr: ToastrService,
    public loader: LoaderService,
    private status: StudentStatusService) { 

    }

  ngOnInit(): void {
    this.getAllStudents();
    this.getAllStatuses();
  }

  openAddStudentDialog(){
    var modal = this.dialogRef.open(StudentPopupComponent, {
      data: {
        buttonPosition: this.addBtn,
        student: this.tempStudent,
        statuses: this.statuses,
        add: true
      }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
        this.tempStudent = {
          id: '00000000-0000-0000-0000-000000000000',
          fullName: '',
          yearLevel: '',
          program: '',
          department: '',
          status: ''
        }
      }else{
        this.tempStudent = {
          id: '00000000-0000-0000-0000-000000000000',
          fullName: '',
          yearLevel: '',
          program: '',
          department: '',
          status: ''
        }
        this.addStudent(res.data);
      }
    })
  }

  openUpdateNoteDialog(student: Student){
    var modal = this.dialogRef.open(StudentPopupComponent, {
      data: {
        buttonPosition: this.addBtn,
        student: student,
        statuses: this.statuses,
        add: false
      }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
        this.tempStudent = {
          id: '00000000-0000-0000-0000-000000000000',
          fullName: '',
          yearLevel: '',
          program: '',
          department: '',
          status: ''
        }
      }else{
        this.tempStudent = {
          id: '00000000-0000-0000-0000-000000000000',
          fullName: '',
          yearLevel: '',
          program: '',
          department: '',
          status: ''
        }
        this.updateStudent(res.data);
      }
    })
  }

  getAllStatuses(){
    this.status.getAllStudentStatuses()
    .subscribe(
      response => {
        this.statuses = response;
      }
    )
  }

  getAllStudents(){
    this.studentService.getAllStudents()
    .subscribe(
      response => {
        this.students = response;
        this.studentCount = response.length;
      }
    )
  }

  addStudent(student: Student){
    this.studentService.addStudent(student)
    .subscribe(
      response => {
        this.toastr.success('Added successfully', response.fullName);
        this.getAllStudents();
      }
    )
  }

  updateStudent(student: Student){
    this.studentService.updateStudent(student)
    .subscribe(
      response => {
        this.toastr.success('Updated successfully', response.fullName);
      }
    )
  }

  removeStudent(id: string){
    this.studentService.removeStudent(id)
    .subscribe(
      response => {
        this.toastr.success('Removed successfully', response.fullName);
        this.getAllStudents()
      })
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
        this.removeStudent(id);
      }
    })
  }
}
