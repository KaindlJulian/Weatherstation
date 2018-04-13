import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Station } from '../../_models';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit {

  constructor() { }

  @Output() updateStation: EventEmitter<Station> = new EventEmitter();

  ngOnInit() {
  }

  updateButton(): void {
    this.updateStation.emit();  // act. station
  }
}
