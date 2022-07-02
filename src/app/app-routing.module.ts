import { WaitResponseComponent } from './wait-response/wait-response.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminSchedulesComponent } from './ADMIN/admin-schedules/admin-schedules.component';
import { AdminNotesComponent } from './ADMIN/admin-notes/admin-notes.component';
import { AdminTodosComponent } from './ADMIN/admin-todos/admin-todos.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminCrudTasksComponent } from './ADMIN/admin-crud-tasks/admin-crud-tasks.component';
import { AdminCrudStudentsComponent } from './ADMIN/admin-crud-students/admin-crud-students.component';
import { AdminCrudSubjectsComponent } from './ADMIN/admin-crud-subjects/admin-crud-subjects.component';
import { AdminCrudProgramsComponent } from './ADMIN/admin-crud-programs/admin-crud-programs.component';
import { AdminCrudSchedulesComponent } from './ADMIN/admin-crud-schedules/admin-crud-schedules.component';
import { AdminCrudNotesComponent } from './ADMIN/admin-crud-notes/admin-crud-notes.component';
import { AdminCrudTodosComponent } from './ADMIN/admin-crud-todos/admin-crud-todos.component';
import { AdminCrudUsersComponent } from './ADMIN/admin-crud-users/admin-crud-users.component';
import { AdminAuthenticatedGuard } from './guards/admin-authenticated.guard';
import { AdminDashboardComponent } from './ADMIN/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { UserAuthenticatedGuard } from './guards/user-authenticated.guard';
import { HomeComponent } from './USER/home/home.component';
import { TodosComponent } from './USER/todos/todos.component';
import { NotesComponent } from './USER/notes/notes.component';
import { SchedulesComponent } from './USER/schedules/schedules.component';
import { ProgramsComponent } from './USER/programs/programs.component';
import { SubjectsComponent } from './USER/subjects/subjects.component';
import { StudentsComponent } from './USER/students/students.component';
import { TrashComponent } from './USER/trash/trash.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  
  //user path
  {path: 'home', component: HomeComponent, canActivate: [UserAuthenticatedGuard]},
  {path: 'to-dos', component: TodosComponent, canActivate: [UserAuthenticatedGuard]},
  {path: 'notes', component: NotesComponent, canActivate: [UserAuthenticatedGuard]},
  {path: 'schedules', component: SchedulesComponent, canActivate: [UserAuthenticatedGuard]},
  {path: 'programs', component: ProgramsComponent, canActivate: [UserAuthenticatedGuard]},
  {path: 'subjects', component: SubjectsComponent, canActivate: [UserAuthenticatedGuard]},
  {path: 'students', component: StudentsComponent, canActivate: [UserAuthenticatedGuard]},
  {path: 'trash', component: TrashComponent, canActivate: [UserAuthenticatedGuard]},

  //authentication path
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'wait-response', component: WaitResponseComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verfication', component: VerifyEmailComponent},
  {path: 'change-password', component: ChangePasswordComponent},

  //admin path
  {path: 'dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthenticatedGuard]},
  {path: 'admin/crud/users', component: AdminCrudUsersComponent, canActivate: [AdminAuthenticatedGuard]},
  {path: 'admin/to-dos', component: AdminTodosComponent, canActivate: [AdminAuthenticatedGuard]},
  {path: 'admin/crud/tasks', component: AdminCrudTasksComponent, canActivate: [AdminAuthenticatedGuard]},
  {path: 'admin/notes', component: AdminNotesComponent, canActivate: [AdminAuthenticatedGuard]},
  {path: 'admin/crud/schedules', component: AdminCrudSchedulesComponent, canActivate: [AdminAuthenticatedGuard]},
  {path: 'admin/schedules', component: AdminSchedulesComponent, canActivate: [AdminAuthenticatedGuard]},
  {path: 'admin/crud/programs', component: AdminCrudProgramsComponent, canActivate: [AdminAuthenticatedGuard]},
  {path: 'admin/crud/subjects', component: AdminCrudSubjectsComponent, canActivate: [AdminAuthenticatedGuard]},
  {path: 'admin/crud/students', component: AdminCrudStudentsComponent, canActivate: [AdminAuthenticatedGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
