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
    
    String data = "L: " + String(lightSensorValue) + " T: " + String(tempSensorValue) + " S: " + String(soundSensorValue);

   //Serial.println("START"); 
   //Serial.println("L");
   //Serial.println(lightSensorValue);
   //Serial.println("T"); 
   //Serial.println(tempSensorValue);
   //Serial.println("END");
   Serial.println(data);
   Serial.flush();
   
   delay(20000);
  }






  

