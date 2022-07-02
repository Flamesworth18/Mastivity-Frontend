import { RoleService } from '../../service/role.service';
import { SubUser } from '../../models/subUser.model';
import { UserPopupComponent } from '../pop-ups/user-popup/user-popup.component';
import { UserService } from '../../service/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { LoaderService } from 'src/app/service/loader.service';
import { ToastrService } from 'ngx-toastr';
import { Role } from 'src/app/models/role.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-crud-users',
  templateUrl: './admin-crud-users.component.html',
  styleUrls: ['./admin-crud-users.component.scss']
})
export class AdminCrudUsersComponent implements OnInit {

  @ViewChild('addBtn', { static: false }) public addBtn !: ElementRef;

  users: User[] = [];
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
  emptyUser: User = {
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
    id: '',
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    role: '',
    userCreated: '',
    isVerify: false
  }
  userCount:number = 0;
  searchUser: any;

  roles: Role[] = [];

  mode: any;

  constructor(
    private dialogRef: MatDialog,
    private userService: UserService,
    private toastr: ToastrService,
    public loader: LoaderService,
    private roleService: RoleService) {

     }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllRoles();
  }

  openAddUserDialog(){
    var modal = this.dialogRef.open(UserPopupComponent, {
      data: {
        buttonPosition: this.addBtn,
        user: this.subUser,
        roles: this.roles,
        add: true
      }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
        this.emptyUser = {
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
      }else{
        this.addUser(res.data)
      }
    })
  }

  openUpdateUserDialog(user: User){
    var modal = this.dialogRef.open(UserPopupComponent, {
      data: {
        buttonPosition: this.addBtn,
        user: user,
        roles: this.roles,
        add: false
      }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
      }else{
        console.log(res.data)
        this.updateUser(res.data);
      }
    })
  }

  getAllUsers(){
    this.userService.getAllUsers()
    .subscribe(
      response => {
        this.users = response;
        this.userCount = response.length;
      }
    )
  }

  getAllRoles(){
    this.roleService.getAllRole()
    .subscribe(
      response => {
        this.roles = response;
      }
    )
  }

  addUser(user: SubUser){
    this.userService.addUser(user)
    .subscribe(
      response => {
        this.toastr.success('Added successfully', 'USER');
        this.getAllUsers();
      }
    )
  }

  updateUser(user: User){
    this.userService.updateUser(user)
    .subscribe(
      response => {
        this.toastr.success('Updated successfully', 'USER');
      }
    )
  }


  removeUser(id: string){
    this.userService.removeUser(id)
    .subscribe(
      response => {
        this.toastr.success('Removed successfully', 'USER');
        this.getAllUsers()
      }
    )
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
        this.removeUser(id);
      }
    })
  }
}
