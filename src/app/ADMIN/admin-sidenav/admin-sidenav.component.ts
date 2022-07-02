import { CounterService } from './../../service/counter.service';
import { adminNavData } from './admin-nav-data';
import { AuthService } from 'src/app/service/auth.service';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output, Renderer2 } from '@angular/core';
import { Counter } from 'src/app/models/counter.model';

interface SideNavToggle{
  screenWidth: number,
  collapsed: boolean
}

type NewType = EventEmitter<SideNavToggle>;

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrls: ['./admin-sidenav.component.scss'],
  animations: [
    trigger('textFadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('250ms', 
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('150ms', 
          style({opacity: 0})
        )
      ])
    ]),
    trigger('iconFadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('3300ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('100ms',
          style({opacity: 0})
        )
      ])
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms', 
          keyframes([
            style({transform: 'rotate(0deg)', offset: 0}),
            style({transform: 'rotate(2turn)', offset: 1})
          ])
        )
      ]),
    ])
  ]
})
export class AdminSidenavComponent implements OnInit {

  counter: Counter = {
    id: '',
    count: 0,
    overallCount: 0,
    onlineCount: 0
  }

  constructor(
    private authService: AuthService,
    private counterService: CounterService
  ) {}

  ngOnInit(): void {

    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleSidenav.emit({
        collapsed: this.collapsed, screenWidth: this.screenWidth
      });
    }else if(this.screenWidth >768){
      this.collapsed = true;
      this.onToggleSidenav.emit({
        collapsed: this.collapsed, screenWidth: this.screenWidth
      });
    }

    this.getCounter();
  }

  @HostListener('window:resize', ['$event']) onResize(event: any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleSidenav.emit({
        collapsed: this.collapsed, screenWidth: this.screenWidth
      });
    }else if(this.screenWidth >768){
      this.collapsed = true;
      this.onToggleSidenav.emit({
        collapsed: this.collapsed, screenWidth: this.screenWidth
      });
    }
  }

  @Output() onToggleSidenav: NewType = new EventEmitter();

  screenWidth = 0;
  collapsed = true;
  showDropdown = false;
  navData = adminNavData;
  logout = {
    routeLink: 'logout',
    icon: 'bx bx-log-out',
    label: 'Logout'
  }
  showTasks:boolean = false;

  toggleCollapsed() : void{
    this.collapsed = !this.collapsed;
    this.onToggleSidenav.emit({
      collapsed: this.collapsed, screenWidth: this.screenWidth
    })
  }

  closeSidenav() : void{
    this.collapsed = false;
    this.onToggleSidenav.emit({
      collapsed: this.collapsed, screenWidth: this.screenWidth
    })
  }

  logoutUser(){
    sessionStorage.setItem("counted", JSON.stringify(false));
        setTimeout( () => {     
          this.authService.logoutUser();
          this.counterService.setUserNotCounted();
    }, 500 );
  }


  showTaskDropDown(){
    this.showTasks = true;
  }
  hideTaskDropDown(){
    this.showTasks = false;
  }

  getCounter(){
    this.counterService.getAllCounter()
    .subscribe(
      res => {
        this.counter = res[0];
      }
    )
  }
}
