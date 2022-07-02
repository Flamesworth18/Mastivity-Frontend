import { AuthService } from './../service/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticatedGuard implements CanActivate {

  currentRole: any

  constructor(
    private jwt: JwtHelperService, 
    private router: Router,
    private service: AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      
      const token = localStorage.getItem("token");

      if(token != null && !this.jwt.isTokenExpired(token)){
        this.currentRole = this.service.GetRolebyToken(token);
        if(this.currentRole === 'User'){
          return true;
        }else{
          this.router.navigate(['']);
          this.service.isUserLoggedIn();
          return false;
        }
      }
      this.router.navigate(['']);
      this.service.isUserLoggedIn();
      return false;
    }
}
