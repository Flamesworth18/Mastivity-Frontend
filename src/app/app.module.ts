import { LoaderInterceptorService } from './interceptor/loader-interceptor.service';
import { TokenInterceptorService } from './interceptor/token-interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from "@auth0/angular-jwt";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { ChartModule } from 'angular-highcharts';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './USER/sidenav/sidenav.component';
import { HomeComponent } from './USER/home/home.component';
import { SubjectsComponent } from './USER/subjects/subjects.component';
import { NotesComponent } from './USER/notes/notes.component';
import { SchedulesComponent } from './USER/schedules/schedules.component';
import { TrashComponent } from './USER/trash/trash.component';
import { ProgramsComponent } from './USER/programs/programs.component';
import { LoginComponent } from './login/login.component';
import { StudentsComponent } from './USER/students/students.component';
import { TopnavComponent } from './topnav/topnav.component';
import { TodosComponent } from './USER/todos/todos.component';
import { AdminSidenavComponent } from './ADMIN/admin-sidenav/admin-sidenav.component';
import { AdminDashboardComponent } from './ADMIN/admin-dashboard/admin-dashboard.component';
import { AdminCrudTodosComponent } from './ADMIN/admin-crud-todos/admin-crud-todos.component';
import { AdminCrudNotesComponent } from './ADMIN/admin-crud-notes/admin-crud-notes.component';
import { AdminCrudProgramsComponent } from './ADMIN/admin-crud-programs/admin-crud-programs.component';
import { AdminCrudSubjectsComponent } from './ADMIN/admin-crud-subjects/admin-crud-subjects.component';
import { AdminCrudUsersComponent } from './ADMIN/admin-crud-users/admin-crud-users.component';
import { AdminCrudSchedulesComponent } from './ADMIN/admin-crud-schedules/admin-crud-schedules.component';
import { AdminCrudStudentsComponent } from './ADMIN/admin-crud-students/admin-crud-students.component';
import { NotePopupComponent } from './ADMIN/pop-ups/note-popup/note-popup.component';
import { TodoPopupComponent } from './ADMIN/pop-ups/todo-popup/todo-popup.component';
import { UserPopupComponent } from './ADMIN/pop-ups/user-popup/user-popup.component';
import { ProgramPopupComponent } from './ADMIN/pop-ups/program-popup/program-popup.component';
import { SubjectPopupComponent } from './ADMIN/pop-ups/subject-popup/subject-popup.component';
import { StudentPopupComponent } from './ADMIN/pop-ups/student-popup/student-popup.component';
import { AdminCrudTasksComponent } from './ADMIN/admin-crud-tasks/admin-crud-tasks.component';
import { TasksPopupComponent } from './ADMIN/pop-ups/tasks-popup/tasks-popup.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminDonutChartComponent } from './ADMIN/admin-donutChart/admin-donutChart.component';
import { FooterComponent } from './footer/footer.component';
import { AdminAreaChartComponent } from './ADMIN/admin-area-chart/admin-area-chart.component';
import { UserSubjectsComponent } from './USER/pop-ups/user-subjects/user-subjects.component';
import { UserStudentsComponent } from './USER/pop-ups/user-students/user-students.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserStatusComponent } from './USER/pop-ups/user-status/user-status.component';
import { UserEventsComponent } from './USER/pop-ups/user-events/user-events.component';
import { UserTimeEventsComponent } from './USER/pop-ups/user-time-events/user-time-events.component';
import { SchedulePopupComponent } from './ADMIN/pop-ups/schedule-popup/schedule-popup.component';
import { OrderModule } from 'ngx-order-pipe';
import { AdminNotesComponent } from './ADMIN/admin-notes/admin-notes.component';
import { AdminTodosComponent } from './ADMIN/admin-todos/admin-todos.component';
import { AdminSchedulesComponent } from './ADMIN/admin-schedules/admin-schedules.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { WaitResponseComponent } from './wait-response/wait-response.component';
import { RequestUserPopupComponent } from './ADMIN/pop-ups/request-user-popup/request-user-popup.component';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin
]);

export function tokenGetter(){
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    TopnavComponent,
    HomeComponent,
    SubjectsComponent,
    NotesComponent,
    SchedulesComponent,
    TrashComponent,
    TodosComponent,
    ProgramsComponent,
    LoginComponent,
    StudentsComponent,
    AdminSidenavComponent,
    AdminDashboardComponent,
    AdminCrudTodosComponent,
    AdminCrudNotesComponent,
    AdminCrudProgramsComponent,
    AdminCrudSubjectsComponent,
    AdminCrudUsersComponent,
    AdminCrudSchedulesComponent,
    AdminCrudStudentsComponent,
    NotePopupComponent,
    TodoPopupComponent,
    UserPopupComponent,
    ProgramPopupComponent,
    SubjectPopupComponent,
    StudentPopupComponent,
    AdminCrudTasksComponent,
    TasksPopupComponent,
    AdminDonutChartComponent,
    FooterComponent,
    AdminAreaChartComponent,
    UserSubjectsComponent,
    UserStudentsComponent,
    SignUpComponent,
    UserStatusComponent,
    UserEventsComponent,
    UserTimeEventsComponent,
    SchedulePopupComponent,
    AdminNotesComponent,
    AdminTodosComponent,
    AdminSchedulesComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    VerifyEmailComponent,
    WaitResponseComponent,
    RequestUserPopupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["https://mastivityapp.azurewebsites.net"],
        disallowedRoutes: []
      }
    }),
    MatProgressSpinnerModule,
    MatProgressBarModule,
    Ng2SearchPipeModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    FlexLayoutModule,
    ChartModule,
    FullCalendarModule,
    OrderModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:LoaderInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
