package weatherstation.simulator;

import java.io.Console;
import java.util.Scanner;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.json.JSONObject;
/**
 *
 * @author chris
 */
public class MqttPublishSample {
    static final String topicTemperature         = "/station/sensor1/temperature/";           //Topic for temperature
    static final String topicAirPressure         = "/station/sensor1/air/pressure/";          //Topic for airpressure
    static final String topicAirPurity           = "/station/sensor1/air/purity/";            //Topic for airpurity
    static final String topicAirToxicity         = "/station/sensor1/air/toxicity/";          //Topic for airtoxicity
    static final String topicAirHumidity         = "/station/sensor1/air/humidity/";          //Topic for airhumidity
    static final String topicWindDirection       = "/station/sensor1/wind/direction";         //Topic for winddirection
    static final String topicWindStrength        = "/station/sensor1/wind/strength";          //Topic for windstregth
    static final String topicPrecipitationType   = "/station/sensor1/precipitation/type/";    //Topic for precipitation type
    static final String topicPrecipitationAmount = "/station/sensor1/precipitation/amount/";  //Topic for precipitation amount
    
    public static void main(String[] args) throws MqttException, InterruptedException{

            Sensor sensor1      = new Sensor();
            String broker       = "tcp://vm61.htl-leonding.ac.at:1883";      //broker
            String clientId     = "Simulator";                               //ClientID
            MemoryPersistence persistence = new MemoryPersistence();
            
            MqttClient mqttClient = new MqttClient(broker, clientId, persistence);  //MQTTClient
            MqttConnectOptions connOpts = new MqttConnectOptions();                 //MQTTConnectionOptions
            connOpts.setCleanSession(true);
            
            System.out.println("Connecting to broker: " + broker);
            mqttClient.connect(connOpts);
            System.out.println("Connected");
            
            while(true){
                publish(sensor1, mqttClient);   //publish Method
                Thread.sleep(10000);
            }  
    }

    public static void publish(Sensor sensor, MqttClient mqttClient) throws MqttException{
        JSONObject obj = new JSONObject();
        obj.put("id","123");
        obj.put("date","12.04.2018");
        obj.put("value","20");
        
        int qos = 0;
        MqttMessage message = null;
        String content = "";
        
        content = obj.toString();
        message = new MqttMessage(content.getBytes());
        message.setQos(qos);
        mqttClient.publish(topicTemperature, message);
        
        /*
        content = sensor.getAirPressure();
        message = new MqttMessage(content.getBytes());
        message.setQos(qos);
        mqttClient.publish(topicAirPressure, message);
        
        content = sensor.getAirPurity();
        message = new MqttMessage(content.getBytes());
        message.setQos(qos);
        mqttClient.publish(topicAirPurity, message);
        
        content = sensor.getAirToxicity();
        message = new MqttMessage(content.getBytes());
        message.setQos(qos);
        mqttClient.publish(topicAirToxicity, message);
        
        content = sensor.getAirHumidity();
        message = new MqttMessage(content.getBytes());
        message.setQos(qos);
        mqttClient.publish(topicAirHumidity, message);
        
        content = sensor.getWindDirection();
        message = new MqttMessage(content.getBytes());
        message.setQos(qos);
        mqttClient.publish(topicWindDirection, message);
        
        content = sensor.getWindStrength();
        message = new MqttMessage(content.getBytes());
        message.setQos(qos);
        mqttClient.publish(topicWindStrength, message);
        
        content = sensor.getPrecipitationType();
        message = new MqttMessage(content.getBytes());
        message.setQos(qos);
        mqttClient.publish(topicPrecipitationType, message);
        
        content = sensor.getPrecipitationAmount();
        message = new MqttMessage(content.getBytes());
        message.setQos(qos);
        mqttClient.publish(topicPrecipitationAmount, message);*/
    }
    
}