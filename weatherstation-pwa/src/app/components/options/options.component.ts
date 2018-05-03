import { Component, OnInit } from '@angular/core';
import { SessionsStorageService } from '../../_services/sessions-storage.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  notificationStatus: String;
  tempUnit: String;

  constructor(private storageService: SessionsStorageService) { }

  ngOnInit() {
    this.notificationStatus = this.storageService.getNotificationStatus();
    this.tempUnit = this.storageService.getTemperatureUnit();
  }

  private changeUnit(unit: String) {
    this.tempUnit = unit;
    this.storageService.setTemperatureUnit(unit);
  }
}
