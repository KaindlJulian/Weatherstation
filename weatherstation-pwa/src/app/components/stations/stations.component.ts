import { Component, OnInit } from '@angular/core';
import { Station } from '../../_models/index';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss']
})
export class StationsComponent implements OnInit {

  constructor() { }

  private showNewStationForm: boolean;
  private moveOut: boolean;

  model = new Station();
  stations: Station[] = [];

  ngOnInit() {
    this.showNewStationForm = false;
    this.moveOut = false;
  }

  onCallDialog() {
    this.moveOut = false;
    this.showNewStationForm = false;
    this.showNewStationForm = !this.showNewStationForm;
  }

  addStation() {
    // subscribe to related topics 

    this.moveOut = true;
  }

}
