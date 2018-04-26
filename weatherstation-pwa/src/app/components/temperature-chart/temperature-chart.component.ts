import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { SessionsStorageService } from '../../_services/sessions-storage.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'temperature-chart',
  templateUrl: './temperature-chart.component.html',
  styleUrls: ['./temperature-chart.component.scss']
})
export class TemperatureChartComponent implements OnInit {

  chart: Chart = [];
  private labels: String[] = [];
  private dataset: Number[] = [];

  constructor(private storageService: SessionsStorageService) { }

  ngOnInit() {

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['shift', 'NaN', 'NaN', 'NaN', 'NaN', 'NaN'],
        datasets: [
          {
            data: [0, 0, 0 , 0,  0, 0],
            label: 'temp',
            borderColor: '#ffffff',
            borderWidth: 1.1,
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
              fontColor: '#fffff',
              drawTicks: false,
              suggestedMin: 2
            },
            gridLines: {
              display: false
            }
          }]
        }
      }
    });

    Chart.defaults.global.defaultFontColor = 'white';

    this.storageService.chartLabel.subscribe(label => {
      this.chart.data.labels.shift();
      this.chart.data.labels.push(label);
      this.chart.update();
    });

    this.storageService.chartData.subscribe(data => {
      this.chart.data.datasets.forEach( dataset => {
        dataset.data.shift();
      });
      this.chart.data.datasets.forEach( dataset => {
        dataset.data.push(data);
      });
      this.chart.update();
    });

  }
}
