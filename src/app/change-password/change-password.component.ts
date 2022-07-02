import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Reset } from '../models/reset.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  reset: Reset = {
    token: '',
    password: '',
    confirmPassword: '',
  }

  token: string = '';

  show:boolean = false;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    
    this.token = sessionStorage.getItem('password-token') || '';
  }

  resetPasswordForm = new FormGroup({
    token: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  resetPasswordSubmitted(){
    this.reset.token = this.resetPasswordForm.get('token')?.value;
    this.reset.password = this.resetPasswordForm.get('password')?.value;
    this.reset.confirmPassword = this.resetPasswordForm.get('confirmPassword')?.value;

    this.auth.requestChangePassword(this.reset);
  }

  get Token(): FormControl{
    return this.resetPasswordForm.get('token') as FormControl;
  }

  get Password(): FormControl{
    return this.resetPasswordForm.get('password') as FormControl;
  }

  get ConfirmPassword(): FormControl{
    return this.resetPasswordForm.get('confirmPassword') as FormControl;
  }

  confirmPassword(){
    var password = this.resetPasswordForm.get('password')?.value;
    var confirmPassword = this.resetPasswordForm.get('confirmPassword')?.value;
    return password !== confirmPassword ? true: false;
  }

}
