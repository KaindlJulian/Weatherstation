import { Component, OnInit } from '@angular/core';
import { MyMqttService } from '../../_services/my-mqtt.service';

@Component({
  selector: 'app-mqtt-client',
  templateUrl: './mqtt-client.component.html',
  styleUrls: ['./mqtt-client.component.scss']
})
export class MqttClientComponent implements OnInit {

  constructor (private mqtt: MyMqttService) { }

  topic = 'test';
  message = '';
  data: String;

  ngOnInit() {
    this.mqtt.connect();
  }

  public subscribe() {
    this.mqtt.subscribe(this.topic).subscribe(payload => {
      this.data = payload;
    });
  }

  public publish() {
    this.mqtt.publish(this.topic, this.message);
  }

}
