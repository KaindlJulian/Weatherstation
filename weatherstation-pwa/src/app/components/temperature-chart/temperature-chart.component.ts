import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'temperature-chart',
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.scss']
})
export class TemperatureChartComponent implements OnInit {

  chart = [];

  constructor() { }

  ngOnInit() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        datasets: [
          {
            data: [18, 20, 23, 24, 24, 25, 24],
            label: '9:00',
            borderColor: '#ffffff',
            borderWidth: 1,
            backgroundColor: '#ffffff',
            fill: false,
            lineTension: 0
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              fontColor: '#fffff',
              axis: 'y'
            },
            gridLines: {
              color: '#316aa1'
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              min: 0,
              fontColor: '#fffff',
              drawTicks: false
            },
            gridLines: {
              display: false
            }
          }]
        }
      }
    });
  }

}
