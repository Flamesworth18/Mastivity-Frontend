import { ToastrService } from 'ngx-toastr';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request-user-popup',
  templateUrl: './request-user-popup.component.html',
  styleUrls: ['./request-user-popup.component.scss']
})
export class RequestUserPopupComponent implements OnInit {

  requestUsers: User[] = [];

  verifiedUsers: User[] = [];

  notVerifiedUsers: User[] = [];

  constructor(
    private dialogRef: MatDialogRef<RequestUserPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService
  ) { 

    this.requestUsers = data.requestUsers;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.dialogRef.close({ verified: this.verifiedUsers, notVerified: this.notVerifiedUsers });
  }

  confirm(user: User, index: number){
    user.isVerify = true;
    this.toastr.success("has been verified", "Request");

    this.requestUsers.splice(index, 1);
    this.verifiedUsers.push(user);
  }

  delete(user: User, index: number){
    this.requestUsers.splice(index, 1);
    this.notVerifiedUsers.push(user);

    this.toastr.success("has been deleted", "Request");
  }

  confirmationDialog(user: User, index: number){
    Swal.fire({
      title: "Are you sure you want to remove?",
      text: "You will not be able to recover this request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if(result.value){
        this.delete(user, index);
      }
    })
  }

}
