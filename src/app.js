const path = require("path");
const hbs = require("hbs");
const express = require("express");
const request = require("request");
const geo = require("./util/geo");
const forcast = require("./util/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partial");

// Setup handlebars and views (templates) location
app.set("view engine", "hbs");
app.set("views", viewPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Setup partial hbs
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("Please provide an address");
  }

  geo(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      res.send({ error });
    }

    forcast(latitude, longitude, (error, forcastData) => {
      if (error) {
        res.send({ error });
      }

      res.send({
        forcast: forcastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "404 Page Not Found",
    title: "Error",
  });
});

app.listen(port, () => {
  console.log("Service is up on port " + port);
});
