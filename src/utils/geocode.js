const request = require("request");
require("dotenv").config();

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

const geocode = (address, callback) => {
    const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=${MAPBOX_TOKEN}&limit=1`;

    request({ url: mapboxUrl, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to map service", undefined);
        } else if (body.features.length === 0) {
            callback(`Unable to find ${address}`, undefined);
        } else {
            const data = body.features[0];
            callback(undefined, {
                longitude: data.center[0],
                latitude: data.center[1],
                location: data.place_name,
            });
        }
    });
};

module.exports = geocode;
