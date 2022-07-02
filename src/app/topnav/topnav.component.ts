import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  name:string = ''
  greet:string = ''
  hour = ''
  today = new Date();

  constructor(
    private authService: AuthService
    ) { 

    var user = this.authService.user;
    this.name = user.firstname.toLocaleUpperCase();
    this.hour = formatDate(this.today, 'HH', 'en-US');
    if (parseInt(this.hour) < 12){
      this.greet = 'GOOD MORNING! ';
    }else if (parseInt(this.hour) < 18){
      this.greet = 'GOOD AFTERNOON! ';
    }else{
      this.greet = "GOOD EVENING! ";
    }
  }

  ngOnInit(): void {
  }

}
