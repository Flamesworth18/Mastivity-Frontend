import { LoaderService } from '../service/loader.service';
import { AuthService } from '../service/auth.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  isUserValid: boolean = false;
  isAdminValid: boolean = false;

  mode: boolean = true;

  constructor(
    private authService: AuthService,
    public loader: LoaderService
    ) {

    this.authService.isUser.subscribe(userValid => this.isUserValid = userValid);
    this.authService.isAdmin.subscribe(adminValid => this.isAdminValid = adminValid);

   }

  ngOnInit(): void {
  }
  
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(): string{
    
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768 && (this.isUserValid || this.isAdminValid)){
      styleClass = 'body-trimmed';
    }else if(this.isUserValid || this.isAdminValid){
      styleClass = 'body-md-screen';
    }else if(!this.isUserValid || this.isAdminValid){
      styleClass = 'body-full-width'
    }

    return styleClass;
  }

  getLoaderClass(): string{
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768 && (this.isUserValid || this.isAdminValid)){
      styleClass = 'loader-trimmed';
    }else if(this.isUserValid || this.isAdminValid){
      styleClass = 'loader-md-screen';
    }else if(!this.isUserValid || this.isAdminValid){
      styleClass = 'loader-full-width'
    }

    return styleClass;
  }
}
