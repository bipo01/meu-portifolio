import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    password: "JSBispo121511!",
    database: "projetos",
    host: "localhost",
    port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (req, res) => {
    const response = await db.query("SELECT * FROM journal");
    console.log(response.rows);

    res.json(response.rows);
});

app.get("/deletar/:id", (req, res) => {
    const id = req.params.id;
    db.query("delete from journal where id = $1", [id]);

    res.json(id);
});

app.get("/add", (req, res) => {
    const queries = req.query;
    console.log(queries);

    let ano = String(new Date().getFullYear());
    let mes = String(new Date().getMonth());
    let dia = String(new Date().getDate());

    if (mes.length === 1) {
        mes = `0${mes}`;
    }
    if (dia.length === 1) {
        dia = `0${dia}`;
    }

    const dataAtual = `${dia}/${mes}/${ano}`;
    console.log(dataAtual);

    db.query(
        "INSERT INTO journal (titulo, post, categoria, autor, datapublicacao) VALUES ($1, $2, $3, $4, $5)",
        [
            queries.title,
            queries.post,
            queries.category,
            queries.author,
            dataAtual,
        ]
    );

    res.json(queries);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
