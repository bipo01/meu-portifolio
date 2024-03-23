import express from "express";
import axios from "axios";
import ejs from "ejs";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
    const result = await axios.get("https://meme-api.com/gimme");
    const data = result.data;

    res.render("index.ejs", { data: data });
});

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});
