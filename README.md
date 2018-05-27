# Weatherstation
4BHIF NVS MQTT


## Clients

Web: https://young-mountain-58538.herokuapp.com/

PWA: https://weatherstation-pwa.firebaseapp.com/

## MQTT
### Broker
Online Broker URL `m23.cloudmqtt.com`

| Protocol | Ports  | 
|---|---|
| TCP  | 13965  |
| SSL  |  23965 |
| Websocket (TLS)  | 33965 |

### Topics
**Sensor**
```xml
/station/<stationName>/temperature/
/station/<stationName>/air/pressure/
/station/<stationName>/air/purity/
/station/<stationName>/air/toxicity/
/station/<stationName>/air/humidity/
/station/<stationName>/wind/direction
/station/<stationName>/wind/strength
/station/<stationName>/precipitation/type/
/station/<stationName>/precipitation/amount/
```
**Controller**
```xml
/report/daily
/report/daily/<stationName>
/report/monthly
/report/monthly/<stationName>
/report/yearly
/report/yearly/<stationName>
```

### JSON Message
``` js
{
	"id": "MESSAGE_TYPE",
	"date": "Thu May 24 21:34:51 CEST 2018",
	"value" [value]
}
```
