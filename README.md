# Weatherstation
4BHIF NVS MQTT


## Clients

Web: https://young-mountain-58538.herokuapp.com/

PWA: https://weatherstation-pwa.firebaseapp.com/

## MQTT
### Broker
Online Broker URL `m23.cloudmqtt.com`

|  | Ports  | 
|---|---|
| TCP  | 13965  |
| SSL  |  23965 |
| Websocket (TLS)  | 33965 |

### Topics
**Sensor**
```xml
/station/<name>/temperature/
/station/<name>/air/pressure/
/station/<name>/air/purity/
/station/<name>/air/toxicity/
/station/<name>/air/humidity/
/station/<name>/wind/direction
/station/<name>/wind/strength
/station/<name>/precipitation/type/
/station/<name>/precipitation/amount/
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
