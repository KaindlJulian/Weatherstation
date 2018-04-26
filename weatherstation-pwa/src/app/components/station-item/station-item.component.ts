import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { Station } from '../../_models/index';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'station-item',
  templateUrl: './station-item.component.html',
  styleUrls: ['./station-item.component.scss']
})
export class StationItemComponent implements OnInit {

  constructor(private router: Router) { }

  @Input() station: Station;
  @Output() openInDashboard: EventEmitter<Station> = new EventEmitter();

  ngOnInit() {
  }

  /**
   * emits event to open dashboard
   */
  openDashboard() {
    this.openInDashboard.emit(this.station);
  }
}
