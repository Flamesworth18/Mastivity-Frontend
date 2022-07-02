import { Role } from './../../../models/role.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubUser } from 'src/app/models/subUser.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.scss']
})
export class UserPopupComponent implements OnInit {

  user: User = {
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    passwordHash: '',
    passwordSalt: '',
    verificationToken: '',
    isVerify: false,
    passwordResetToken: '',
    passwordTokenExpires: new Date(),
    programHandled: [],
    subjectHandled: [],
    studentHandled: [],
    schedules: [],
    notes: [],
    todos: [],
    role: '',
    userCreated: ''
  }
  subUser: SubUser = {
    id: '00000000-0000-0000-0000-000000000000',
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    role: '',
    userCreated: '',
    isVerify: false,
  }

  select: boolean = false
  role: Role = {
    id: '',
    name: '',
  }

  selectVerify: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<UserPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.user = data.user;

    }

  ngOnInit(): void {
    const matDialogConfig = new MatDialogConfig()
    const rect: DOMRect = this.data.buttonPosition.nativeElement.getBoundingClientRect();

    matDialogConfig.position = { right: `65px`, top: `${rect.bottom + 2}px` }
    this.dialogRef.updatePosition(matDialogConfig.position)
  }

  addUser(){
    this.subUser.role = this.role.name;
    this.dialogRef.close({ data: this.subUser })
  }

  editUser(){
    this.user.role = this.role.name;
    if(this.user.role === ""){
      this.user.role = "User";
    }
    this.dialogRef.close({ data: this.user });
  }

  selectRole(){
    this.select = !this.select;
  }

  selectedRole(value: any){
    this.role = value;
  }

  selectVerification(){
    this.selectVerify = !this.selectVerify;
  }

  VerifyUser(){
    this.user.isVerify = true;
  }

  NotVerifyUser(){
    this.user.isVerify = false;
  }
}
