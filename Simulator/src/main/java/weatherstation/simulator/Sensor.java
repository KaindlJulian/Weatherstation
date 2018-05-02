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

    String [] windDirections       = { "N", "NE", "E", "SE", "S", "SW", "W", "NW" };            //Array where the wind directions are saved in
    String [] precipitationTypes   = { "sunny", "cloudy", "rainy", "snowy", "stormy" };         //Array where the precipitation types are saved
    
    //last values of the random functions
    int lastTemperature            = 8;
    double lastAirPressure         = 1000;
    double lastAirPurity              = 0.1;
    String lastAirToxicity         = "";
    int lastAirHumidity            = 40;
    int lastWindDirection          = 2;
    int lastWindStrength           = 5;
    int lastPrecipitationType      = 1;
    double lastPrecipitationAmount = 0.0;
    
    //random generator
    Random random                  = new Random();
    
    //static numbers which set the borders of the seasons
    static final int maxTempSpring = 30;
    static final int maxTempSummer = 40;
    static final int maxTempAutumn = 30;
    static final int maxTempWinter = 15;
    static final int minTempSpring = -10;
    static final int minTempSummer = 10;
    static final int minTempAutumn = -15;
    static final int minTempWinter = -30;
    
    //random function which returns a realistic temperture in JSON-format
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
        
        int month = actDateTime.get(Calendar.MONTH);
        if(checkTemp(month, temperature) == false){
            temperature = lastTemperature;
        }
        
        JSONObject obj = new JSONObject();
        obj.put("id","TEMPERATURE");
        obj.put("date", actDateTime.getTime().toString());
        obj.put("value",Integer.toString(temperature));
        lastTemperature = temperature;
        
        return obj.toString();
    }
        
    //random function which returns a realistic airhumidity in JSON-format
    public String getAirHumidity(Calendar actDateTime){
        int airHumidity = 0;
        int index = random.nextInt(4);
        boolean operation = random.nextBoolean();
        
        if(operation == false){
            airHumidity = lastAirHumidity+index;
        }
        else{
            airHumidity = lastAirHumidity-index;
        }
        
        if(airHumidity > 100){
            airHumidity = lastAirHumidity;
        }
        else if (airHumidity < 30){
            airHumidity = lastAirHumidity;
        }
        
        JSONObject obj = new JSONObject();
        obj.put("id","AIR_HUMIDITY");
        obj.put("date", actDateTime.getTime().toString());
        obj.put("value",Integer.toString(airHumidity));
        lastAirHumidity = airHumidity;
        
        return obj.toString();
    }

    //random function which returns a realistic precipitation type in JSON-format    
    public String getPrecipitationType(Calendar actDateTime){
        int precipitationType = 0;
        int index = random.nextInt(4);
        boolean change = random.nextBoolean();
        
        if((index == lastPrecipitationType-1 && change == true) || (index == lastPrecipitationType+1 && change == true)){
            precipitationType = index;
        }
        else{
            precipitationType = lastPrecipitationType;
        }

        if(precipitationTypes[precipitationType].equals("snowy") && lastTemperature >= 3 ||
            precipitationTypes[precipitationType].equals("rainy") && lastTemperature <= -2){
            precipitationType = lastPrecipitationType;
        }
        
        JSONObject obj = new JSONObject();
        obj.put("id","PRECIPITATION_TYPE");
        obj.put("date", actDateTime.getTime().toString());
        obj.put("value", precipitationTypes[precipitationType]);
        lastPrecipitationType = precipitationType;
        
        return obj.toString();
    }
    
    //random function which returns a realistic precipitation amount in JSON-format
    public String getPrecipitationAmount(Calendar actDateTime){
        double precipitationAmount = 0.0;
        int index = random.nextInt(40);
        double doubleIndex = random.nextDouble();
        double sumIndex = index+doubleIndex;
        double help = sumIndex;
        
        if(lastPrecipitationType == 0 || lastPrecipitationType == 1){
            sumIndex = 0;
        }
        else if (lastPrecipitationAmount - sumIndex > 5 || lastPrecipitationAmount - sumIndex < -5){
            sumIndex = lastPrecipitationAmount;
        }
        else if (lastPrecipitationAmount - sumIndex < 5 || lastPrecipitationAmount - sumIndex > -5){
            sumIndex = help;
        }
        else{
            sumIndex = lastPrecipitationAmount;
        }
        
        if( ( lastPrecipitationType == 2 || lastPrecipitationType == 3 ) && lastPrecipitationAmount == 0){
            if(help < 20){
                sumIndex = help;
            }
            else{
                sumIndex = help - 15;
            }
        } 
        precipitationAmount = sumIndex;
        
        JSONObject obj = new JSONObject();
        obj.put("id","PRECIPITATION_AMOUNT");
        obj.put("date", actDateTime.getTime().toString());
        obj.put("value", Double.toString(precipitationAmount));
        lastPrecipitationAmount = precipitationAmount;
        
        return obj.toString();
    }

    //random function which returns a realistic airpressure in JSON-format    
    public String getAirPressure(Calendar actDateTime){
        double airPressure = 0;
        double index = random.nextDouble()/2;
        boolean change = random.nextBoolean();
        
        if(change == false){
            airPressure = lastAirPressure + index;
        }
        else{
            airPressure = lastAirPressure - index;
        }
        
        JSONObject obj = new JSONObject();
        obj.put("id","AIR_PRESSURE");
        obj.put("date", actDateTime.getTime().toString());
        obj.put("value", Double.toString(airPressure));
        lastAirPressure = airPressure;
        
        return obj.toString();
    }
    
    
    //random function which returns a realistic airpurity in JSON-format
    public String getAirPurity(Calendar actDateTime){
        double airPurity = 0;
        double index = random.nextDouble()/20;
        boolean change = random.nextBoolean();
        
        if(change == false){
            airPurity = lastAirPurity - index;
        }
        else{
            airPurity = lastAirPurity + index;
        }
        
        if(airPurity < 0){
            airPurity = airPurity * -1;
        }
        
        if(airPurity > 0.8){
            airPurity = lastAirPurity;
        }
        
        JSONObject obj = new JSONObject();
        obj.put("id","AIR_PURITY");
        obj.put("date", actDateTime.getTime().toString());
        obj.put("value", Double.toString(airPurity));
        lastAirPurity = airPurity;
        return obj.toString();
    }
    
    /*
    //random function which returns a realistic airtoxicity in JSON-format    
    public String getAirToxicity(){
        String airToxicity = "";
        
        lastAirPressure = airToxicity;
        return airToxicity;
    }
    */

    //random function which returns a realistic winddirection in JSON-format    
    public String getWindDirection(Calendar actDateTime){
        int windDirection = 0;
        int index = random.nextInt(7);
        
        if(index == lastWindDirection-1 || index == lastWindDirection+1){
            windDirection = index;
        }
        else{
            windDirection = lastWindDirection;
        }
        
        JSONObject obj = new JSONObject();
        obj.put("id","WIND_DIRECTION");
        obj.put("date", actDateTime.getTime().toString());
        obj.put("value", windDirections[windDirection]);
        lastWindDirection = windDirection;
        
        return obj.toString();
    }

    //random function which returns a realistic windstrength in JSON-format    
    public String getWindStrength(Calendar actDateTime){
        int windStrength = 0;
        int index = random.nextInt(30);
        
        if(index == lastWindStrength-1 || index == lastWindStrength-2 || index == lastWindStrength -3 ||
           index == lastWindStrength +1 || index == lastWindStrength +2 || index == lastWindStrength +3){
            windStrength = index;
        }
        else{
            windStrength = lastWindStrength;
        }
        
        JSONObject obj = new JSONObject();
        obj.put("id","WIND_STRENGTH");
        obj.put("date", actDateTime.getTime().toString());
        obj.put("value", Integer.toString(windStrength));
        lastWindStrength = windStrength;
        
        return obj.toString();
    }

    //a fucntion which checks if the random generated temperature is valid
    public boolean checkTemp (int month, int temperature){
        
        if(month == 1 || month == 2 || month == 12)
        {
            if(temperature <= maxTempWinter && temperature >= minTempWinter){
                return true;
            }
        }
        else if (month == 3 || month == 4 || month == 5){
            if(temperature <= maxTempSpring && temperature >= minTempSpring){
                return true;
            }
        }
        else if (month == 6 || month == 7 || month == 8){
            if(temperature <= maxTempSummer && temperature >= minTempSummer){
                return true;
            }
        }
        else if (month == 9 || month == 10 || month == 11){
            if(temperature <= maxTempAutumn && temperature >= minTempAutumn){
                return true;
            }
        }
        
        return false;
    }
}
