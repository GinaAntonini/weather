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
},{"./weather":4}],2:[function(require,module,exports){
"use strict";

const weather = require('./weather');

const pressEnter = () => {
	$(document).keypress((e) => {
		if (e.key === 'Enter') {
			// let searchText = $('#zipInputField').val();
			validateInput();
			// let query = searchText.replace(/\s/g, "%20");
			weather.searchWeather(90210);
			console.log("event", e);
		}
	});
};

const validateInput = (zip) => {   
	if($('#zipInputField').val().length > 5){
		console.log("The zip code must have 5 digits");   
	} 
};

// const valueIsFiveDigits = if($('#zipInputField').val() is )

module.exports = {pressEnter};

// || $('#currentForecastButton').click(())

},{"./weather":4}],3:[function(require,module,exports){
"use strict";

const events = require('./events');
const apiKeys = require('./apiKeys');

events.pressEnter();
apiKeys.retrieveKeys();
},{"./apiKeys":1,"./events":2}],4:[function(require,module,exports){
"use strict";

// accessing the apiKeys using the apiKeys.js
let weatherKey;

const searchWeather = (query) => {
	return new Promise((resolve, reject) => {
		console.log(weatherKey);
		console.log(query);
		$.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${query}&appid=${weatherKey}&units=imperial`).done((data) => {
			console.log(data);
			resolve(data.results);
		}).fail((error) => {
			reject(error);
		});
	});
};


const setKey = (apiKey) => {
	weatherKey = apiKey;
	console.log(weatherKey);
};

module.exports = {searchWeather, setKey};

},{}]},{},[3]);
