import { TotalService } from './../../service/total.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Total } from 'src/app/models/total.model';

@Component({
  selector: 'app-admin-charts',
  templateUrl: './admin-donutChart.component.html',
  styleUrls: ['./admin-donutChart.component.scss']
})
export class AdminDonutChartComponent implements OnInit {

  totals: Total = {
    id: '',
    userCount: 0,
    noteCount: 0,
    todoCount: 0,
    taskCount: 0,
    programCount: 0,
    subjectCount: 0,
    studentCount: 0
  }

  donutChartData: any[] = []

  orderedDonutChartData: any[] = []

  donutChart: any;

  constructor(
    private totalService: TotalService
  ) {
   }

  ngOnInit(): void {
    this.getAllTotals();
  }

  getTotalDonutChartData(){

    this.donutChartData = [
      {
        name: 'user',
        y: this.totals.userCount,
        color: '#84e3c8'
      },
      {
        name: 'note',
        y: this.totals.noteCount,
        color: '#a8e6cf'
      },
      {
        name: 'to-do',
        y: this.totals.todoCount,
        color: '#dcedc1'
      },
      {
        name: 'task',
        y: this.totals.taskCount,
        color: '#ffd3b6'
      },
      {
        name: 'program',
        y: this.totals.programCount,
        color: '#ffaaa5'
      },
      {
        name: 'subject',
        y: this.totals.subjectCount,
        color: '#ff8b94'
      },
      {
        name: 'student',
        y: this.totals.studentCount,
        color: '#ff7480'
      },
    ]
    
    this.orderDonutChartData();


    return this.totals.userCount + this.totals.noteCount + this.totals.todoCount +
    this.totals.taskCount + this.totals.programCount + this.totals.subjectCount + this.totals.studentCount;
    
  }

  orderDonutChartData(){
    this.orderedDonutChartData = this.donutChartData.sort((a,b) => a['y'] - b['y'])
    for(let i = 0; i < this.orderedDonutChartData.length; i++){
      this.orderedDonutChartData[i].y = i;
    }
  }

  getAllTotals(){
    this.totalService.getTotals()
    .subscribe(
      response => {
        this.totals = response;
        this.getTotalDonutChartData();
        
        this.donutChart = new Chart(
          {
            chart: {
              type: 'pie',
              plotShadow: false,
            },
            credits: {
              enabled: false,
            },
            plotOptions: {
              pie: {
                innerSize: '99%',
                borderWidth: 40,
                borderColor: '',
                slicedOffset: 20,
                dataLabels: {
                  connectorWidth: 0,
                },
              },
            },
            title: {
              verticalAlign: 'middle',
              floating: true,
              text: this.getTotalDonutChartData().toString() + ' Total of Data',
            },
            legend: {
              enabled: false,
            },
            series: [
              {
                type: 'pie',
                data: this.orderedDonutChartData,
              },
            ],
          }
        )
      }
    )
  }
}
