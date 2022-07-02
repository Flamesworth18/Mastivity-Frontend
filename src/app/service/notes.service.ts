import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  readonly notesURL = 'https://mastivityapp.azurewebsites.net/api/note';

  //Get all notes
  getAllNotes(): Observable<Note[]>{
    return this.http.get<Note[]>(this.notesURL);
  }

  //Add note
  addNote(note: Note): Observable<Note>{
    note.id = '00000000-0000-0000-0000-000000000000';
    var now = new Date();
    note.dateCreated = now.toDateString();
    note.dateUpdated = now.toDateString();
    return this.http.post<Note>(this.notesURL, note);
  }

  //Remove note
  removeNote(id: string): Observable<Note>{
    return this.http.delete<Note>(this.notesURL + "/" + id);
  }

  //Edit note
  updateNote(note: Note): Observable<Note>{
    var now = new Date();
    note.dateUpdated = now.toDateString();
    return this.http.put<Note>(this.notesURL + "/" + note.id, note);
  }
}
