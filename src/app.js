const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "mindt102",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "mindt102",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        message: "Some useful text",
        title: "Help",
        name: "mindt102",
    });
});

app.get("/weather", (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.status(400).json({
            error: "You must provide an address",
        });
    }

    // geocode(address, (error, { longitude, latitude, location } = {}) => {
    //     if (error) {
    //         return res.json({ error });
    //     }
    //     forecast(longitude, latitude, (error, forecast) => {
    //         if (error) {
    //             return res.json({ error });
    //         }
    //         res.status(200).json({ forecast, location, address });
    //     });
    // });

    console.log(address);
});

app.get("/help/*", (req, res) => {
    res.status(404).render("404", {
        message: "Help not found",
        name: "mindt102",
        title: "404",
    });
});

app.get("*", (req, res) => {
    res.status(404).render("404", {
        message: "Page Not Found",
        name: "mindt102",
        title: "404",
    });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});
