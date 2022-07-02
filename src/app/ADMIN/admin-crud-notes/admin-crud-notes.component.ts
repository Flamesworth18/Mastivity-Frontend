import { LoaderService } from 'src/app/service/loader.service';
import { ToastrService } from 'ngx-toastr';
import { NotesService } from '../../service/notes.service';
import { NotePopupComponent } from '../pop-ups/note-popup/note-popup.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-admin-crud-notes',
  templateUrl: './admin-crud-notes.component.html',
  styleUrls: ['./admin-crud-notes.component.scss']
})
export class AdminCrudNotesComponent implements OnInit {

  @ViewChild('addNotes', { static: false }) public addNoteRef !: ElementRef;

  notes: Note[] = []
  note: Note = {
    id: '',
    title: '',
    description: '',
    author: '',
    isArchived: false,
    dateCreated: '',
    dateUpdated: '',
  }
  emptyNote: Note = {
    id: '00000000-0000-0000-0000-000000000000',
    title: '',
    description: '',
    author: '',
    isArchived: false,
    dateCreated: '',
    dateUpdated: '',
  }
  notesCount = 0;
  searchNote: any;

  mode: any;

  order:string = ''
  showSortDropdown:boolean = false;
  isDescOrder:boolean = false;

  constructor(
    private dialogRef: MatDialog,
    private noteService: NotesService,
    private toastr: ToastrService,
    public loader: LoaderService) {

    }

  ngOnInit(): void {
    this.getAllNotes()
  }

  openAddNoteDialog(){
    var modal = this.dialogRef.open(NotePopupComponent, {
      data: {
        buttonPosition: this.addNoteRef,
        note: this.emptyNote,
        add: true
      }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
        this.emptyNote = {
          id: '00000000-0000-0000-0000-000000000000',
          title: '',
          description: '',
          author: '',
          isArchived: false,
          dateCreated: '',
          dateUpdated: '',
        }
      }else{
        this.addNote(res.data);
      }
    })
  }

  openUpdateNoteDialog(note: Note){
    var modal = this.dialogRef.open(NotePopupComponent, {
      data: {
        buttonPosition: this.addNoteRef,
        note: note,
        add: false
      }
    });

    modal.afterClosed().subscribe(res => {
      if(res === undefined){
        console.log("no data");
      }else{
        this.updateNote(res.data);
      }
    })
  }

  getAllNotes(){
    this.noteService.getAllNotes()
    .subscribe(
      response => {
        this.notes = response;
        this.notesCount = response.length
      }
    )
  }

  addNote(note: Note){
    this.noteService.addNote(note)
    .subscribe(
      response => {
        this.toastr.success('Added successfully', response.title);
        this.getAllNotes();
      }
    )
  }
  
  updateNote(note: Note){
    this.noteService.updateNote(note)
    .subscribe(
      response => {
        this.toastr.success('Updated successfully', response.title);
      }
    )
  }

  removeNote(id: string){
    this.noteService.removeNote(id)
    .subscribe(
      response => {
        this.toastr.success('Removed successfully', response.title);
        this.getAllNotes()
      }
    )
  }

  sortBy(value: string){
    this.isDescOrder = !this.isDescOrder;
    this.order = value;
  }

  openSortChoices(){
    this.showSortDropdown = !this.showSortDropdown;
  }
}
