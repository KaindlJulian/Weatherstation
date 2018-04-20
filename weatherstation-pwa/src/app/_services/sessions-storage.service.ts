import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Station, Temperature } from '../_models/index';
import 'rxjs/add/observable/of';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SessionsStorageService {

  constructor() { }

  // next time to display on chart
  public chartLabel = new Subject<String>();
  // next data to display on chart
  public chartData = new Subject<Number>();

  /**
   * save current station to local storage
   * @param station the station to save
   */
  public setDashboardStation(station: Station) {
    localStorage.setItem('dashboardStation', JSON.stringify(station));
    console.log(station);
  }
  /**
   * return the current station from local storage
   */
  public getDashboardStation(): Station {
    const storedStation: Station = JSON.parse(localStorage.getItem('dashboardStation'));
    console.log(storedStation);
    return storedStation;
  }

  /**
   * set the observable value for the next chart label
   * @param data value displayed on chart
   */
  public setChartLabel(data: String) {
    const date = data.substr(data.indexOf(':') - 2, 5);
    this.chartLabel.next(date);
    console.log(this.chartLabel);
  }
  /**
   * set the observable value for the next chart temperature
   * @param temperature data displayed on chart
   */
  public setChartDataset(temperature: Temperature) {
    this.chartData.next(temperature.value);
    console.log(this.chartData);
  }
}
