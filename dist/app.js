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


const createCurrentDomString = (weatherArray, days) => {
	var currentString = "";
	console.log("weatherArray", weatherArray);
		currentString += 	`<h2>City: ${weatherArray.city.name}<h2>`;

		for (let i = 0; i < days; i++) {
			// if (i === 0) {
		currentString += `<div>`;
		currentString += 	`<h2>Temperature: ${weatherArray.list[i].main.temp}</h1>`;
		currentString += 	`<h2>Conditions: ${weatherArray.list[i].weather[0].description}</h4>`;
		currentString += 	`<h2>Air Pressure: ${weatherArray.list[i].main.pressure}</h4>`;
		currentString += 	`<h2>Wind Speed: ${weatherArray.list[i].wind.speed}</h4>`;
		currentString += `</div>`;
		currentString += `</div>`;
	printCurrentToDom(currentString);
	// }
	}	
};

const printCurrentToDom = (strang) => {
	outputDiv.append(strang);
};

// const createForecastDomString = () => {
// 	var forecastString = "";
// 		for (let i = 0; i < weatherArray.length; i++);
// 			forecastString += `<div>`;
// 			forecastString
// }

module.exports = {createCurrentDomString};

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

const searchDatabase = (query) => {
	return new Promise((resolve, reject) => {
		$.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${query},us&appid=${weatherKey}&units=imperial`).done((data) => {
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
};

const setKey = (apiKey) => {
	weatherKey = apiKey;
};

const searchWeather = (query) => {
  searchDatabase(query).then((data) => {
  	showForecastWeather(data);
    showCurrentWeather(data);
  }).catch((error) => {
    console.log("error in searchWeather", error);
  });
};

const showCurrentWeather = (weatherArray) => {
    console.log("in weather js", weatherArray);
    dom.createCurrentDomString(weatherArray);
};


// have these 3 arrays ready to be sent ...
	// when the user selects the button coresponding to the array

const showForecastWeather = (weatherArray) => {
	let currentWeather = [];
	let threeDayForecast = [];
	let fiveDayForecast = [];
	for(let i = 0; i < weatherArray.list.length; i++) {
		// when i hits index 0 ...
			// add it to all three arrays
		// when i hits 8 and 16 ...
		 	// add those two to threeDayForecast and fiveDayForecast
	 	// when i hits 24 and 32 ...
	 		// add them to fiveDayForecast
		if(i === 0) {
			currentWeather.push(weatherArray.list[i]);
		} else if (i === 0 || i === 8 || i === 16) {
			threeDayForecast.push(weatherArray.list[i]);
		} else if (i === 0 || i === 8 || i === 16 || i === 24 || i === 32) {
			fiveDayForecast.push(weatherArray.list[i]);
		}
	}
	console.log("current weather", currentWeather);
	console.log("three day", threeDayForecast);
	console.log("five day", fiveDayForecast);
	// dom.createCurrentDomString(weatherArray);
};


module.exports = {searchWeather, setKey};

},{"./dom":2}]},{},[4]);
