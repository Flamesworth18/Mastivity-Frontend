import { AuthService } from 'src/app/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Forgot } from '../models/forgot.model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgot: Forgot = {
    email: ''
  }
  
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  forgotForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  get Email(): FormControl{
    return this.forgotForm.get('email') as FormControl;
  }

  forgotPassword(){
    this.forgot.email = this.forgotForm.get('email')?.value;
    this.authService.requestForgotPassword(this.forgot);
    this.forgot.email = '';
  }
}
