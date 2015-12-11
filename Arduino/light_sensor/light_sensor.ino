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
    int rotationSensorValue = analogRead(A3);

    String light;
    String temp;
    String sound;
    String rotation;

    if (lightSensorValue < 100){
      light = "0" + String(lightSensorValue);
    } else if (lightSensorValue < 10){
      light = "00" + String(lightSensorValue);
    }else {
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
    if (rotationSensorValue < 10){
      rotation = "000"+ String(rotationSensorValue);
    } else if (rotationSensorValue < 100){
      rotation = "00"+ String(rotationSensorValue);
    } else if (rotationSensorValue < 1000){
      rotation = "0" + String(rotationSensorValue);
    } else {
      rotation = String(rotationSensorValue);
    }
    
    String data = "L: " + light + " T: " + temp + " S: " + sound/* + " R: " + rotation*/;

   Serial.println(data);
   Serial.flush();

   delay(1000);
  }






  

