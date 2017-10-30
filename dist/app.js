(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const weather = require('./weather');
const firebaseApi = require('./firebaseApi');

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
		weather.setKey(results.weather.apiKey);
		firebaseApi.setKey(results.firebaseKeys);
	    firebase.initializeApp(results.firebaseKeys);
	}).catch((error) => {
		console.log("error in retrieve keys", error);
	});
};

module.exports = {retrieveKeys};
},{"./firebaseApi":4,"./weather":6}],2:[function(require,module,exports){
"use strict";

const outputDiv = $('#weatherHolder');


const createCurrentDomString = (weatherArray, days) => {
	var currentString = "";
	console.log("weatherArray", weatherArray);
		currentString += 	`<h2>City: ${weatherArray.city.name}<h2>`;
		for (let i = 0; i < weatherArray.list.length; i++) {
			if (i === 0) {
		currentString += `<div>`;
		currentString += 	`<h2>Date: ${weatherArray.list[i].dt_txt}</h2>`;
		currentString += 	`<h2>Temperature: ${weatherArray.list[i].main.temp}</h1>`;
		currentString += 	`<h2>Conditions: ${weatherArray.list[i].weather[0].description}</h4>`;
		currentString += 	`<h2>Air Pressure: ${weatherArray.list[i].main.pressure}</h4>`;
		currentString += 	`<h2>Wind Speed: ${weatherArray.list[i].wind.speed}</h4>`;
		currentString += `</div>`;
		currentString += `</div>`;
	printCurrentToDom(currentString);
	}
	}	
};

const printCurrentToDom = (strang) => {
	outputDiv.append(strang);
};

const clearDom = () => {
	$("#output").empty();
};


module.exports = {createCurrentDomString, clearDom};

},{}],3:[function(require,module,exports){
"use strict";

const weather = require('./weather');
const firebaseApi = require('./firebaseApi');

// have a way for a user's selection to send the apporpriate array from weather.js to dom.js

// instead of sending numbers, as below, which would have send only index 1, 3 and 5 from weatherArray ...
	// send the correct array from weather.js, the ones trimmed to the correct times/days
let oneDay = 1;
let threeDay = 3;
let fiveDay = 5;

const pressEnter = () => {
	$(document).keypress((e) => {
		if (e.key === 'Enter') {
			let searchText = $('#zipInputField').val();
			validateInput();
			// let query = searchText.replace(/\s/g, "%20");
			weather.searchWeather(searchText, oneDay);
			$('#threeDayButton').removeClass('hidden');
			$('#fiveDayButton').removeClass('hidden');
		}
	});
};

const forecastButtons = (searchText, days) => {
	$('#threeDayButton').click((e) => {
		weather.searchWeather(searchText);
	});
	$('#fiveDayButton').click((e) => {
		weather.searchWeather(searchText);
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

const googleAuth = () => {
	$('#googleButton').click((e) =>{
		firebaseApi.authenticateGoogle().then().catch((err) =>{
			console.log("error in authenticateGoogle", err);
		});
	});
};

const myLinks = () => {
	$(document).click((e) =>{
		if(e.target.id === "weatherSearchBar"){
			$("#search").removeClass("hide");
			$("#myWeather").addClass("hide");
			$("#authScreen").addClass("hide");
		}else if (e.target.id === "myWeatherForecasts") {
			$("#search").addClass("hide");
			$("#myWeather").removeClass("hide");
			$("#authScreen").addClass("hide");
		}else if (e.target.id === "authenticate"){
			$("#search").addClass("hide");
			$("#myWeather").addClass("hide");
			$("#authScreen").removeClass("hide");
		}
	});
};

// const valueIsFiveDigits = if($('#zipInputField').val() is )

module.exports = {pressEnter, submitButton, forecastButtons, myLinks, googleAuth};

// || $('#currentForecastButton').click(())



},{"./firebaseApi":4,"./weather":6}],4:[function(require,module,exports){
"use strict";

let firebaseKey = "";
let userUid = "";

const setKey = (key) => {
	firebaseKey = key;
};

let authenticateGoogle = () => {
	return new Promise((resolve, reject) => {
	  var provider = new firebase.auth.GoogleAuthProvider();
	  firebase.auth().signInWithPopup(provider)
	    .then((authData) => {
	    	userUid = authData.user.uid;
	        resolve(authData.user);
	    }).catch((error) => {
	        reject(error);
	    });
	});
};

module.exports = {setKey, authenticateGoogle};
},{}],5:[function(require,module,exports){
"use strict";

const events = require('./events');
const apiKeys = require('./apiKeys');

events.pressEnter();
events.submitButton();
events.googleAuth();
events.myLinks();
apiKeys.retrieveKeys();

},{"./apiKeys":1,"./events":3}],6:[function(require,module,exports){
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

},{"./dom":2}]},{},[5]);
