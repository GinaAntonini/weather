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
