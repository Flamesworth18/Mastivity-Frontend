import { UserStudent } from './../../../models/userStudent.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-students',
  templateUrl: './user-students.component.html',
  styleUrls: ['./user-students.component.scss']
})
export class UserStudentsComponent implements OnInit {

  selectStudents:UserStudent[] = []
  userStudents:UserStudent[] = [];

  constructor(
    private dialogRef: MatDialogRef<UserStudentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.selectStudents = data.students;
    }

  ngOnInit(): void {
  }

  addSelectStudent(student: UserStudent){
    this.selectStudents.push(student);
  }

  removeSelectStudent(student: UserStudent){
    var stud = this.selectStudents.findIndex(s => s.id === student.id);
    if(stud > -1){
      this.selectStudents.splice(stud, 1);
    }
  }

  addUserStudent(student: UserStudent){
    this.userStudents.push(student);
    this.removeSelectStudent(student);
  }

  removeUserStudent(student: UserStudent){
    var stud = this.userStudents.findIndex(s => s.id === student.id);
    if(stud > -1){
      this.userStudents.splice(stud, 1);
    }

    this.addSelectStudent(student);
  }

  addEditUserStudent(){

    this.dialogRef.close({ data: this.userStudents });
  }

}
