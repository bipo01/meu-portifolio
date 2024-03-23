import express, { urlencoded } from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgres",
  port: 5432,
});

db.connect();

const result = await db.query("SELECT id FROM notes");
let ids = [];
result.rows.forEach((id) => {
  ids.push(id.id);
});

let id = ids[ids.length - 1] + 1;

console.log(ids);
console.log(id);

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM notes");
  let notes = [];
  result.rows.forEach((nota) => {
    notes.push(nota.note);
  });
  console.log(notes);
  res.render("index.ejs", { todasNotas: notes, todasIds: ids });
});

app.post("/addNote", (req, res) => {
  let inputNote = req.body["nota"];

  db.query("INSERT INTO notes(id, note) VALUES($1, $2)", [id, inputNote]);
  id++;
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  let idExibida = req.body.notaId;
  console.log(idExibida);

  db.query("DELETE FROM notes WHERE id = $1", [idExibida]);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
