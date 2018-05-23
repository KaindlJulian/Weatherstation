import mqtt from 'mqtt'

export default class MQTTService{

    constructor(){
        this.client = mqtt.connect('wss://m23.cloudmqtt.com:33965',{
            username: 'qwwegtrz',
            password: '0L9IZSeX8fMO',
            resubscribe : false
          })
    }
    subscribeTopic(topic) {
        this.client.subscribe(topic)
    }
    unsubscribeTopic(topic) {
        this.client.unsubscribe(topic)
    }
    exit(){
        this.client.end()
    }

    get instance(){
        return this.client
    }
}