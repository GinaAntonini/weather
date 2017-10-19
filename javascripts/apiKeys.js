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