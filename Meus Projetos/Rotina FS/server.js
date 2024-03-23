import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import pg from "pg";

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
app.use(express.static("public"));

app.get("/", async (req, res) => {
    const result = await db.query("SELECT * FROM rotina ORDER BY inicio");
    const data = result.rows;
    console.log(data);

    res.render("home.ejs", { data: data });
});

app.post("/add", (req, res) => {
    const atividade =
        req.body.atividade[0].toUpperCase() +
        req.body.atividade.slice(1).toLowerCase();
    const inicio = `${req.body.horasInicio}:${req.body.minutosInicio}`;
    const termino = `${req.body.horasTermino}:${req.body.minutosTermino}`;

    console.log(atividade);
    console.log(inicio);
    console.log(termino);

    db.query(
        "INSERT INTO rotina (atividade, inicio, termino) VALUES ($1, $2, $3)",
        [atividade, inicio, termino]
    );

    res.redirect("/");
});

app.post("/delete", (req, res) => {
    const idDeletado = req.body.idDeletado;

    db.query("DELETE FROM rotina WHERE id = $1", [idDeletado]);

    res.redirect("/");
});

app.post("/edit", (req, res) => {
    const idEditado = req.body.idEditado;
    const editado = req.body.editado;
    console.log(idEditado, editado);

    if (editado.trim().length > 0) {
        db.query("UPDATE rotina SET atividade = $1 WHERE id = $2", [
            editado,
            idEditado,
        ]);
    }

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server on port ${port}`);
});
