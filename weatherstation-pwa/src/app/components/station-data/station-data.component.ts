import { Component, OnInit, Input } from '@angular/core';
import { SessionsStorageService } from './../../_services/sessions-storage.service';
import { MyMqttService } from './../../_services/my-mqtt.service';
import { Station, Temperature, Wind } from '../../_models/index';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'station-data',
  templateUrl: './station-data.component.html',
  styleUrls: ['./station-data.component.scss']
})
export class StationDataComponent implements OnInit {

  // display values
  private station: Station;
  private temperature: Temperature = new Temperature();
  private wind: Wind = new Wind();
  private direction_path = 'assets/weather/wind-directions/north.svg';

  constructor(
    private storageService: SessionsStorageService,
    private mqttService: MyMqttService) { }

  ngOnInit() {
    this.station = this.storageService.getDashboardStation();

    // for testing, ERROR: station.name is property of null
    this.station = new Station();
    // todo: if station is null and local storage is empty dashboard redirects to station-list

    this.initMqtt(this.station.name);
  }

  /**
   * connects the service to the broker and subscribes to defined topics
   * @param stationName to insert in topic when subscribing
   */
  private initMqtt(stationName: String) {
    this.mqttService.connect();
    this.mqttService.subscribe('temperature').subscribe(payload => {
      this.temperature = payload;
    });
    this.mqttService.subscribe('wind/direction').subscribe(payload => {
      this.wind.direction = JSON.parse(payload);
      this.direction_path = 'assets/weather/wind-directions/' + this.wind.direction + '.svg';
    });
    this.mqttService.subscribe('wind/speed').subscribe(payload => {
      this.wind.speed = JSON.parse(payload);
    });
  }

}
