import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubUser } from '../models/subUser.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RequestUserService {

  readonly userURL = "https://mastivityapp.azurewebsites.net/api/requestuser/";

  constructor(
    private http: HttpClient
  ) { }

  //get all request user
  getAllRequestUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.userURL);
  }

  //add request user
  addRequestUser(user: SubUser): Observable<User>{
    user.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<User>(this.userURL, user);
  }

  //edit request user
  updateRequestUser(user: User): Observable<User>{
    return this.http.put<User>(this.userURL + user.id, user);
  }

  //remove request user
  removeRequestUser(id: string): Observable<User>{
    return this.http.delete<User>(this.userURL + id);
  }

  //remove request user
  removeRequestUsers(users: User[]){
    return this.http.post(this.userURL + "Users", users);
  }
}
