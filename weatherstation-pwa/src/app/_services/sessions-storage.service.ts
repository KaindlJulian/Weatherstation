import { Injectable } from '@angular/core';
import { Station } from '../_models/index';

@Injectable()
export class SessionsStorageService {

  constructor() { }

  public setDashboardStation(station: Station) {
    localStorage.setItem('dashboardStation', JSON.stringify(station));
    console.log(station);
  }

  public getDashboardStation(): Station {
    const storedStation: Station = JSON.parse(localStorage.getItem('dashboardStation'));
    console.log(storedStation);
    return storedStation;
  }
}

/* todo:
save important data to localStorage
get data from localStorage to share data between components
mainly between dashboard and the stations list
e.g all stations and the current station thats displayed on the dashboard
other measurements to share between comonents
*/
