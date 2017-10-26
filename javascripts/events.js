"use strict";

const weather = require('./weather');

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
		weather.searchWeather(searchText, threeDay);
	});
	$('#fiveDayButton').click((e) => {
		weather.searchWeather(searchText, fiveDay);
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


