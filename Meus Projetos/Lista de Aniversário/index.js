import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import pg from "pg";
import { format } from "date-fns";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "listaaniversario",
  password: "postgres",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const result = await db.query("SELECT nome, dataaniver FROM aniversariantes");

  const aniversariantes = result.rows;
  console.log(aniversariantes);

  const nomes = aniversariantes.map((nome) => nome.nome);
  console.log(nomes);

  const datasAniver = aniversariantes.map((data) => data.dataaniver);
  console.log(datasAniver);

  let dia = String(new Date().getDate());
  let mes = String(new Date().getMonth() + 1);
  let ano = String(new Date().getFullYear());

  if (mes.length < 2) {
    mes = `0${mes}`;
  }
  if (dia.length < 2) {
    dia = `0${dia}`;
  }

  const dataAtual = `${dia}/${mes}`;
  console.log(dataAtual);

  const fazHoje = aniversariantes.filter(
    (aniversariante) => aniversariante.dataaniver == dataAtual
  );

  const fazHojeNome = fazHoje.map((aniversariante) => aniversariante.nome);
  const fazHojeData = fazHoje.map(
    (aniversariante) => aniversariante.dataaniver
  );

  console.log(fazHoje);
  console.log(fazHojeNome);
  console.log(fazHojeData);

  res.render("home.ejs", {
    aniversariantes: aniversariantes,
    datasAniver: datasAniver,
    nomes: nomes,
    fazHoje: fazHoje,
    fazHojeData: fazHojeData,
    fazHojeNome: fazHojeNome,
  });
});

app.get("/novo-aniversariante", (req, res) => {
  res.render("novoAniver.ejs");
});

app.post("/novo-aniversariante", (req, res) => {
  const nome = req.body.nome;
  const dateAniver = req.body.dataAniver;
  const dateAniver1 = req.body.dataAniver1;

  const dataAniver = `${dateAniver}/${dateAniver1}`;

  db.query("INSERT INTO aniversariantes (nome, dataaniver) VALUES($1, $2)", [
    nome,
    dataAniver,
  ]);

  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const idDeletado = req.body.deletar;
  console.log(idDeletado);

  db.query("DELETE FROM aniversariantes WHERE nome = $1", [idDeletado]);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
