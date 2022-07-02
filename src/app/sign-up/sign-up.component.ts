import { AuthService } from 'src/app/service/auth.service';
import { Register } from './../models/register.model';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  register: Register = {
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
  }

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  signUpForm = new FormGroup({
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  registerSubmitted(){
    this.register.firstName = this.signUpForm.get('firstname')?.value;
    this.register.lastName = this.signUpForm.get('lastname')?.value;
    this.register.email = this.signUpForm.get('email')?.value;
    this.register.userName = this.signUpForm.get('username')?.value;
    this.register.password = this.signUpForm.get('password')?.value;
    this.register.confirmPassword = this.signUpForm.get('confirmPassword')?.value;

    this.auth.registerRequest(this.register);
  }

  get FirstName(): FormControl{
    return this.signUpForm.get('firstname') as FormControl;
  }

  get LastName(): FormControl{
    return this.signUpForm.get('lastname') as FormControl;
  }

  get Email(): FormControl{
    return this.signUpForm.get('email') as FormControl;
  }

  get Username(): FormControl{
    return this.signUpForm.get('username') as FormControl;
  }

  get Password(): FormControl{
    return this.signUpForm.get('password') as FormControl;
  }

  get ConfirmPassword(): FormControl{
    return this.signUpForm.get('confirmPassword') as FormControl;
  }

  confirmPassword(){
    var password = this.signUpForm.get('password')?.value;
    var confirmPassword = this.signUpForm.get('confirmPassword')?.value;
    return password !== confirmPassword ? true: false;
  }
}
