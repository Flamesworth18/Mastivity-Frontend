import { CounterService } from './counter.service';
import { Register } from './../models/register.model';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { UserToken } from './../models/userToken.model';
import { Login } from './../models/login.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Counter } from '../models/counter.model';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Forgot } from '../models/forgot.model';
import { Reset } from '../models/reset.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly accountURL = "https://mastivityapp.azurewebsites.net/api/Account";
  readonly token_name:string = "token";
  readonly refresh_token_name:string = "refreshToken"

  tokenresp: any;

  userToken: UserToken = {
    id: '',
    firstname: '',
    lastname: '',
    username: '',
    role: ''
  }

  counters: Counter[] = [];
  counter: Counter = {
    id: '8a71c987-a993-423d-9bb4-ad4b7f35c282',
    count: 0,
    overallCount: 0,
    onlineCount: 0,
  };
  datePipe: DatePipe = new DatePipe('en-US');

  role: any;

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private jwt: JwtHelperService,
    private toastr: ToastrService,
    private counterService: CounterService) 
  { 
    let token = localStorage.getItem("token");
    if(token != null){
      let decode = this.jwt.decodeToken(token);
      let role = decode['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      if(role === 'User'){
        this._isUser.next(true);
        this._isAdmin.next(false);
      }else if(role === 'Administrator'){
        this._isAdmin.next(true);
        this._isUser.next(false);
      }else{
        this._isUser.next(false);
        this._isAdmin.next(false);
      }
    } 
  }

  get user(){
    return this.userToken || '';
  }

  get token(){
    return localStorage.getItem(this.token_name) || '';
  }

  //create user
  registerUser(request: Register){
    return this.http.post(this.accountURL + '/' + 'Register', request, {
      responseType: 'text'
    });
  }

  registerRequest(request: Register){
    this.registerUser(request).subscribe(
      res => {
        this.router.navigate(['/wait-response']);
        this.toastr.success('Request sent to Administrator', 'Wait for Verification');
      },
      err => {
        this.toastr.error('Input Invalid')
      }
    );
  }

  //login user
  loginUser(request: Login){
    return this.http.post(this.accountURL + '/' + 'Login', request, {
      responseType: 'text',
    });
  }

  //request for login
  loginRequest(request: Login){
    this.loginUser(request).subscribe(
      response => {
          var decodedToken = this.jwt.decodeToken(JSON.stringify(response));
          
          this.userToken.id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
          this.userToken.firstname = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
          this.userToken.lastname = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'];
          this.userToken.username = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
          this.userToken.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

          localStorage.setItem(this.token_name, response);

          console.log(this.userToken)

          this.getCounter();

          if(this.userToken.role === 'User'){
            this.router.navigate(['/home']);
            this._isUser.next(true);
            this._isAdmin.next(false);
          }else if(this.userToken.role === 'Administrator'){
            this.router.navigate(['/dashboard']);
            this._isAdmin.next(true);
            this._isUser.next(false);
          }
      },
      error => {
        this.toastr.error('Invalid username or password')
      }
    );    
  }

  //get user role
  GetRolebyToken(token: any) {
    const decodedToken = this.jwt.decodeToken(JSON.stringify(token));
    this.userToken.id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.userToken.firstname = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
    this.userToken.lastname = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'];
    this.userToken.username = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
    this.userToken.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    return this.userToken.role;
  }

  //logout user
  sessionExpired(){
    this.toastr.error('Login again', 'Session Expired');
    localStorage.clear();
    this._isUser.next(false);
    this._isAdmin.next(false);
    this.router.navigateByUrl('/login');
  }

  //logout user
  logoutUser(){
    if(this.counter.onlineCount <= 0){
      this.counter.onlineCount = 0;
    }else{
      this.counter.onlineCount--;
    }
    this.updateCounter(this.counter);

    localStorage.clear();
    this._isUser.next(false);
    this._isAdmin.next(false);
    this.router.navigateByUrl('/login');
  }

  private _isUser = new BehaviorSubject<boolean>(false);
  isUser = this._isUser.asObservable();

  isUserLoggedIn(){
    this._isUser.next(false);
  }

  private _isAdmin = new BehaviorSubject<boolean>(false);
  isAdmin = this._isAdmin.asObservable();

  isAdminLoggedIn(){
    this._isAdmin.next(false);
  }

  getTime(){
    var time = new Date();
    var transformTime = this.datePipe.transform(time, 'HH:mm');
    return transformTime;
  }

  getCounter(){
    this.counterService.getAllCounter()
    .subscribe(
      res => {
        this.counter = res[0];

        var time = this.getTime();
        if(time === '00:00'){
          this.counter.count = 0;
        }

        res[0].count++;
        res[0].overallCount++;
        res[0].onlineCount++;
        this.updateCounter(res[0]);
      }
    )
  }

  updateCounter(counter: Counter){
    this.counterService.updateCounter(counter)
    .subscribe(
      res => {
        this.counter = res
      }
    )
  }
  
  //forgot user password
  forgotPassword(email: Forgot){
    return this.http.post(this.accountURL + '/' + 'forgot-password', email,  {
      responseType: 'text',
    });
  }

  //request forgot user password
  requestForgotPassword(email: Forgot){
    this.forgotPassword(email)
    .subscribe(
      res => {
        sessionStorage.setItem('password-token', res);
        this.router.navigate(['/change-password']);
      },
      err => {
        this.toastr.error("is invalid", 'Email');
      }
    )
  }

  changePassword(reset: Reset){
    return this.http.post(this.accountURL + '/' + 'reset-password', reset, {
      responseType: 'text',
    })
  }

  requestChangePassword(reset: Reset){
    this.changePassword(reset)
    .subscribe(
      res => {
        Swal.fire({
          title: "Congratulations!",
          text: "Your password has been reset successfully",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Login",
        }).then((result) => {
          if(result.value){
            this.router.navigate(['/login'])
          }
        })

        sessionStorage.setItem('password-token', '')
      },
      err => {
        console.log(err)
        this.toastr.error("Request Timeout");
      }
    )
  }
}
