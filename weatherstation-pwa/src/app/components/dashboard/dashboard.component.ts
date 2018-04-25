import { Component, OnInit, TemplateRef } from '@angular/core';
import { Station, Precipitation } from '../../_models/index';
import { SessionsStorageService } from '../../_services/sessions-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private storageService: SessionsStorageService) {}

  daytime = 'day';

  ngOnInit() {
    this.storageService.chartLabel.subscribe( time => {
      if (time === null) {
        this.daytime = 'day';
      } else {
        if (parseInt(time.slice(0, 2), 10) >= 6 && parseInt(time.slice(0, 2), 10) <= 18) {
          this.daytime = 'day';
        } else {
          this.daytime = 'night';
        }
      }
    });
  }
}
