import { Subject } from 'src/app/models/subject.model';
import { ProgramPopupComponent } from '../pop-ups/program-popup/program-popup.component';
import { ProgramService } from '../../service/program.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/service/loader.service';
import { Program } from 'src/app/models/program.model';
import { SubjectService } from 'src/app/service/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-crud-programs',
  templateUrl: './admin-crud-programs.component.html',
  styleUrls: ['./admin-crud-programs.component.scss']
})
export class AdminCrudProgramsComponent implements OnInit {

  @ViewChild('addPrograms', { static: false }) public addBtn !: ElementRef;

  programs: Program[] = []
  program: Program = {
    id: '',
    programAbbreviation: '',
    programName: '',
    semester: '',
    schoolYear: '',
    department: '',
    subjects: [],
  }
  temporaryProgram: Program = {
    id: '00000000-0000-0000-0000-000000000000',
    programAbbreviation: '',
    programName: '',
    semester: '',
    schoolYear: '',
    department: '',
    subjects: [],
  }
  programCount: number = 0;
  searchProgram: any;

  mode: any;

  subjects: Subject[] = [];

  constructor(
    private dialogRef: MatDialog,
    private programService: ProgramService,
    private toastr: ToastrService,
    public loader: LoaderService,
    private subjectService: SubjectService,) {

     }

  ngOnInit(): void {
    this.getAllPrograms();
    this.getAllSubjects();
  }

  openAddProgramDialog(){
    var modal = this.dialogRef.open(ProgramPopupComponent, {
      data: {
        buttonPosition: this.addBtn,
        program: this.temporaryProgram,
        subjects: this.subjects,
        add: true
      }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
      }else{
        this.addProgram(res.data);
        this.temporaryProgram = {
          id: '00000000-0000-0000-0000-000000000000',
          programAbbreviation: '',
          programName: '',
          semester: '',
          schoolYear: '',
          department: '',
          subjects: [],
        }
      }
    })
  }

  openUpdateProgramDialog(program: Program){
    var modal = this.dialogRef.open(ProgramPopupComponent, {
      data: {
        buttonPosition: this.addBtn,
        program: program,
        subjects: this.subjects,
        add: false
      }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
      }else{
        this.temporaryProgram = {
          id: '00000000-0000-0000-0000-000000000000',
          programAbbreviation: '',
          programName: '',
          semester: '',
          schoolYear: '',
          department: '',
          subjects: [],
        }
        this.updateProgram(res.data);
      }
    })
  }

  addProgram(program: Program){
    this.programService.addProgram(program)
    .subscribe(
      response => {
        this.toastr.success('Added successfully', response.programName);
        this.getAllPrograms();
      }
    )
  }

  updateProgram(program: Program){
    this.programService.updateProgram(program)
    .subscribe(
      response => {
        this.toastr.success('Updated successfully', response.programName);
      }
    )
  }
  
  getAllPrograms(){
    this.programService.getAllPrograms()
    .subscribe(
      response => {
        this.programs = response;
        this.programCount = response.length;
      }
    )
  }

  removeProgram(id: string){
    this.programService.removeProgram(id)
    .subscribe(
      response => {
        this.toastr.success('Removed successfully', response.programName);
        this.getAllPrograms()
      }
    )
  }

  getAllSubjects(){
    this.subjectService.getAllSubjects()
    .subscribe(
      res => {
        this.subjects = res;
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
        this.removeProgram(id);
      }
    })
  }
}
