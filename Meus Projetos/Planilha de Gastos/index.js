import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import pg from "pg";

const app = express();
const port = 3000;

let isLogged = false;

const db = new pg.Client({
    user: "postgres",
    password: "JSBispo121511!",
    database: "projetos",
    host: "localhost",
    port: 5432,
});
db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/login", (req, res) => {
    res.render("login.ejs");
});
app.get("/register", (req, res) => {
    res.render("register.ejs");
});

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const data = await db.query("SELECT * FROM usuarios WHERE email = $1", [
        email,
    ]);

    const dataRows = data.rows;

    console.log(data.rows);
    console.log(data.rows.length);

    if (data.rows.length > 0) {
        if (password === data.rows[0].senha) {
            const idUser = data.rows[0].id;

            const result = await db.query(
                `select * from gastos where id_usuario = $1 order by datadogasto`,
                [idUser]
            );

            //datas editadas
            const datasN = result.rows.map((gasto) => gasto.datadogasto);
            const datas = [];
            for (let i = 0; i < datasN.length; i++) {
                datasN[i] = datasN[i].split("-");
                console.log(datasN[i]);
                const dia = datasN[i][2];
                const mes = datasN[i][1];
                const ano = datasN[i][0];
                const dataPadrao = `${dia}/${mes}/${ano}`;

                datas.push(dataPadrao);
            }

            //gastos e gastoTotal
            const gastos = result.rows.map((gasto) => Number(gasto.valorgasto));
            console.log(gastos);
            let gastoTotal;
            if (gastos.length > 0) {
                gastoTotal = gastos.reduce((ac, cn) => ac + cn);
            }
            console.log(gastoTotal);

            const resultSaldo = await db.query(
                "select saldo from saldos where id_usuario = $1",
                [idUser]
            );
            //saldo
            let saldoRows = resultSaldo.rows.map((s) => s.saldo);
            let saldoInicial = saldoRows[0];
            let saldo = saldoRows[0] - (gastoTotal ? gastoTotal : 0);
            console.log(saldoRows[0]);

            let classeSaldo;
            if (saldo >= (50 / 100) * saldoRows[0]) {
                classeSaldo = "saldoVerde";
            } else if (
                saldo < (50 / 100) * saldoRows[0] &&
                saldo >= (20 / 100) * saldoRows[0]
            ) {
                classeSaldo = "saldoLaranja";
            } else if (saldo < (20 / 100) * saldoRows[0]) {
                classeSaldo = "saldoVermelho";
            }

            res.render("index.ejs", {
                result: result,
                dataRows: dataRows,
                saldo: saldo,
                datas: datas,
                classeSaldo: classeSaldo,
                saldoInicial: saldoInicial,
                gastoTotal: gastoTotal,
            });
        } else {
            res.redirect("/login");
        }
    } else {
        res.redirect("/register");
    }
});

app.post("/register", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const result = await db.query(
            "SELECT * FROM usuarios WHERE email = $1",
            [email]
        );

        if (result.rows.length > 0) {
            // O email já está cadastrado
            res.redirect("/register");
            return;
        }

        await db.query("INSERT INTO usuarios (email, senha) VALUES($1, $2)", [
            email,
            password,
        ]);

        res.redirect("/login");
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        res.redirect("/register");
    }
});

app.post("/add", async (req, res) => {
    const datadogasto = req.body.datadogasto;
    const valorgasto = req.body.valorgasto;
    const categoria = req.body.categoria;
    const idUsuario = req.body.idUsuario;

    console.log(valorgasto, categoria, datadogasto, idUsuario);

    db.query(
        "INSERT INTO gastos(datadogasto, valorgasto, categoria, id_usuario) VALUES ($1, $2, $3, $4)",
        [datadogasto, valorgasto, categoria, idUsuario]
    );

    res.redirect("/login");
});

app.post("/saldo", async (req, res) => {
    const idUsuario = req.body.idUsuario;
    const saldo = req.body.saldo;

    console.log(idUsuario, saldo);

    const resultSaldo = await db.query(
        "select saldo from saldos where id_usuario = $1",
        [idUsuario]
    );

    console.log(resultSaldo.rows);

    if (resultSaldo.rows.length) {
        if (saldo > 0) {
            await db.query(
                "UPDATE saldos SET saldo = $1 WHERE id_usuario = $2",
                [saldo, idUsuario]
            );
        }
    } else {
        await db.query("INSERT INTO saldos(saldo, id_usuario) VALUES($1, $2)", [
            saldo,
            idUsuario,
        ]);
    }

    res.redirect("/login");
});

app.post("/delete", (req, res) => {
    const deletado = req.body.deletado;

    db.query("DELETE FROM gastos WHERE id = $1", [deletado]);

    res.redirect("/login");
});

app.post("/editdata", (req, res) => {
    const itemEditado = req.body.itemEditado;
    const idItemEditado = req.body.idItemEditado;

    db.query("UPDATE gastos SET datadogasto = $1 WHERE id = $2", [
        itemEditado,
        idItemEditado,
    ]);

    res.redirect("/planilha");
});

app.post("/editvalorgasto", (req, res) => {
    const itemEditado = req.body.itemEditado;
    const idItemEditado = req.body.idItemEditado;

    db.query("UPDATE gastos SET valorgasto = $1 WHERE id = $2", [
        itemEditado,
        idItemEditado,
    ]);

    res.redirect("/");
});

app.post("/categoriaeditada", (req, res) => {
    const itemEditado = req.body.itemEditado;
    const idItemEditado = req.body.idItemEditado;

    db.query("UPDATE gastos SET categoria = $1 WHERE id = $2", [
        itemEditado,
        idItemEditado,
    ]);

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
