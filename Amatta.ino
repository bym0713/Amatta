#include <Stepper.h>
#include <SoftwareSerial.h>
const int One = 512;
Stepper ST(One,7,6,5,4);
SoftwareSerial hc06(10,11);
char pre='a';
void setup(){
  Serial.begin(9600);
  hc06.begin(9600);
  ST.setSpeed(30);
}

void loop(){
  
if(hc06.available()){
//if(Serial.available()){
//char who = Serial.read();
char who = hc06.read();
 if(who=='a' || who=='b' || who=='c' || who=='d'){
  if(who-pre==3){
    ST.step(-One);
  }
  else if(who-pre== -3){
    ST.step(One);
  }
  else{
 ST.step((who-pre)*One);
  }
  pre=who;
 }
  }
}
