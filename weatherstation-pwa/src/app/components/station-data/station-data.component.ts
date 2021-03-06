import { Component, OnInit, Input } from '@angular/core';
import { SessionsStorageService } from './../../_services/sessions-storage.service';
import { MyMqttService } from './../../_services/my-mqtt.service';
import { Station, Temperature, Wind, Air, Precipitation } from '../../_models/index';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'station-data',
  templateUrl: './station-data.component.html',
  styleUrls: ['./station-data.component.scss']
})
export class StationDataComponent implements OnInit {

  // display values
  public tempUnit: String = '°C';  // as default
  public temperature = new Temperature();
  public station: Station;
  public wind = new Wind();
  public air = new Air();
  public precipitation = new Precipitation();

  // path values for svgs
  public direction_path = 'assets/weather/wind-directions/N.svg';
  public type_path = 'assets/weather/static/sunny.svg';

  // popover content
  public air_humidity_content = 'Air Humidity';
  public wind_speed_content = 'Wind Speed';
  public precipitation_amount_content = 'Rain Amount';
  public wind_direction_content = 'WindDirection';

  constructor(
    private storageService: SessionsStorageService,
    private mqttService: MyMqttService) { }

  ngOnInit() {
    if (!this.storageService.getTemperatureUnit)  {
      this.tempUnit = this.storageService.getTemperatureUnit();
    }
    this.station = this.storageService.getDashboardStation();
    if (!this.station) {
      this.station = new Station();
      this.station.name = 'sensor1';
      this.storageService.setDashboardStation(this.station);
    }
    this.initMqtt(this.station.name);
  }

  /**
   * connects the service to the broker and subscribes to defined topics
   * @param stationName to insert in topic when subscribing
   */
  private initMqtt(stationName: String) {
    this.mqttService.connect();
    // temperature
    this.mqttService.subscribe('/station/' + stationName + '/temperature/').subscribe(payload => {
      this.temperature = payload;
      this.temperature.date = payload.date.split('CEST')[0];
      this.setTemperatures(payload);
    });
    // wind direction
    this.mqttService.subscribe('/station/' + stationName + '/wind/direction/').subscribe(payload => {
      this.wind.direction = payload.value;
      this.direction_path = 'assets/weather/wind-directions/' + this.wind.direction + '.svg';
    });
    // wind strength
    this.mqttService.subscribe('/station/' + stationName + '/wind/strength/').subscribe(payload => {
      this.wind.speed = payload.value;
      if (payload.value >= 90 ) {
        this.showNotification('wind speed', payload.value);
      }
    });
    // air humidity
    this.mqttService.subscribe('/station/' + stationName + '/air/humidity/').subscribe(payload => {
      this.air.humidity = payload.value;
    });
    // precipitation type
    this.mqttService.subscribe('/station/' + stationName + '/precipitation/type/').subscribe(payload => {
      this.precipitation.type = payload.value;
      this.type_path = 'assets/weather/static/' + this.precipitation.type + '.svg';
    });
    // precipitation amount
    this.mqttService.subscribe('/station/' + stationName + '/precipitation/amount/').subscribe(payload => {
      this.precipitation.amount = payload.value.slice(0, 4);
    });
  }

  /**
   * set temperatures for stored stations
   * @param payload temperature
   */
  private setTemperatures(payload: any) {
    this.station.lastUpdate = this.temperature.date;
    this.storageService.setChartLabel(payload.date);
    this.storageService.setChartDataset(this.temperature);

    if (this.station.lastTemperature) {
      if ((payload.value <= -5 || payload.value >= 35) && payload.value !== this.station.lastTemperature.value) {
        this.showNotification('temperature', payload.value);
      }
    }

    if (this.temperature !== this.station.lastTemperature) {
      this.station.lastTemperature = this.temperature;
      this.storageService.setDashboardStation(this.station);
    }
  }

  /**
   * Displays a push notification if the user granted permission.
   * @param measurement the type of warning
   * @param value the value
   */
  private showNotification(measurement: any, value: any) {
    Notification.requestPermission((status) => {
      console.log(`notification permission: ${status}`);
      if (status === 'granted') {

        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification('Alert!', {
            icon: '../../assets/misc-icons/alert.png',
            dir: 'auto',
            body: `${measurement} is at ${value} !`,
            tag: 'alert-message'
          });
        });

      }
    });
  }
}
