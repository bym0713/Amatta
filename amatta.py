import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from bluetooth import *
import RPi.GPIO as GPIO
import time, os, subprocess
os.environ['DISPLAY'] = ":0"

GPIO.setmode(GPIO.BCM)

trig = 13
echo = 19
who=5
GPIO.setup(trig, GPIO.OUT)
GPIO.setup(echo, GPIO.IN)
print('start')
def blue():
    client_socket=BluetoothSocket(RFCOMM)
    client_socket.connect(("98:D3:91:FD:8A:5D",1))
    cred = credentials.Certificate('double-skyline-265803-firebase-adminsdk-kxxmc-5841099f57.json')
    firebase_admin.initialize_app(cred,{
        'databaseURL':'https://double-skyline-265803.firebaseio.com/'
    }                       )
    print ('bluetooth Connected!')
    
blue()
displayison = False
maxidle = 10         
lastsign = 0
ref = db.reference('SmartHome/raspberryp')
try:
    while True:
        now = time.time()
        stop=0
        start=0
        GPIO.output(trig,False)
        time.sleep(0.5)
       
        GPIO.output(trig,True)
        time.sleep(0.00001)
        GPIO.output(trig,False)
       
        while GPIO.input(echo)==0:
            start = time.time()
        while GPIO.input(echo)==1:
            stop = time.time()
           
            elapsed =stop-start
        if (stop and start):
            distance = (elapsed * 34000.0)/2
            print (distance)
        if (distance<100):
            ref.update({
    'Some': 'ON'
})
            snapshot = ref.order_by_child('RSSI').limit_to_first(4).get()
            for key in snapshot:
                print(key)
                
                if not (key==who):
                    client_socket.send(key)
                    who=key
            if not displayison:
                subprocess.call('xset dpms force on',shell=True)
                displayison = True
            lastsign = now
        else:
            if now-lastsign > maxidle:
                if displayison:
                    subprocess.call('xset dpms force off',shell=True)
                    displayison = False
                    ref.update({
    'Some': 'OFF'
})
finally:GPIO.cleanup()
print('Finished')
client_socket.close()
