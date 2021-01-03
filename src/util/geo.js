const request = require("request");

const geo = (location, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/ " +
    encodeURIComponent(location) +
    " .json?access_token=pk.eyJ1IjoibW9hemFsaTYyNiIsImEiOiJja2o4NGI3d2Y2cHB6MnhxamZvcHB2N3cxIn0.V-72rUZm4cybCHpxnp1M2Q&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Something went wrong, unable to the service", undefined);
    } else if (body.features.length === 0) {
      callback("Location not found. Please try another location!", undefined);
    } else {
      callback(undefined, {
        location: body.features[0].place_name,
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
      });
    }
  });
};

module.exports = geo;
