#include <DHT_U.h>
#include <DHT.h>

#define DHT_22_PIN 4
#define YL_38_PIN A0
#define ML_8511_PIN A1

#define REF_3V3 A2

#define DHTTYPE DHT22

DHT dht(DHT_22_PIN, DHTTYPE);

float temperature;
float humidity;
int uvLevel;
int refLevel;
int rain;

void setup()
{
  Serial.begin(9600);
  pinMode(YL_38_PIN, INPUT);
  pinMode(ML_8511_PIN, INPUT);
  pinMode(REF_3V3, INPUT);
  dht.begin();
}

void loop()
{
  temperature = dht.readTemperature();
  humidity = dht.readHumidity();
  rain = analogRead(YL_38_PIN);
  uvLevel = averageAnalogRead(ML_8511_PIN);
  refLevel = averageAnalogRead(REF_3V3);

  //Use the 3.3V power pin as a reference to get a very accurate output value from sensor
  float outputVoltage = 3.3 / refLevel * uvLevel;
  
  float uvIntensity = mapfloat(outputVoltage, 0.99, 2.9, 0.0, 15.0);
  
  Serial.print("Temperatura: ");
  Serial.print(temperature);
  Serial.println("°C");
  Serial.print("Umidade: ");
  Serial.print(humidity);
  Serial.println("%");
  Serial.print("Coef. Molhado: ");
  Serial.println(rain);
  Serial.print("Intensidade UV: ");
  Serial.print(uvIntensity);
  Serial.println("mW/cm²");
  Serial.println("----------------------------------------");
  delay(2000);
}

int averageAnalogRead(int pinToRead)
{
  byte numberOfReadings = 8;
  unsigned int runningValue = 0; 

  for(int x = 0 ; x < numberOfReadings ; x++)
    runningValue += analogRead(pinToRead);
  runningValue /= numberOfReadings;

  return(runningValue);
}

float mapfloat(float x, float in_min, float in_max, float out_min, float out_max)
{
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
