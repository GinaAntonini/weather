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
