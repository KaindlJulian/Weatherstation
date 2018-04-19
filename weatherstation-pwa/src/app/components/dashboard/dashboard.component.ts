import { Component, OnInit, TemplateRef } from '@angular/core';
import { Station } from '../../_models/index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() {}

  station: Station;

  ngOnInit() {
    // get selected station from stationservice
    // subscribe to related topics via mqtt service observables
  }


}
