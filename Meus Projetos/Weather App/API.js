const weatherResources = [
    {
        name: "Cuiabá",
        main: {
            temp: 40,
            humidity: 23,
        },
        wind: {
            speed: 30,
        },
    },
    {
        name: "Campo Grande",
        main: {
            temp: 33,
            humidity: 58,
        },
        wind: {
            speed: 45,
        },
    },
];

import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());

app.get("/search", (req, res) => {
    const cityName = req.query.city;
    console.log(req.query);
    const result = weatherResources.find((item) => item.name === cityName);
    res.json(result);
});

app.get("/:city", (req, res) => {
    const cityName = req.params.city;
    console.log(req.params);
    const result = weatherResources.find((item) => item.name === cityName);
    res.json(result);
});

/*app.get("/cuiaba", (req, res) => {
    const result = weatherResources.find((item) => item.name === "Cuiabá");
    res.json(result);
});
app.get("/campogrande", (req, res) => {
    const result = weatherResources.find(
        (item) => item.name === "Campo Grande"
    );
    res.json(result);
});*/

app.listen(port, () => {
    console.log(`API on port ${port}`);
});
