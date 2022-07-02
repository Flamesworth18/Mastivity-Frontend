import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private readonly roleURL = 'https://mastivityapp.azurewebsites.net/api/role';

  constructor(private http: HttpClient) { }

  //get all roles
  getAllRole():Observable<Role[]>{
    return this.http.get<Role[]>(this.roleURL);
  }

  //Add role
  addRole(role: Role): Observable<Role>{
    role.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Role>(this.roleURL, role);
  }

  //Remove note
  removeRole(id: string): Observable<Role>{
    return this.http.delete<Role>(this.roleURL + "/" + id);
  }

  //Edit role
  updateRole(role: Role): Observable<Role>{
    return this.http.put<Role>(this.roleURL + "/" + role.id, role);
  }
}
