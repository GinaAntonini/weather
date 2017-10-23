(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const weather = require('./weather');

const apiKeys = () => {
	return new Promise((resolve, reject) => {
		$.ajax('./db/apiKey.json').done((data) => {
			resolve(data.apiKeys);
		}).fail((error) => {
			reject(error);
		});
	});
};

const retrieveKeys = () => {
	apiKeys().then((results) => {
		console.log(results);
		weather.setKey(results.weather.apiKey);
	}).catch((error) => {
		console.log("error in retrieve keys", error);
	});
};

module.exports = {retrieveKeys};
},{"./weather":5}],2:[function(require,module,exports){
"use strict";

const outputDiv = $('#weatherHolder');
let weatherArray;

const createCurrentDomString = (weatherArray) => {
	var currentString = "";
		for (let i = 0; i < weatherArray.length; i++);
		currentString += `<div>`;
		currentString += 	`<h1>City: ${weatherArray.city.name}>`;
		currentString += 	`<h2>Temperature: ${weatherArray.main.temp}</h1>`;
		currentString += 	`<h2>Conditions: ${weatherArray.main.description}</h4>`;
		currentString += 	`<h2>Air Pressure: ${weatherArray.main.pressure}</h4>`;
		currentString += 	`<h2>Wind Speed: ${weatherArray.wind.speed}</h4>`;
		currentString +=	`<button type="submit" id="threeDayButton">3 Day Forecast</button>`;
 		currentString +=	`<button type="submit" id="sevenDayButton">7 Day Forecast</button>`;
		currentString += `</div>`;
		currentString += `</div>`;
	printCurrentToDom(currentString);
};

const printCurrentToDom = (strang) => {
	outputDiv.append(strang);
};

module.exports = createCurrentDomString;

// Temperature
// Conditions
// Air pressure
// Wind speed
// An affordance to view the forecast for the current day, the next three days, or the next 7 days
},{}],3:[function(require,module,exports){
"use strict";

const weather = require('./weather');

const pressEnter = () => {
	$(document).keypress((e) => {
		if (e.key === 'Enter') {
			let searchText = $('#zipInputField').val();
			validateInput();
			// let query = searchText.replace(/\s/g, "%20");
			weather.searchWeather(searchText);
			console.log("event", e);
		}
	});
};

const submitButton = () => {
    $('#currentForecastButton').click((e) => {        
        let searchText = $('#zipInputField').val();        
        validateInput();  
        weather.searchWeather(searchText);      
    });
};


const validateInput = (zip) => {   
	if($('#zipInputField').val().length > 5){
		console.log("The zip code must have 5 digits");   
	} 
};

// const valueIsFiveDigits = if($('#zipInputField').val() is )

module.exports = {pressEnter, submitButton};

// || $('#currentForecastButton').click(())

},{"./weather":5}],4:[function(require,module,exports){
"use strict";

const events = require('./events');
const apiKeys = require('./apiKeys');

events.pressEnter();
events.submitButton();
apiKeys.retrieveKeys();
},{"./apiKeys":1,"./events":3}],5:[function(require,module,exports){
"use strict";

// accessing the apiKeys using the apiKeys.js
const dom = require('./dom');
let weatherKey;

const searchWeather = (query) => {
	return new Promise((resolve, reject) => {
		console.log(weatherKey);
		console.log(query);
		$.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${query}&appid=${weatherKey}&units=imperial`).done((data) => {
			console.log(data);
		}).fail((error) => {
			reject(error);
		});
	});
};

const getConfig = (query) => {
	searchWeather().then((results) => {
		showCurrentWeather(results);
		console.log(results);
	}).catch((error) => {
		console.log("Error in getConfig", error);
	});
};

const setKey = (apiKey) => {
	weatherKey = apiKey;
	console.log(weatherKey);
};

const showCurrentWeather = (weather) => {
    console.log(weather);
    dom.createCurrentDomString(weather);
};

module.exports = {searchWeather, setKey, getConfig};

},{"./dom":2}]},{},[4]);
