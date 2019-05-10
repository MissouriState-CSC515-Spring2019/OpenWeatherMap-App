OpenWeatherApi App

Overview
This single page React app is using the OpenWeather Api to grab data and display it in three different views. This application will by default load Springfield Missouri's weather. To change location just type a valid zipcode into the search bar located in the navbar. This application works for zipcodes only inside of the US. 

*API can't handle more than 60 calls per minute! Please email dwc678@live.missouristate.edu if this is exceeded.*

*Browser warnings due to ReactStrap NavLinks*

View functionality

1.) Current Weather View:
- The current weather view will display the city location, current temperature, humidity, wind, and sun rise/set. Depending on the weather, an imagine will appear reflecting that. 

2.) Five Day Forecast View:
- The five day forcast view will display the next five days high and low temperatures. Similar to the current weather view, depending on the weather, an imagine will appear reflecting that. 

3.) UV Index View:
- The UV Index view will display a total of eight days and the UV Index for each day. 

How To Install
- npm install
- npm start

Unit Test
- npm test
- a to run all
- q to quit

End to end Test
- run the command "npm start & wait-on http://localhost:3000; ./node_modules/.bin/cypress open"
- Cypress should open a window for you
- Next you click on the e2e_spec.js file, it should be the first option.
- it will take a sec to load up the test but it should run by itself after you have clicked the test file