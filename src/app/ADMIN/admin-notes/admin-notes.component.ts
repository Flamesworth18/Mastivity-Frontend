import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Note } from 'src/app/models/note.model';
import { AuthService } from 'src/app/service/auth.service';
import { LoaderService } from 'src/app/service/loader.service';
import { UserService } from 'src/app/service/user.service';
import { NotesDataService } from 'src/app/service/userNotes.service';

@Component({
  selector: 'app-admin-notes',
  templateUrl: './admin-notes.component.html',
  styleUrls: ['./admin-notes.component.scss']
})
export class AdminNotesComponent implements OnInit {

  notes: Note[] = [];
  note: Note = {
    id: '',
    title: '',
    description: '',
    author: '',
    isArchived: false,
    dateCreated: '',
    dateUpdated: Date.now.toString()
  };
  noteCount = 0;
  noteIsEmpty: boolean = false;
  addEditService: boolean = false;
  addEdit:boolean = false;
  activeNote:string = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    public notesDataService: NotesDataService,
    private toastr: ToastrService,
    public loader: LoaderService) {
      var isEmpty = sessionStorage.getItem("noteIsEmpty");
      if(isEmpty != null){
        this.notesDataService.isEmpty(JSON.parse(isEmpty));
      }

      let canAdd = JSON.parse(sessionStorage.getItem("addNote") || 'false')
      if(canAdd){
        this.addEdit = true;
      }

      this.notesDataService.getAddEditSource.subscribe(addEdit => this.addEditService = addEdit)
      this.notesDataService.getIsEmptySource.subscribe(notesIsEmpty => this.noteIsEmpty = notesIsEmpty);
      this.notesDataService.getNoteSource.subscribe(note => this.note = note);
      
      this.notesDataService.activateMethods().subscribe(() => {
        this.resetNote();
        this.showIcons(this.note.id)
      });
  }

  ngOnInit(): void {
    this.getAllNotes(this.note);

  }

  ngOnDestroy(): void{
    sessionStorage.setItem("addNote", 'false');
    this.notesDataService.createNote(false);

    var count = sessionStorage.getItem("noteCount");
    if(count != null){
      if(JSON.parse(count) === 0){
        this.notesDataService.isEmpty(true);
        sessionStorage.setItem("noteIsEmpty", JSON.stringify(true));
      }else{
        this.notesDataService.isEmpty(false);
        sessionStorage.setItem("noteIsEmpty", JSON.stringify(false));
      }
    }
  }

  resetNote(){
    if((this.addEditService || this.addEdit)){
      this.note = {
        id: '',
        title: '',
        description: '',
        author: '',
        isArchived: false,
        dateCreated: '',
        dateUpdated: Date.now.toString()
      };
    }
  }

  populateForm(note: Note){
    this.note = note;
  }

  showIcons(id: string){
    this.activeNote = id;
  }

  onSubmit(){
    if(this.note.id === ''){
      this.addNote();
    }else{
      this.updateNote(this.note);
    }
  }

  getAllNotes(note: Note){
    this.userService.getAllNotes(this.authService.user.id)
    .subscribe(
      response => {

        this.notes = response;
        this.noteCount = this.notes.length;
        
        if(response.length === 0){
          this.notesDataService.isEmpty(true);
          sessionStorage.setItem("noteCount", JSON.stringify(response.length));
        }else{

          this.notesDataService.isEmpty(false);
          sessionStorage.setItem("noteCount", JSON.stringify(response.length));
          this.notesDataService.createNote(false);

          if(this.note.id === "" && !this.addEdit){
            this.populateForm(this.notes[0]);
            this.showIcons(this.notes[0].id);
          }else{
            this.populateForm(note);
            this.showIcons(note.id);
          }
          
        }

        sessionStorage.setItem('addNote', 'false');
        
      }
    );
  }

  addNote(){
    this.note.author = this.authService.user.firstname;
    this.note.dateUpdated = Date.now.toString();
    this.userService.addNote(this.authService.user.id , this.authService.user.firstname, this.note)
    .subscribe(
      response => {
        this.note = response;
        this.getAllNotes(response);

        this.toastr.success('Saved Successfully', response.title );
      }
    );
  }

  updateNote(note: Note){
    note.dateUpdated = Date.now.toString();
    this.userService.updateNote(this.authService.user.id ,note)
    .subscribe(
      response => {
        this.note = response;
        this.getAllNotes(response);
        this.toastr.success('Updated Successfully', 'Note' );
      }
    );
  }

  onRemove(){
    this.userService.removeNote(this.authService.user.id ,this.note)
    .subscribe(
      response => {
        this.getAllNotes(response);

        this.note = {
          id: '',
          title: '',
          description: '',
          author: '',
          isArchived: false,
          dateCreated: '',
          dateUpdated: Date.now.toString()
        };

        this.toastr.success('Removed Successfully', response.title );
      }
    );
  }

  createNote(): void{
    sessionStorage.setItem("addNote", 'true');
    this.notesDataService.createNote(true);
    this.notesDataService.activateMethods();
  }
}
