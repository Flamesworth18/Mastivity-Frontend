import { Note } from '../models/note.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesDataService {

  constructor() {}
  private noteIsEmpty = true;
  private note: Note = {
    id: '',
    title: '',
    description: '',
    author: '',
    isArchived: false,
    dateCreated: '',
    dateUpdated: Date.now.toString()
  };

  private _addEdit = new BehaviorSubject<boolean>(false);
  getAddEditSource = this._addEdit.asObservable();

  private _noteIsEmpty = new BehaviorSubject(this.noteIsEmpty);
  getIsEmptySource = this._noteIsEmpty.asObservable();

  private _note = new BehaviorSubject(this.note);
  getNoteSource = this._note.asObservable();

  createNote(value: boolean){
    this._addEdit.next(value);
  }

  isEmpty(value: boolean){
    this._noteIsEmpty.next(value);
  }

  setNote(value: Note){
    this._note.next(value);
  }


  activateMethods(): Observable<any>{
    return this._addEdit.asObservable();
  }

}
