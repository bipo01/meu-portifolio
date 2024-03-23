import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    password: "JSBispo121511!",
    database: "escola",
    host: "localhost",
    port: 5432,
});
db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    const response = await db.query("SELECT * FROM alunos");

    const data = response.rows;

    let materias = data.map((aluno) => aluno.materias);

    console.log(data);
    console.log(materias, typeof materias);

    res.render("index.ejs", { data: data, materias: materias });
});

app.post("/cadastro", (req, res) => {
    const nome = req.body.nomeAluno;
    const cpf = req.body.cpfAluno;
    const turno = req.body.turno;
    const materias = req.body.materias;

    db.query(
        "INSERT INTO alunos (nome, cpf, turno, materias) VALUES ($1, $2, $3, $4)",
        [nome, cpf, turno, materias]
    );

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server on ${port}`);
});
