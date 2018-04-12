import { Component, OnInit } from '@angular/core';
import { MyMqttService } from './_services/my-mqtt.service';
import { Temperature } from './_models/temperature';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor (private mqtt: MyMqttService) { }

  private topic = 'test';
  private message = 'hi';
  private data: String;

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
