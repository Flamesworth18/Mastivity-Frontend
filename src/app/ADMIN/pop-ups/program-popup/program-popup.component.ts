import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Program } from 'src/app/models/program.model';
import { Subject } from 'src/app/models/subject.model';

@Component({
  selector: 'app-program-popup',
  templateUrl: './program-popup.component.html',
  styleUrls: ['./program-popup.component.scss']
})
export class ProgramPopupComponent implements OnInit{

  subjectNumber: number = 0;
  subjects: any[] = [];

  program: Program = {
    id: '00000000-0000-0000-0000-000000000000',
    programAbbreviation: '',
    programName: '',
    semester: '',
    schoolYear: '',
    department: '',
    subjects: [{
      id: '',
      subjectName: '',
    }],
  }

  constructor(
    private dialogRef: MatDialogRef<ProgramPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.program = data.program;
      this.subjects = data.subjects;

    }

  ngOnInit(): void {
    const matDialogConfig = new MatDialogConfig()
    const rect: DOMRect = this.data.buttonPosition.nativeElement.getBoundingClientRect();

    matDialogConfig.position = { right: `65px`, top: `${rect.bottom + 2}px` }
    this.dialogRef.updatePosition(matDialogConfig.position);
    
  }

  addEditProgram(){
    this.dialogRef.close({ data: this.program });
  }

  addSubject(subject: Subject){
    this.program.subjects.push(
      {
        id: '',
        subjectName: subject.subjectName,
      }
    )
  }

  removeSubject(subject: Subject){
    for(let i = 0; i < this.program.subjects.length; i++){
      if(this.program.subjects[i].subjectName === subject.subjectName){
        this.program.subjects.splice(i, 1);
      }
    }
  }

  selectedSubject(n:number){
    this.subjectNumber = n;
  }

  hasSubject(student: Subject){
    return this.program.subjects.findIndex(x => x.subjectName === student.subjectName) > -1;
  }
}
