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

  private stationList = new Array<Station>();

  /**
   * save current station to local storage
   * @param station the station to save
   */
  public setDashboardStation(station: Station) {
    localStorage.setItem('dashboardStation', JSON.stringify(station));
    this.addStationList(station);
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
   * adds station to the locally stored station list
   * @param station
   */
  public addStationList(station: Station) {
    if (JSON.parse(localStorage.getItem('stations')) !== null) {
      this.stationList = JSON.parse(localStorage.getItem('stations'));
    }
    if (!this.stationList.includes(station)) {
      this.stationList.push(station);
      localStorage.setItem('stations', JSON.stringify(this.stationList));
      console.log(this.stationList);
    }
  }
  /**
   * returns the locally stored station list
   */
  public getStationList(): Station[] {
    const stations = JSON.parse(localStorage.getItem('stations'));
    if (stations == null) {
      return new Array<Station>();
    } else {
      return stations;
    }
  }

  /**
   * set the observable value for the next chart label
   * @param data value displayed on chart
   */
  public setChartLabel(data: String) {
    const date = data.substr(data.indexOf(':') - 2, 3);
    this.chartLabel.next(date + '00');
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
