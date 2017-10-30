"use strict";

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
  }).catch((error) => {
    console.log("error in searchWeather", error);
  });
};

const showCurrentWeather = (weatherArray) => {
    console.log("in weather js", weatherArray);
    dom.createCurrentDomString(weatherArray);
};

const showForecastWeather = (weatherArray) => {
	let currentWeather = [];
	let threeDayForecast = [];
	let fiveDayForecast = [];
	for(let i = 0; i < weatherArray.list.length; i++) {
		if(i === 0) {
			currentWeather.push(weatherArray.list[i]);
			threeDayForecast.push(weatherArray.list[i]);
			fiveDayForecast.push(weatherArray.list[i]);
		} else if (i === 0 || i === 8 || i === 16) {
			threeDayForecast.push(weatherArray.list[i]);
			fiveDayForecast.push(weatherArray.list[i]);
		} else if (i === 0 || i === 8 || i === 16 || i === 24 || i === 32) {
			fiveDayForecast.push(weatherArray.list[i]);
		}
	}
	console.log("current weather", currentWeather);
	console.log("three day", threeDayForecast);
	console.log("five day", fiveDayForecast);
	dom.createCurrentDomString(weatherArray);
};


module.exports = {searchWeather, setKey};
