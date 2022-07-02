import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  constructor(private auth: AuthService) { 

    localStorage.clear();
    auth.isUserLoggedIn();
    auth.isAdminLoggedIn()

  }

  ngOnInit(): void {
  }

  
  login: Login = {
    username: '',
    password: ''
  }

  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  loginSubmitted(){

    this.login.username = this.loginForm.get('username')?.value;
    this.login.password = this.loginForm.get('password')?.value;

    this.auth.loginRequest(this.login);
  }

  get Username(): FormControl{
    return this.loginForm.get('username') as FormControl;
  }

  get Password(): FormControl{
    return this.loginForm.get('password') as FormControl;
  }
}
