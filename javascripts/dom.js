"use strict";

const outputDiv = $('#weatherHolder');


const createCurrentDomString = (weatherArray) => {
	var currentString = "";
		for (let i = 0; i < weatherArray.length; i++);
		currentString += `<div>`;
		currentString += 	`<h1>City: ${weatherArray[i].city.name}>`;
		currentString += 	`<h2>Temperature: ${weatherArray[i].main.temp}</h1>`;
		currentString += 	`<h2>Conditions: ${weatherArray[i].main.description}</h4>`;
		currentString += 	`<h2>Air Pressure: ${weatherArray[i].main.pressure}</h4>`;
		currentString += 	`<h2>Wind Speed: ${weatherArray[i].wind.speed}</h4>`;
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