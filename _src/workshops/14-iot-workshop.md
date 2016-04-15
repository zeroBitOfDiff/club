---
title: Introduction to Hardware and IoT with Spark Core
slug: workshops/iot
template: workshop
author: Jonathan Warner
---

# Test

<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular.min.js"></script>
<script src="/frontend.js"></script>
<div ng-app="sparkdemo">
<div ng-controller="FrameCtrl as FrameCtrlVM">
  <div></div>

In this workshop, we will be making a Twitter bot written in Javascript using Node.js. What are these words I am saying??

#### Twitter bot???


# Step Zero
1. Locate your Spark board
2. Connect the USB cable to your computer. This is just for power.
3. Your board will have a number written on the bottom
4. Navigate your web browser to https://build.particle.io/build
5. Log in with the following format:

```
Username: jaxbot+sparknumber@gmail.com
Password:spark_tk_board_number
```

For example, if your board had a #3 on the bottom, your credentials would be:

```
Username: jaxbot+spark3@gmail.com
Password:spark_tk_board_3
```

# Step One

In the Particle Build screen, make sure you have the Sanity Check app selected.

It should look like this:

<img src="/pics/workshops/spark/sanity-check.png" alt="The Particle Build web IDE with Sanity Check open">

If it does, press the Flash button (lightning bolt). Make sure your board flashes a pink LED. If not, notify a lab instructor. Otherwise, hang tight and wait for the instructor.

# Step Two

If Sanity Check was flashed successfully, we can now wire up a basic circuit.

**UNPLUG YOUR BOARD FROM THE COMPUTER**

With the board unplugged, wire up this circuit:

<img src="/pics/workshops/spark/led_bb.png" alt="Spark LED circuit">

Steps:
1. Disconnect board from the computer
2. Make sure the blue light goes out on the board
3. Connect the resistor to the GND pin (#13)
4. Connect the other end of the resistor to pin #25, J
5. Do not connect the other end to the red + or the blue -
6. Connect the long end of the LED to pin D0 (#21)
7. Connect the short end to the LED to pin #25, I
8. Wait for the lab instructor before reconnecting USB

When the lab instructor says "cool, plug it in!", you should see a blinking red LED.

## Experiment:

Change the delay of 200 to a delay of 100 and press the lightning bolt. After the flashing completes, the LED should now blink somewhat quicker.

# Step Three

Our LED circuit is now tried and true, so let's hook it up to the internet!

This is actually pretty easy, because the Particle boards are bound to the internet anyway.

## Type in your board number before continuing

<div>
  <div class="signin section" ng-show="!FrameCtrlVM.code">
  <h2>Sign in</h2>
  <p>Please input your board number (i.e. 3)</p>
  <input type="text" ng-model="tmpcode">
  <button ng-click="FrameCtrlVM.signIn(tmpcode)">Continue</button>
  <p>This should be written on the note card on your desk. If unsure, raise your hand.</p>
  </div>
</div>

## Done? Continue.

In the IDE, select **techknights-web-led.ino**

Flash this

Once the board returns to having the breathing blue LED, press the button below:

<spark-api-execute-button device="FrameCtrlVM.device" text="Turn LED on" params="on" endpoint="led"></spark-api-execute-button>

Did it work? If so, yay! If not, raise your hand and let the instructor know.

Pretty cool! Now turn it off:

Try the one below. Note that we're essentially just making a cURL request to the server when you click these buttons. If you have cURL on your machine, you could just as well run the command in your terminal.

<spark-api-execute device="FrameCtrlVM.device" params="off" endpoint="led"></spark-api-execute>

## All good? Let's experiment!

Let's try adding some new functionality.

At the top, add:

```
bool party = false;
```

Change `delay(400)` to `delay(party ? 50 : 400);`

Add this to LED Toggle:

```
else if (command=="party") {
        party = true;
        on = true;
        return 0;
    }
```

Flash it, then try the button below.

<spark-api-execute-button device="FrameCtrlVM.device" text="Party mode" params="party" endpoint="led"></spark-api-execute-button>

# Step Four: Button input

Disconnect USB!

Wire up this circuit:

<img src="/pics/workshops/spark/button_bb.png">

This is confusing and weird:

* Add a resistor from D7 (14-i) to (25-c)
* Add a jumper wire from (25-d) to (27-j)
* Add a jumper wire from (29-d) to GND (11-b)

Make a new app called `techknights-button` and paste in the following code:

```c
// First, let's create our "shorthand" for the pins
// Same as in the Blink an LED example:
// led1 is D0, led2 is D7

int led1 = D0;

bool on = false;
int button = D7;
int value = 0;

int lastState = 0;

void setup()
{

   // Here's the pin configuration, same as last time
   pinMode(led1, OUTPUT);
   pinMode(power, OUTPUT);
   pinMode(button, INPUT_PULLUP);

   // We are also going to declare a Spark.function so that we can turn the LED on and off from the cloud.
   Spark.function("led",ledToggle);
   Spark.variable("value", &value, INT);
   // This is saying that when we ask the cloud for the function "led", it will employ the function ledToggle() from this app.

   // For good measure, let's also make sure both LEDs are off when we start:
   digitalWrite(led1, LOW);
}


// Last time, we wanted to continously blink the LED on and off
// Since we're waiting for input through the cloud this time,
// we don't actually need to put anything in the loop

void loop()
{
   // Nothing to do here
   if (on) {
        digitalWrite(led1,HIGH);
        delay(40);
        digitalWrite(led1,LOW);
        delay(40);
   }
   value = !digitalRead(button);
   
   if (lastState == 0 && value) {
       lastState = 1;
       on = !on;
   }
   if (!value) {
       lastState = 0;
   }
   
   delay(10);
}

// We're going to have a super cool function now that gets called when a matching API request is sent
// This is the ledToggle function we registered to the "led" Spark.function earlier.
int ledToggle(String command) {
    /* Spark.functions always take a string as an argument and return an integer.
    Since we can pass a string, it means that we can give the program commands on how the function should be used.
    In this case, telling the function "on" will turn the LED on and telling it "off" will turn the LED off.
    Then, the function returns a value to us to let us know what happened.
    In this case, it will return 1 for the LEDs turning on, 0 for the LEDs turning off,
    and -1 if we received a totally bogus command that didn't do anything to the LEDs.
    */

    if (command=="on") {
        digitalWrite(led1,HIGH);
        on = true;
        return 1;
    }
    else if (command=="off") {
        digitalWrite(led1,LOW);
        on = false;
        return 0;
    }
    else {
        return -1;
    }
}
```

Connect USB, wait for the breathing state, then flash.

When the flashing is complete, you should be able to turn on the LED by pressing the button, or by using the buttons below.

<spark-api-execute-button device="FrameCtrlVM.device" text="On" params="on" endpoint="led"></spark-api-execute-button>

<spark-api-execute-button device="FrameCtrlVM.device" text="Off" params="off" endpoint="led"></spark-api-execute-button>

The button below will read the value of the button on the board. Hold down the button on the board and press this button simultaneously, and the result should be 1.

# We made it!

Awesome, looks like we made it through all that. The lab instructor will chat about some other things, applications of what we've done, and might try the multicolor LEDs thing:

## Bonus: multicolor LEDs

```c
int RED_PIN = A5;
int GREEN_PIN = A1;
int BLUE_PIN = A0;

void setup()
{
   pinMode(RED_PIN, OUTPUT);
   pinMode(GREEN_PIN, OUTPUT);
   pinMode(BLUE_PIN, OUTPUT);
}

//https://learn.adafruit.com/adafruit-arduino-lesson-3-rgb-leds/arduino-sketch
void loop()
{
    setColor(255, 0, 0);  // red
    delay(1000);
    setColor(0, 255, 0);  // green
    delay(1000);
    setColor(0, 0, 255);  // blue
    delay(1000);
    setColor(255, 255, 0);// yellow
    delay(1000);  
    setColor(80, 0, 80);  // purple
    delay(1000);
    setColor(0, 255, 255);// aqua
    delay(1000);
}


void setColor(int red, int green, int blue)
{
    analogWrite(RED_PIN, red);
    analogWrite(GREEN_PIN, green);
    analogWrite(BLUE_PIN, blue);  
}
```


</div>
</div>
