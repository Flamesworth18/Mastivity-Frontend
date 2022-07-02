import { UserSubject } from '../../../models/userSubject.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-subjects',
  templateUrl: './user-subjects.component.html',
  styleUrls: ['./user-subjects.component.scss']
})
export class UserSubjectsComponent implements OnInit {

  selectSubjects:UserSubject[] = []
  userSubjects:UserSubject[] = [];

  constructor(
    private dialogRef: MatDialogRef<UserSubjectsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
      this.selectSubjects = data.subjects;
      
    }

  ngOnInit(): void {
  }

  addSelectSubject(subject: UserSubject){
    this.selectSubjects.push(subject);
  }

  removeSelectSubject(subject: UserSubject){
    var sub = this.selectSubjects.findIndex(s => s.id === subject.id);
    if(sub > -1){
      this.selectSubjects.splice(sub, 1);
    }
  }

  addUserSubject(subject: UserSubject){
    this.userSubjects.push(subject);
    this.removeSelectSubject(subject);
  }

  removeUserSubject(subject: UserSubject){
    var sub = this.userSubjects.findIndex(s => s.id === subject.id);
    if(sub > -1){
      this.userSubjects.splice(sub, 1);
    }

    this.addSelectSubject(subject);
  }

  addEditToUserSubjects(){

    this.dialogRef.close({ data: this.userSubjects });
  }

}
