/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package weatherstation.simulator;

import java.util.Calendar;
import java.util.Date;
import java.util.Random;
import org.json.JSONObject;

/**
 *
 * @author chris
 */
public class Sensor {
    String [] windDirections       = {"N", "NE", "E", "SE", "S", "SW", "W", "NW"};
    int lastTemperature            = 6;
    int lastAirPressure            = 1000;
    String lastAirPurity           = "";
    String lastAirToxicity         = "";
    int lastAirHumidity            = 40;
    int lastWindDirection          = 0;
    int lastWindStrength           = 10;
    String lastPrecipitationType   = "rain";
    double lastPrecipitationAmount = 0.6;
    Random random = new Random();
    
    public String getTemperature(Calendar actDateTime){
        int temperature;
        boolean raiseTemp = false;
        boolean lowTemp = false;
            
        if(actDateTime.get(Calendar.HOUR_OF_DAY) >= 6 && actDateTime.get(Calendar.HOUR_OF_DAY) <= 15){
            raiseTemp = random.nextBoolean();
        }
        else if (actDateTime.get(Calendar.HOUR_OF_DAY) >= 17 && actDateTime.get(Calendar.HOUR_OF_DAY) <= 23){
            lowTemp = random.nextBoolean();
        }
        else if (actDateTime.get(Calendar.HOUR_OF_DAY) >= 0 && actDateTime.get(Calendar.HOUR_OF_DAY) <= 3){
            lowTemp = random.nextBoolean();
        }
            
        if(raiseTemp == true){
            temperature = lastTemperature+1;
        }
        else if(lowTemp == true){
            temperature = lastTemperature-1;
        }
        else{
            temperature = lastTemperature;
        }
        
        JSONObject obj = new JSONObject();
        obj.put("id","123");
        obj.put("date", actDateTime.getTime().toString());
        obj.put("value",Integer.toString(temperature));
        lastTemperature = temperature;
        return obj.toString();
    }
    /*
    public String getAirPressure(){
        int airPressure;
        
        lastAirPressure = airPressure;
        return airPressure;
    }
    
    public String getAirPurity(){
        String airPurity = "";
        
        lastAirPressure = airPurity;
        return airPurity;
    }
    
    public String getAirToxicity(){
        String airToxicity = "";
        
        lastAirPressure = airToxicity;
        return airToxicity;
    }
    
    public String getAirHumidity(){
        String airHumidity = "";
        
        lastAirPressure = airHumidity;
        return airHumidity;
    }
    
    public String getWindDirection(){
        String windDirection = "";
        
        lastAirPressure = windDirection;
        return windDirection;
    }
    
    public String getWindStrength(){
        String windStrength = "";
        
        lastAirPressure = windStrength;
        return windStrength;
    }
    
    public String getPrecipitationType(){
        String precipitationType = "";
        
        lastAirPressure = precipitationType;
        return precipitationType    ;
    }
    
    public String getPrecipitationAmount(){
        String precipitationAmount = "";
        
        lastAirPressure = precipitationAmount;
        return precipitationAmount;
    }*/
}
