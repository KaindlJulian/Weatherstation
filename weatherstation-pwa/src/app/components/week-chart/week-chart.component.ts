import { Component, OnInit } from '@angular/core';
import { MyMqttService } from '../../_services/my-mqtt.service';
import { SessionsStorageService } from '../../_services/sessions-storage.service';
import { Station } from '../../_models/index';

// load testdata
const testdata = require('./testdata.json');

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'week-chart',
  templateUrl: './week-chart.component.html',
  styleUrls: ['./week-chart.component.scss']
})
export class WeekChartComponent implements OnInit {

  // display values
  weekTemperatures: Array<any> = new Array();

  station: Station;

  constructor(
    private mqttService: MyMqttService,
    private storageService: SessionsStorageService) { }

  ngOnInit() {
    this.station = this.storageService.getDashboardStation();
    if (!this.station) {
      this.station = new Station();
      this.station.name = 'sensor1';
      this.storageService.setDashboardStation(this.station);
    }
    this.initChart();
    this.initMqtt(this.station.name);
  }

  private initMqtt(stationName: String) {
    this.mqttService.subscribe('/station/' + stationName + '/life/temperatures/month').subscribe( payload => {
       this.weekTemperatures = this.calculateWeeklyAvg(payload);
    });
  }

  private initChart() {
    this.weekTemperatures.push('-', '-', '-', '-');
  }

  /**
   * returns the average temperatures per week
   * @param data temperature values
   */
  private calculateWeeklyAvg(data: any): Array<any>  {
    const tempArr = data.Values;
    const displayValues = new Array();
    let tempValue = 0;

    tempArr.forEach((value, index) => {
      console.log(tempValue, value);
      tempValue += value;
      if (index % 7 === 0 && index !== 0) {
        displayValues.push(`${(tempValue / 7).toFixed(1)} °C`);
        console.log(displayValues);
        tempValue = 0;
      }
    });

    return displayValues.slice(0, 4);
  }

  test() {
    this.weekTemperatures = this.calculateWeeklyAvg(testdata);
  }
}
