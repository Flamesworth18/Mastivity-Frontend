import { AuthService } from './service/auth.service';
import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

interface SideNavToggle{
  screenWidth: number,
  collapsed: boolean
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked, OnDestroy{

  screenWidth = 0;
  isSidenavCollapsed = false;

  isUserValid = false;
  isAdminValid = false;

  constructor(
    private cdr: ChangeDetectorRef,
    public authService: AuthService){

      this.authService.isUser.subscribe(userValid => this.isUserValid = userValid);
      this.authService.isAdmin.subscribe(adminValid => this.isAdminValid = adminValid);
  }

  ngOnInit(){
  }

  ngAfterContentChecked(){
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.authService.isUserLoggedIn();
    this.authService.isAdminLoggedIn();
  }

  onToggleSidenav(data: SideNavToggle): void{
    this.screenWidth = data.screenWidth;
    this.isSidenavCollapsed = data.collapsed;
  }
}
