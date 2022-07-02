import { StudentService } from '../../service/student.service';
import { SubjectPopupComponent } from '../pop-ups/subject-popup/subject-popup.component';
import { SubjectService } from '../../service/subject.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/service/loader.service';
import { Subject } from 'src/app/models/subject.model';
import { Student } from 'src/app/models/student.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-crud-subjects',
  templateUrl: './admin-crud-subjects.component.html',
  styleUrls: ['./admin-crud-subjects.component.scss']
})
export class AdminCrudSubjectsComponent implements OnInit {

  @ViewChild('subjectBtn', { static: false }) public addBtn !: ElementRef;

  subjects: Subject[] = [];
  subject: Subject = {
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
    students: []
  }
  temporarySubject: Subject = {
    id: '00000000-0000-0000-0000-000000000000',
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
    students: []
  }
  subjectCount: number = 0;
  searchSubject: any;

  mode: any;

  students: Student[] = [];

  days: string = '';

  constructor(
    private dialogRef: MatDialog,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private toastr: ToastrService,
    public loader: LoaderService) { 

    }

  ngOnInit(): void {
    this.getAllSubjects();
    this.getAllStudents();
  }

  openAddSubjectDialog(){
    var modal = this.dialogRef.open(SubjectPopupComponent, {
      data: {
        buttonPosition: this.addBtn,
        subject: this.temporarySubject,
        students: this.students,
        add: true
    }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
        this.temporarySubject = {
          id: '00000000-0000-0000-0000-000000000000',
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
          students: []
        }
      }else{
        this.temporarySubject = {
          id: '00000000-0000-0000-0000-000000000000',
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
          students: []
        }
        this.addSubject(res.data);
      }
    })
  }

  openUpdateSubjectDialog(subject: Subject){
    var modal = this.dialogRef.open(SubjectPopupComponent, {
      data: {
        buttonPosition: this.addBtn,
        subject: subject,
        students: this.students,
        add: false
      }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
        this.temporarySubject = {
          id: '00000000-0000-0000-0000-000000000000',
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
          students: []
        }
      }else{
        this.temporarySubject = {
          id: '00000000-0000-0000-0000-000000000000',
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
          students: []
        }
        this.updateSubject(res.data);
      }
    })
  }

  addSubject(subject: Subject){

    subject.daysView = '';
    for(let i = 0; i < subject.days.length; i++){
      subject.daysView += subject.days[i].abbreviation;
    }

    var timeSplit = subject.startingTime.split(':');
    var startHour = parseInt(timeSplit[0]);
    var startMinutes = timeSplit[1];
    var meridian = "";
    if (startHour > 12) {
      meridian = 'PM';
      startHour -= 12;
    } else if (startHour < 12) {
      meridian = 'AM';
    if (startHour == 0) {
      startHour = 12;
    }
    } else {
      meridian = 'PM';
    }

    subject.startingTimeView = startHour + ":" + startMinutes + " " + meridian;

    var timeSplit = subject.endingTime.split(':');
    var endHours = parseInt(timeSplit[0]);
    var endMinutes = timeSplit[1];
    var meridian = "";
    if (endHours > 12) {
      meridian = 'PM';
      endHours -= 12;
    } else if (endHours < 12) {
      meridian = 'AM';
    if (endHours == 0) {
      endHours = 12;
    }
    } else {
      meridian = 'PM';
    }

    subject.endingTimeView = endHours + ":" + endMinutes + " " + meridian;

    this.subjectService.addSubject(subject)
    .subscribe(
      response => {
        this.getAllSubjects();
        this.toastr.success('Added successfully', response.subjectName);
      }
    )
  }

  updateSubject(subject: Subject){

    subject.daysView = '';
    for(let i = 0; i < subject.days.length; i++){
      subject.daysView += subject.days[i].abbreviation;
    }

    var timeSplit = subject.startingTime.split(':');
    var startHour = parseInt(timeSplit[0]);
    var startMinutes = timeSplit[1];
    var meridian = "";
    if (startHour > 12) {
      meridian = 'PM';
      startHour -= 12;
    } else if (startHour < 12) {
      meridian = 'AM';
    if (startHour == 0) {
      startHour = 12;
    }
    } else {
      meridian = 'PM';
    }

    subject.startingTimeView = startHour + ":" + startMinutes + " " + meridian;

    var timeSplit = subject.endingTime.split(':');
    var endHours = parseInt(timeSplit[0]);
    var endMinutes = timeSplit[1];
    var meridian = "";
    if (endHours > 12) {
      meridian = 'PM';
      endHours -= 12;
    } else if (endHours < 12) {
      meridian = 'AM';
    if (endHours == 0) {
      endHours = 12;
    }
    } else {
      meridian = 'PM';
    }

    subject.endingTimeView = endHours + ":" + endMinutes + " " + meridian;

    this.subjectService.updateSubject(subject)
    .subscribe(
      response => {
        this.getAllSubjects();
        this.toastr.success('Updated successfully', response.subjectName);
      }
    )
  }

  removeSubject(id: string){
    this.subjectService.removeSubject(id)
    .subscribe(
      response => {
        this.toastr.success('Removed successfully', response.subjectName);
        this.getAllSubjects()
      }
    )
  }

  getAllSubjects(){
    this.subjectService.getAllSubjects()
    .subscribe(
      response => {
        this.subjects = response;
        this.subjectCount = response.length;
      }
    )
  }

  getAllStudents(){
    this.studentService.getAllStudents()
    .subscribe(
      res => {
        this.students = res;
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
        this.removeSubject(id);
      }
    })
  }
}
