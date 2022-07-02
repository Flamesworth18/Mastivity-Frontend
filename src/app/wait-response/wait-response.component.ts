import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wait-response',
  templateUrl: './wait-response.component.html',
  styleUrls: ['./wait-response.component.scss']
})
export class WaitResponseComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goBack(){
    this.router.navigate(['/login']);
  }
}
