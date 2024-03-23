import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import axios from "axios";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    password: "JSBispo121511!",
    database: "mensalidades",
    host: "localhost",
    port: 5432,
});
db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    res.render("newClient.ejs");
});

app.get("/clientInfo", async (req, res) => {
    const result = await db.query(
        "SELECT * FROM mensalidades ORDER BY nomecliente"
    );
    const data = result.rows;

    for (const cliente of data) {
        const clientesEntries = Object.entries(cliente);
        const valorPago = [];
        console.log(cliente);

        for (const [key, value] of clientesEntries) {
            if (value === "pago") {
                valorPago.push("pago");
            }
        }

        db.query(
            `UPDATE mensalidades SET recebido = ${
                valorPago.length * 200
            } where nomecliente = $1`,
            [cliente.nomecliente]
        );

        db.query(
            `UPDATE mensalidades SET areceber = ${
                2400 - valorPago.length * 200
            } where nomecliente = $1`,
            [cliente.nomecliente]
        );
    }

    res.render("clientList.ejs", { data: data });
});

app.post("/add", (req, res) => {
    const nomeCliente = req.body.nomeCliente;

    db.query("INSERT INTO mensalidades (nomeCliente) VALUES ($1)", [
        nomeCliente,
    ]);

    res.redirect("/");
});

app.post("/clientInfo", (req, res) => {
    const nomeCliente = req.body.nomeCliente;
    const mes = req.body.meses.toLowerCase();
    const pago = req.body.pagoOuNao;

    if (pago === "pago") {
        db.query(`UPDATE mensalidades SET ${mes} = $1 WHERE nomecliente = $2`, [
            pago,
            nomeCliente,
        ]);
    } else if (pago === "naoPago") {
        db.query(
            `UPDATE mensalidades SET ${mes} = null WHERE nomecliente = $1`,
            [nomeCliente]
        );
    }

    res.redirect("/clientInfo");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
