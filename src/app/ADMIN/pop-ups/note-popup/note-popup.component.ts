import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-note-popup',
  templateUrl: './note-popup.component.html',
  styleUrls: ['./note-popup.component.scss']
})
export class NotePopupComponent implements OnInit{

  note: Note = {
    id: '',
    title: '',
    description: '',
    author: '',
    isArchived: false,
    dateCreated: '',
    dateUpdated: '',
  }

  constructor(
    private dialogRef: MatDialogRef<NotePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 

      this.note = data.note;
  }

  ngOnInit(): void {
    const matDialogConfig = new MatDialogConfig()
    const rect: DOMRect = this.data.buttonPosition.nativeElement.getBoundingClientRect();

    matDialogConfig.position = { right: `65px`, top: `${rect.bottom + 2}px` }
    this.dialogRef.updatePosition(matDialogConfig.position)
  }

  addEditNote(){

    this.dialogRef.close({ data: this.note });
  }

}
