  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs/Observable';
  import * as mqtt from 'mqtt';

  const MQTT_URL: String = 'wss://m23.cloudmqtt.com';

  @Injectable()
  export class MyMqttService {

    constructor() { }

    private client: mqtt.Client;

    /**
     * connect to mqtt broker via websocket connection
     */
    public connect() {
      this.client = mqtt.connect(MQTT_URL, {
        port: 33965,
        username: 'qwwegtrz',
        password: '0L9IZSeX8fMO'
      });
      console.log(this.client);
    }
    /**
     * publishes a mqtt message if there is a connection to a broker
     * message will be sent in stringified version of the object
     * @param topic topic of the sent message
     * @param message payload can be any object
     */
    public publish(topic: string, message: any) {
      if (this.client.connected) {
        this.client.publish(topic, message);
        console.log(topic, message);
      }
    }
    /**
     * subscribes the client to a mqtt topic
     * returns an observable object of the payload sent with the parameter
     * @param topic defines what the mqtt client listens for
     */
    public subscribe(topic): Observable<any> {
      this.client.subscribe(topic);
      return new Observable<any> (observer => {
        this.client.on('message', (t, payload) => {
          if (t === topic ) {
            observer.next(JSON.parse(payload.toString()));
            console.log(JSON.parse(payload.toString()));
          }
        });
      });
    }
    /**
     * disconnects the mqtt client
     */
    public disconnect() {
      if (this.client) {
        this.client.end(false, () => {
        });
      }
    }
  }
