import { StudentStatus } from './../../../models/student-status.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-student-popup',
  templateUrl: './student-popup.component.html',
  styleUrls: ['./student-popup.component.scss']
})
export class StudentPopupComponent implements OnInit {

  student: Student = {
    id: '',
    fullName: '',
    yearLevel: '',
    program: '',
    department: '',
    status: ''
  }

  select: boolean = false
  status: StudentStatus = {
    id: '',
    status: '',
  }

  constructor(
    private dialogRef: MatDialogRef<StudentPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.student = data.student;

    }

  ngOnInit(): void {
    const matDialogConfig = new MatDialogConfig()
    const rect: DOMRect = this.data.buttonPosition.nativeElement.getBoundingClientRect();

    matDialogConfig.position = { right: `65px`, top: `${rect.bottom + 2}px` }
    this.dialogRef.updatePosition(matDialogConfig.position)
  }

  addEditStudent(){

    this.student.status = this.status.status;
    this.dialogRef.close({ data: this.student });
  }

  selectStatus(){
    this.select = !this.select;
  }

  selectedStatus(value: any){
    this.status = value;
  }

}
