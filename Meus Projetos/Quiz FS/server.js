import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import ejs from "ejs";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    const result = await axios.get("http://localhost:4000/");
    const data = result.data;

    const answer = data.correct;

    res.render("home.ejs", { data: data });
});

app.post("/novoQuiz", async (req, res) => {
    console.log(req.body.question);

    const result = await axios.post("http://localhost:4000/novoQuiz", req.body);

    res.redirect("/");
});

app.get("/deletar/:id", async (req, res) => {
    await axios.delete(`http://localhost:4000/delete/${req.params.id}`);

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
