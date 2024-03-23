import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import axios from "axios";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    const result = await axios.get("http://localhost:4000/");
    const data = result.data;
    const { palavra, dica } = data;
    console.log(palavra, dica);

    res.render("index.ejs", { palavra: palavra, dica: dica });
});

app.get("/filter", async (req, res) => {
    const result = await axios.get(
        `http://localhost:4000/filter?dica=${req.query.dica}`
    );

    const data = result.data;

    const { palavra, dica } = data;

    res.render("index.ejs", { palavra: palavra, dica: dica });
});

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});
