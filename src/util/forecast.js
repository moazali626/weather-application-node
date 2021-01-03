const request = require("request");

const forecast = (latitude, longitude, callstack) => {
  const url =
    "http://api.weatherstack.com/current?access_key=480458f6d7ea3a3f0e963df81918afba&query=" +
    latitude +
    ", " +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callstack("Unable to connect to the internet!", undefined);
    } else if (body.error) {
      console.log("There is no such location. Please try again!", undefined);
    } else {
      callstack(
        undefined,
        body.current.weather_descriptions +
          ". It is currently " +
          body.current.temperature +
          ". It feels like " +
          body.current.feelslike
      );
    }
  });
};

module.exports = forecast;
