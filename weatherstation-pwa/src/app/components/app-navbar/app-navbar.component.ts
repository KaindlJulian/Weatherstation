import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SessionsStorageService } from '../../_services/sessions-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {

  constructor() { }

  @Input() isDashboard: boolean;
  @Output() addStation: EventEmitter<void> = new EventEmitter();

  ngOnInit() {
  }

  callDialog() {
    this.addStation.emit(null);
  }

}
