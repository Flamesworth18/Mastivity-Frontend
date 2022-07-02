import { CounterService } from './../../service/counter.service';
import { Router } from '@angular/router';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { navbarData } from './nav-data';
import { NotesDataService } from 'src/app/service/userNotes.service';
import { TodosDataService } from 'src/app/service/userTodos.service';
import { AuthService } from 'src/app/service/auth.service';
import { Counter } from 'src/app/models/counter.model';

interface SideNavToggle{
  screenWidth: number,
  collapsed: boolean
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
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
export class SidenavComponent implements OnInit {
  public get notesDataService(): NotesDataService {
    return this._notesDataService;
  }
  public set notesDataService(value: NotesDataService) {
    this._notesDataService = value;
  }

  @ViewChild('toggleDropdown', {static: false}) toggleDropdown !: ElementRef;

  counter: Counter = {
    id: '',
    count: 0,
    overallCount: 0,
    onlineCount: 0
  }
  
  constructor(private renderer: Renderer2,
    private _notesDataService: NotesDataService,
    private todosDataService: TodosDataService,
    private router: Router,
    private authService: AuthService,
    private counterService: CounterService) { 

    this.renderer.listen('window', 'click' , (e:Event) => {
      if(!this.toggleDropdown.nativeElement.contains(e.target)){
        this.showDropdown = false;
      }
    });

  }

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

  @Output() onToggleSidenav: EventEmitter<SideNavToggle> = new EventEmitter();

  screenWidth = 0;
  collapsed = true;
  showDropdown = false;
  navData = navbarData;
  logout = {
    routeLink: 'logout',
    icon: 'bx bx-log-out',
    label: 'Logout'
  }
  showRecords:boolean = false;

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

  dropdownCollapsed() : void{
    this.showDropdown = !this.showDropdown;
  }

  //create options
  createNote(): void{
    sessionStorage.setItem("addNote", 'true');
    this.notesDataService.createNote(true);
    this.notesDataService.activateMethods();
    this.router.navigate(['/notes']);
  }

  createTodo(): void{
    sessionStorage.setItem("addTodo", 'true');
    this.todosDataService.createTodo(true);
    this.todosDataService.activateMethods();
    this.router.navigate(['/to-dos'])
  }

  createSchedule(): void{
    this.router.navigate(['/schedules'])
  }

  logoutUser(){
    var onlineCount = this.counter.onlineCount === 0 ? this.counter.onlineCount: this.counter.onlineCount - 1;
      this.counterService.updateCounter({
        id: this.counter.id,
        count: this.counter.count,
        overallCount: this.counter.overallCount,
        onlineCount: onlineCount,
      }).subscribe(res => {
        sessionStorage.setItem("counted", JSON.stringify(false));
        setTimeout( () => {     
          this.authService.logoutUser();
          this.counterService.setUserNotCounted();
         }, 1000 );
      })
  }
  

  showNavDropdown(){
    this.showRecords = !this.showRecords;
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
