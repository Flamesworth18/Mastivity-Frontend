import { UserService } from 'src/app/service/user.service';
import { CounterService } from './../../service/counter.service';
import { AfterViewInit, Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Counter } from 'src/app/models/counter.model';

@Component({
  selector: 'app-admin-area-chart',
  templateUrl: './admin-area-chart.component.html',
  styleUrls: ['./admin-area-chart.component.scss']
})
export class AdminAreaChartComponent implements AfterViewInit {

  counter: Counter = {
    id: '',
    count: 0,
    overallCount: 0,
    onlineCount: 0,
  };

  userCount = 0;

  areaChart: any;

  constructor(
    private counterService: CounterService,
    private userService: UserService
  ) {

   }
  ngAfterViewInit(): void {
    this.getAllUsers();
  }


  getCounter(){
    this.counterService.getAllCounter()
    .subscribe(
      res => {
        this.counter = res[0];

        
        this.areaChart = new Chart(
          {
            chart: {
              styledMode: true,
            },
            plotOptions: {
              series: {
                marker: {
                  enabled: false,
                },
              },
            },
            legend: {
              enabled: false,
            },
            credits: {
              enabled: false,
            },
            title: {
              text: 'User Activity',
            },
            yAxis: {
              visible: false,
            },
          
            xAxis: {
              visible: false,
          
              categories: [
                'Users',
                'Watches',
                'Visits',
                'Online',
              ],
            },
          
            defs: {
              gradient0: {
                tagName: 'linearGradient',
                id: 'gradient-0',
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
                children: [
                  {
                    tagName: 'stop',
                    offset: 0,
                  },
                  {
                    tagName: 'stop',
                    offset: 1,
                  },
                ],
              },
            } as any,
          
            series: [
              {
                color: 'red',
                type: 'areaspline',
                keys: ['y', 'selected'],
                data: [
                  [this.userCount, false],
                  [this.counter.count, false],
                  [this.counter.overallCount, false],
                  [this.counter.onlineCount, false]
                ],
              },
            ],
          }
        )
      }
    )
  }

  getAllUsers(){
    this.userService.getAllUsers()
    .subscribe(
      res => {
        this.userCount = res.length;
        this.getCounter();
      }
    )
  }
}
