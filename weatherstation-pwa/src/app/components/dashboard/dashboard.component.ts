import { Component, OnInit, TemplateRef } from '@angular/core';
import { Station, Precipitation } from '../../_models/index';
import { SessionsStorageService } from '../../_services/sessions-storage.service';
import { MyMqttService } from '../../_services/my-mqtt.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  readonly VAPID_PUBLIC_KEY = 'BCAv-JtuHDVsepT0CMr3r-iuqOQe9Mn0lH5Ue4HYdZE0AuA_X7PpqZVYJA84-QTf_2hSN847JAM6Oyfz2c_yNqI';

  constructor(
    private storageService: SessionsStorageService,
    private mqttService: MyMqttService) {}

  daytime = 'day';

  ngOnInit() {

    Notification.requestPermission((status) => {
      console.log(`notification permission: ${status}`);
      if (status === 'granted') {
        const notification = new Notification('Welcome!', {
          dir: 'auto',
          body: 'We will give you a notification when something important happens',
          icon: '../../assets/misc-icons/alert.png'
        });
      }
    });

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

  updateDashboard() {
    const actStation = this.storageService.getDashboardStation();
    this.mqttService.publish('/station/' + actStation.name + '/update', {
      interval: '10s',
    });
    console.log(`station "${actStation.name}" updated`);
  }
}
