  
  void setup() {
   // put your setup code here, to run once:
   Serial.begin(9600);
  }
  void loop() {
   // put your main code here, to run repeatedly:


   int lightSensorValue = analogRead(A0);
   int tempSensorValue = analogRead(A1);


    String data = "Light: " + String(lightSensorValue) + " Temp: " + String(tempSensorValue);
   


   
   Serial.println(data);
   delay(1000);

   
  
 
   
  }






  

