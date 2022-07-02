import { SubStudent } from './../../../models/subStudent.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentStatus } from 'src/app/models/student-status.model';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss']
})
export class UserStatusComponent implements OnInit {

  student: SubStudent = {
    id: '',
    fullName: '',
    status: '',
    remarks: '',
  }

  select: boolean = false
  status: StudentStatus = {
    id: '',
    status: '',
  }

  constructor(
    private dialogRef: MatDialogRef<UserStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.student = data.student;

    }

  ngOnInit(): void {
  }

  addEditStudent(){

    if(this.status.status === ''){
      this.status.status = this.student.status;
    }

    this.student.status = this.status.status;
    this.dialogRef.close({ data: this.student });
  }

  selectStatus(){
    this.select = !this.select;
  }

  selectedStatus(value: any){
    if(value === ''){
      value = 'NG'
    }
    this.status = value;
  }

}
