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

  constructor(
    private storageService: SessionsStorageService,
    private mqttService: MyMqttService) {}

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

    Notification.requestPermission((status) => {
      console.log(`notification permission: ${status}`);
      if (status === 'granted') {
        if (this.storageService.getNotificationStatus() !== status) {

          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification('Welcome!', {
              icon: '../../assets/pwa-icons/icon-512x512.png',
              dir: 'auto',
              body: 'We will let you know when something important happens.',
              tag: 'welcome-message'
            });
          });

          this.storageService.setNotificationStatus('granted');
        }
      }
    });
  }

  /**
   * publish mqtt messge to update current station
   */
  updateDashboard(event: any) {
    const actStation = this.storageService.getDashboardStation();
    this.mqttService.publish('/station/' + actStation.name + '/update', {
      interval: '10s',
    });
    console.log(`station "${actStation.name}" updated`);
  }
}
