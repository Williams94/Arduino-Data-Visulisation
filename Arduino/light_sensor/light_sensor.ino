#include <math.h>

  void setup() {
   // put your setup code here, to run once:
   Serial.begin(115200);
  }

  
  void loop() {

    //String date = String(day(t)) + "/" + String(month(t)) + "/" + String(year(t)) + " " + String(hour(t)) + ":" + String(minute(t));
    int lightSensorValue = analogRead(A0);
    int tempSensorValue = (analogRead(A1) * 0.2222) - 61.111;
    int soundSensorValue = (16.801 * log(analogRead(A2))) + 9.872;

    String light;
    String temp;
    String sound;

    if (lightSensorValue < 100){
      light = "0" + String(lightSensorValue);
    } else {
      light = String(lightSensorValue);
    }

    if (tempSensorValue < 10){
      temp = "0" + String(tempSensorValue);
    } else {
      temp = String(tempSensorValue);
    }

    if (soundSensorValue < 100){
      sound = "0" + String(soundSensorValue);
    } else {
      sound = String(soundSensorValue);
    }
    
    
    String data = "L: " + light + " T: " + temp + " S: " + sound;

   Serial.println(data);
   Serial.flush();
   
   delay(5000);
  }






  

