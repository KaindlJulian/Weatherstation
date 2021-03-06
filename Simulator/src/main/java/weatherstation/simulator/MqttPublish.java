package weatherstation.simulator;

import java.io.Console;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Scanner;
import java.util.TimeZone;
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
public class MqttPublish {
    static final String topicTemperature         = "/station/sensor1/temperature/";           //Topic for temperature
    static final String topicAirPressure         = "/station/sensor1/air/pressure/";          //Topic for airpressure
    static final String topicAirPurity           = "/station/sensor1/air/purity/";            //Topic for airpurity
    static final String topicAirToxicity         = "/station/sensor1/air/toxicity/";          //Topic for airtoxicity
    static final String topicAirHumidity         = "/station/sensor1/air/humidity/";          //Topic for airhumidity
    static final String topicWindDirection       = "/station/sensor1/wind/direction/";        //Topic for winddirection
    static final String topicWindStrength        = "/station/sensor1/wind/strength/";         //Topic for windstregth
    static final String topicPrecipitationType   = "/station/sensor1/precipitation/type/";    //Topic for precipitation type
    static final String topicPrecipitationAmount = "/station/sensor1/precipitation/amount/";  //Topic for precipitation amount
    static Calendar optionalDate = null;
    
    //Configuration for optional Date if you want to start from a optional date
    static final int day = 1;
    static final int month = 5;
    static final int year = 2018;
    static final int hour = 0;
    static final int minute = 0;
    static final int second = 0;
    //static final DateFormat df = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
    
    public static void main(String[] args) throws MqttException, InterruptedException{

            Sensor sensor1      = new Sensor();                                       //sensor
            String broker       = "tcp://m23.cloudmqtt.com:13965";                    //broker tcp://vm61.htl-leonding.ac.at:1883 tcp://test.mosquitto.org:1883
            String clientId     = "Simulator";                                        //ClientID
            MemoryPersistence persistence = new MemoryPersistence();
            
            MqttClient mqttClient = new MqttClient(broker, clientId, persistence);    //MQTTClient
            MqttConnectOptions connOpts = new MqttConnectOptions();                   //MQTTConnectionOptions
            connOpts.setUserName("qwwegtrz");
            connOpts.setPassword("0L9IZSeX8fMO".toCharArray());
            connOpts.setCleanSession(true);
            
            System.out.println("Connecting to broker: " + broker);
            mqttClient.connect(connOpts);
            System.out.println("Connected");
            int count = 0;                                                             //counter for the hour of the day
            
            optionalDate = Calendar.getInstance(TimeZone.getTimeZone("CET"));
            optionalDate.set(Calendar.DATE, day);
            optionalDate.set(Calendar.MONTH, month);
            optionalDate.set(Calendar.YEAR, year);
            optionalDate.set(Calendar.HOUR_OF_DAY, hour);
            optionalDate.set(Calendar.MINUTE, minute);
            optionalDate.set(Calendar.SECOND, second);
            
            while(true){
                count += publish(sensor1, mqttClient, count);                          //publish Method
                Thread.sleep(10000);
            }
    }

    //method which publishes all senore values
    public static int publish(Sensor sensor, MqttClient mqttClient, int count) throws MqttException{
        Calendar actDateTime = Calendar.getInstance(TimeZone.getTimeZone("CET"));       //Calendar
        //actDateTime.set(Calendar.HOUR_OF_DAY, count);
        
        //optional date to start from fixed date
        optionalDate.set(Calendar.HOUR_OF_DAY, count);
        actDateTime = optionalDate;
        
        
        System.out.println(actDateTime.get(Calendar.HOUR_OF_DAY));
        
        int qos = 2;                                                                    //Quality of service
        MqttMessage message = null;
        String content = "";
        
        //publish of the temperature
        content = sensor.getTemperature(actDateTime);
        message = new MqttMessage(content.getBytes());
        message.setQos(qos);
        message.setRetained(true);
        mqttClient.publish(topicTemperature, message);
        
        //publish of the winddirection
        content = sensor.getWindDirection(actDateTime);
        message = new MqttMessage(content.getBytes());
        message.setQos(qos);
        message.setRetained(true);
        mqttClient.publish(topicWindDirection, message);
        
        //publish of the windstrength
        content = sensor.getWindStrength(actDateTime);
        message = new MqttMessage(content.getBytes());
        message.setQos(qos);
        message.setRetained(true);
        mqttClient.publish(topicWindStrength, message);
        
        //publish of the airhumidity
        content = sensor.getAirHumidity(actDateTime);
        message = new MqttMessage(content.getBytes());
        message.setQos(qos);
        message.setRetained(true);
        mqttClient.publish(topicAirHumidity, message);
        
        //publish of the precipitation type
        content = sensor.getPrecipitationType(actDateTime);
        message = new MqttMessage(content.getBytes());
        message.setQos(qos);
        message.setRetained(true);
        mqttClient.publish(topicPrecipitationType, message);
        
        //publish of the precipitation amount
        content = sensor.getPrecipitationAmount(actDateTime);
        message = new MqttMessage(content.getBytes());
        message.setQos(qos);
        message.setRetained(true);
        mqttClient.publish(topicPrecipitationAmount, message);
        
        //publish of the airpressure
        content = sensor.getAirPressure(actDateTime);
        message = new MqttMessage(content.getBytes());
        message.setQos(qos);
        message.setRetained(true);
        mqttClient.publish(topicAirPressure, message);
            
        //publish of the airpurity
        content = sensor.getAirPurity(actDateTime);
        message = new MqttMessage(content.getBytes());
        message.setQos(qos);
        message.setRetained(true);
        mqttClient.publish(topicAirPurity, message);
        
        //publish of the airtoxicity
        content = sensor.getAirToxicity(actDateTime);
        message = new MqttMessage(content.getBytes());
        message.setQos(qos);
        message.setRetained(true);
        mqttClient.publish(topicAirToxicity, message);
        
        return 1;
    }
    
}