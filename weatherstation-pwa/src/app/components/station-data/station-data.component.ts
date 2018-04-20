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
  private station: Station;
  private temperature = new Temperature();
  private wind = new Wind();
  private air = new Air();
  private precipitation = new Precipitation();
  private direction_path = 'assets/weather/wind-directions/N.svg';

  constructor(
    private storageService: SessionsStorageService,
    private mqttService: MyMqttService) { }

  ngOnInit() {
    this.station = this.storageService.getDashboardStation();
    if (!this.station) {
      this.station = new Station();
      this.station.name = 'sensor1';
    }
    // todo: if station is null and local storage is empty dashboard redirects to station-list

    this.initMqtt(this.station.name);
  }

  /**
   * connects the service to the broker and subscribes to defined topics
   * @param stationName to insert in topic when subscribing
   */
  private initMqtt(stationName: String) {
    this.mqttService.connect();
     this.mqttService.subscribe('/station/' + stationName + '/temperature/').subscribe(payload => {
      this.temperature = payload;
      this.station.lastUpdate = this.temperature.date;
      this.station.lastTemperature = this.temperature;
      this.storageService.setChartLabel(payload.date);
      this.storageService.setChartDataset(this.temperature);
    });
    this.mqttService.subscribe('/station/' + stationName + '/wind/direction/').subscribe(payload => {
      this.wind.direction = payload.value;
      this.direction_path = 'assets/weather/wind-directions/' + this.wind.direction + '.svg';
    });
    this.mqttService.subscribe('/station/' + stationName + '/wind/strength/').subscribe(payload => {
      this.wind.speed = payload.value;
    });
    this.mqttService.subscribe('/station/' + stationName + '/air/humidity/').subscribe(payload => {
      this.air.humidity = payload.value;
    });
    this.mqttService.subscribe('/station/' + stationName + '/precipitation/type/').subscribe(payload => {
      this.precipitation.type = payload.value;
    });
  }

}
