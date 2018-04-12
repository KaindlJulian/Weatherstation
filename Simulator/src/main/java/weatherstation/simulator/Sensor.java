/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package weatherstation.simulator;

/**
 *
 * @author chris
 */
public class Sensor {
    String [] windDirections = {"N", "NE", "E", "SE", "S", "SW", "W", "NW"};
    String lastTemperature         = "15";
    String lastAirPressure         = "1000";
    String lastAirPurity           = "";
    String lastAirToxicity         = "";
    String lastAirHumidity         = "40";
    String lastWindDirection       = "SO";
    String lastWindStrength        = "10";
    String lastPrecipitationType   = "rain";
    String lastPrecipitationAmount = "0.6";
    
    public String getTemperature(){
        String temperature = "";
        
        lastTemperature = temperature;
        return temperature;
    }
    
    public String getAirPressure(){
        String airPressure = "";
        
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
    }
}
