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
