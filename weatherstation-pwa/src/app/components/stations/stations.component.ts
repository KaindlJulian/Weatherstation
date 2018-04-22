import { Component, OnInit } from '@angular/core';
import { Station, Temperature } from '../../_models/index';
import { SessionsStorageService } from '../../_services/sessions-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss']
})
export class StationsComponent implements OnInit {

  constructor(
    private storageService: SessionsStorageService,
    private router: Router) { }

  // helpers for animated Modal
  private showNewStationForm: boolean;
  private moveOut: boolean;

  // display data
  model = new Station();
  stations: Station[] = new Array<Station>();

  ngOnInit() {
    this.stations = this.storageService.getStationList();
    this.showNewStationForm = false;
    this.moveOut = false;
  }

  onCallDialog() {
    this.moveOut = false;
    this.showNewStationForm = false;
    this.showNewStationForm = !this.showNewStationForm;
  }

  addStation() {
    const station = this.model;
    station.lastTemperature = new Temperature;
    station.lastUpdate = new Date();
    this.stations.push(station);
    this.storageService.addStationList(station);
    this.moveOut = true;
  }

  onOpenInDashboard(station: Station) {
    this.storageService.setDashboardStation(station);
    this.router.navigate(['dashboard']);
  }

}
