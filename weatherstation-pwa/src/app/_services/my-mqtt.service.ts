import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Temperature } from '../_models/temperature';
import * as mqtt from 'mqtt';

const MQTT_URL: String = 'ws://test.mosquitto.org';

@Injectable()
export class MyMqttService {

  constructor() { }

  private client: mqtt.Client;
  private state: String;

  public connect() {
    this.client = mqtt.connect(MQTT_URL, {
      port: 8080,
    });
    this.state = 'CONNECTED';
    console.log(this.client);
  }

  public publish(topic: string, message: any) {
      this.client.publish(topic, JSON.stringify(message));
      console.log(JSON.stringify(message));
  }

  // subscribe to topic and return obs
  public subscribe(topic): Observable<any> {
    this.client.subscribe(topic);
    return new Observable<any> (observer => {
      this.client.on('message', (t, payload) => {
        observer.next(payload.toString());
        console.log(payload.toString());
      });
    });
  }

  public disconnect() {
    if (this.client) {
      this.client.end(false, () => {
        this.state = 'CLOSED';
      });
    }
  }
}
