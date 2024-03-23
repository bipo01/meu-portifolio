import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import axios from "axios";
import pg from "pg";

const app = express();
const port = 4000;

const db = new pg.Client({
    user: "postgres",
    password: "JSBispo121511!",
    database: "mensalidades",
    host: "localhost",
    port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    const nomeCliente = req.body.nomeCliente;

    const listaDeClientes = await db.query(
        "SELECT * FROM mensalidades WHERE nomeCliente = $1",
        [nomeCliente]
    );
});

app.listen(port, () => {
    console.log(`API on port ${port}`);
});
