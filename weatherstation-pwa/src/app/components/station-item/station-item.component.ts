import { Component, OnInit, Input } from '@angular/core';
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

  ngOnInit() {
  }

  openDashboard() {
    // save selected station in local storage
    this.router.navigate(['dashboard']);
  }
}
