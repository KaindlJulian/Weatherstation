import { Component, OnInit, Input } from '@angular/core';
import { Station } from '../../_models/index';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'station-data',
  templateUrl: './station-data.component.html',
  styleUrls: ['./station-data.component.scss']
})
export class StationDataComponent implements OnInit {

  @Input() station: Station;

  constructor() { }

  ngOnInit() {
  }

}
