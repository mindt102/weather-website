const request = require("request");
require("dotenv").config();

const WEATHER_STACK_KEY = process.env.WEATHER_STACK_KEY;

const forecast = (longitude, latitude, callback) => {
    const weatherstackUrl = `http://api.weatherstack.com/current?access_key=${WEATHER_STACK_KEY}&query=${latitude},${longitude}`;

    request({ url: weatherstackUrl, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to weather service", undefined);
        } else if (body.error) {
            callback("Unable to find address", undefined);
        } else {
            const data = body.current;
            console.log(data);
            const { temperature, feelslike, weather_descriptions, uv_index } =
                data;
            callback(
                undefined,
                `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. The UV index is ${uv_index}`
            );
        }
    });
};

module.exports = forecast;
