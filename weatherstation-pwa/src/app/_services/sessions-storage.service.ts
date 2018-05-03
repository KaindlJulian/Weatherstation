import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Station, Temperature } from '../_models/index';
import 'rxjs/add/observable/of';
import { Subject } from 'rxjs/Subject';
import { stat } from 'fs';

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
    if (JSON.parse(localStorage.getItem('stations'))) {
      this.stationList = JSON.parse(localStorage.getItem('stations'));
    }
    if (!this.stationList.some(someStation => someStation.name === station.name)) {
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

  /**
   * sets notification permission
   * @param status granted | denied | default
   */
  public setNotificationStatus(status: String) {
    localStorage.setItem('notification-permission', status.toString());
    console.log(`Notification permission: ${status}`);
  }

  /**
   * returns set notification permission
   */
  public getNotificationStatus(): String {
    return localStorage.getItem('notification-permission');
  }

  /**
   * sets temp unit
   * @param unit °C | °F | K
   */
  public setTemperatureUnit(unit: String) {
    localStorage.setItem('tempUnit', unit.toString());
    console.log(`Temperature unit: ${unit}`);
  }

  /**
   * return set temp unit
   */
  public getTemperatureUnit(): String {
    return localStorage.getItem('tempUnit');
  }
}
