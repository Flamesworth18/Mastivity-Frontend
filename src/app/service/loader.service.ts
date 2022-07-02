import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public show(value: boolean){
    this._isLoading.next(value);
  }

  public hide(value: boolean){
    setTimeout( () => {
      this._isLoading.next(false);
     }, 1000 );
  }

  constructor() { }
}
