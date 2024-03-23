import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  database: "postgres",
  host: "localhost",
  password: "postgres",
  port: 5432,
});

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.post("/add", (req, res) => {
  const nome = req.body.nome;
  const sobrenome = req.body.sobrenome;
  const idade = req.body.idade;
  const cpf = req.body.cpf;
  const ocupacao = req.body.ocupacao;

  db.query(
    "INSERT INTO cartoes(nome, sobrenome, idade, cpf, ocupacao) VALUES($1, $2, $3, $4, $5)",
    [nome, sobrenome, idade, cpf, ocupacao]
  );

  res.redirect("/");
});

app.post("/delete", (req, res) => {
  let nomeDoDeletado = req.body.deletar;
  nomeDoDeletado = nomeDoDeletado[0];
  console.log(nomeDoDeletado);

  db.query("DELETE FROM cartoes WHERE nome = $1", [nomeDoDeletado]);

  res.redirect("/");
});

app.post("/", async (req, res) => {
  const ocupacaoFiltrada = req.body.ocupacaoFiltrada;

  if (ocupacaoFiltrada === "Todas") {
    const result = await db.query("SELECT * FROM cartoes");
    const data = result.rows;

    const nomes = result.rows.map((pessoa) => pessoa.nome);
    const sobrenomes = result.rows.map((pessoa) => pessoa.sobrenome);
    const idades = result.rows.map((pessoa) => pessoa.idade);
    const cpfs = result.rows.map((pessoa) => pessoa.cpf);
    const ocupacoes = result.rows.map((pessoa) => pessoa.ocupacao);

    res.render("index.ejs", {
      nomes: nomes,
      sobrenomes: sobrenomes,
      idades: idades,
      cpfs: cpfs,
      ocupacoes: ocupacoes,
      data: data,
    });
  } else {
    const result = await db.query("SELECT * FROM cartoes WHERE ocupacao = $1", [
      ocupacaoFiltrada,
    ]);

    const data = result.rows;

    res.render("index.ejs", { data: data });
  }
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
