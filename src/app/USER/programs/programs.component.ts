import { SubjectService } from './../../service/subject.service';
import { Subject } from './../../models/subject.model';
import { ToastrService } from 'ngx-toastr';
import { UserSubjectsComponent } from './../pop-ups/user-subjects/user-subjects.component';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Program } from 'src/app/models/program.model';
import { UserProgram } from 'src/app/models/userProgram.model';
import { ProgramService } from 'src/app/service/program.service';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';
import { LoaderService } from 'src/app/service/loader.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {

  programs:Program[] = [
    {
      id:'',
      programAbbreviation: '',
      programName: '',
      semester: '',
      schoolYear: '',
      department: '',
      subjects: [
        {
          id: '',
          subjectName: '',
        }
      ]
    }
  ];
  userPrograms: UserProgram[] = [];
  userProgram:UserProgram = {
    id: '00000000-0000-0000-0000-000000000000',
    programAbbreviation: '',
    programName: '', 
    semester: '',
    schoolYear: '',
    department: '',
    subjects: [],
  }

  programCount:number = 0
  userProgramCount:number = 0;
  activeProgram:string = '';
  activeUserProgram:UserProgram = {
    id:'',
    programAbbreviation: '',
    programName: '',
    semester: '',
    schoolYear: '',
    department: '',
    subjects: []
  }
  selectedProgram:Program = {
    id:'',
    programAbbreviation: '',
    programName: '',
    semester: '',
    schoolYear: '',
    department: '',
    subjects: []
  }
  selectedUserProgram:Program = {
    id:'',
    programAbbreviation: '',
    programName: '',
    semester: '',
    schoolYear: '',
    department: '',
    subjects: []
  }

  hide:boolean = false;

  userProg: any;
  prog: any;

  mode: any;

  subjects: Subject[] = [];

  constructor(
    private dialogRef: MatDialog,
    private programsService: ProgramService,
    private userService: UserService,
    private authService: AuthService,
    public loader: LoaderService,
    private toastr: ToastrService,
    private subjectService: SubjectService
  ) { 
   }

  ngOnInit(): void {
    this.getAllPrograms();
    this.getUserPrograms();
    this.getAllSubjects();
  }

  //show and get the active program id
  showIcons(id: string){
    this.activeProgram = id;
  }

  //selected program to get its subjects
  selectedProgramSubjects(program: Program){
    this.selectedProgram = program;
  }
  //selected user program to get its subjects
  selectedUserProgramSubjects(program: Program){
    this.selectedUserProgram = program;
  }

  //get the selected program name
  getProgramName(program: Program){
    this.userProgram.programAbbreviation = program.programAbbreviation;
    this.userProgram.programName = program.programName;
    this.userProgram.semester = program.semester;
    this.userProgram.schoolYear = program.schoolYear;
    this.userProgram.department = program.department;
  }

  //hide program if already added
  hideProgram(program: Program): Observable<boolean>{
    for(let i = 0; i < this.userPrograms.length; i++){
      if(this.userPrograms[i].programName === program.programName){
        return new Observable(obs => obs.next(false));
      }
    }
    return new Observable(obs => obs.next(true));
  }

  //get active user program name
  getActiveUserProgram(program: UserProgram){
    this.activeUserProgram = program;
  }

  //get all programs
  getAllPrograms(){
    this.programsService.getAllPrograms()
    .subscribe(
      response => {
        this.programs = response;
      }
    );
  }

  //get all subjects
  getAllSubjects(){
    this.subjectService.getAllSubjects()
    .subscribe(
      res => {
        this.subjects = res;
      }
    )
  }

  //get all user programs
  getUserPrograms(){
    this.userService.getAllPrograms(this.authService.user.id)
    .subscribe(
      response => {
        this.userPrograms = response;
        this.userProgramCount = response.length;
      }
    );
  }

  //add program
  addProgram(){
    this.userService.addProgram(this.authService.user.id, this.userProgram)
    .subscribe(
      response => {
        this.getAllPrograms();
        this.getAllSubjects();
        this.getUserPrograms();
        this.toastr.success('Added Successfully', response.programName);
      }
    );
  }

  //update program
  updateProgram(userProgram: UserProgram){
    this.userService.updateProgram(this.authService.user.id, this.activeUserProgram.id, userProgram)
    .subscribe(
      res => {
        this.getAllPrograms()
        this.getAllSubjects();
        this.getUserPrograms();
        this.toastr.success('Have been updated', 'Subjects')
      }
    )
  }

  //remove program
  removeProgram(){
    this.userService.removeProgram(this.authService.user.id, this.activeUserProgram.id)
    .subscribe(
      response => {
        this.getAllPrograms();
        this.getAllSubjects();
        this.getUserPrograms();
        this.toastr.success('Removed Successfully', response.programName);
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
        this.removeProgram();
      }
    })
  }

  openAddSubjectDialog(subjects: Subject){

    var modal = this.dialogRef.open(UserSubjectsComponent, {
      data: {
        subjects: this.subjects,
        add: true
      }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
      }else{
        this.userProgram.subjects = res.data;
        this.toastr.success('Have been added', 'Subjects')
      }
    })
  }

  openUpdateSubjectDialog(){

    var modal = this.dialogRef.open(UserSubjectsComponent, {
      data: {
        subjects: this.subjects,
        add: false
      }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
      }else{
        this.activeUserProgram.subjects = res.data;
        this.updateProgram(this.activeUserProgram);
      }
    })
  }
  
}
