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
