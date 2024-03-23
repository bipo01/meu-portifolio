const palavras = [
    { palavra: "banana", dica: "Fruta" },
    { palavra: "melancia", dica: "Fruta" },
    { palavra: "goiaba", dica: "Fruta" },
    { palavra: "abacate", dica: "Fruta" },
    { palavra: "laranja", dica: "Fruta" },
    { palavra: "uva", dica: "Fruta" },
    { palavra: "jaca", dica: "Fruta" },
    { palavra: "abacaxi", dica: "Fruta" },
    { palavra: "escada", dica: "Objeto" },
    { palavra: "escova", dica: "Objeto" },
    { palavra: "espelho", dica: "Objeto" },
    { palavra: "mouse", dica: "Objeto" },
    { palavra: "celular", dica: "Objeto" },
    { palavra: "violino", dica: "Objeto" },
    { palavra: "brasil", dica: "CEP" },
    { palavra: "espanha", dica: "CEP" },
    { palavra: "peru", dica: "CEP" },
    { palavra: "chile", dica: "CEP" },
    { palavra: "argentina", dica: "CEP" },
    { palavra: "noruega", dica: "CEP" },
    { palavra: "cuba", dica: "CEP" },
];

import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import axios from "axios";

const app = express();
const port = 4000;

app.get("/", (req, res) => {
    const rn = Math.floor(Math.random() * palavras.length);
    const palavraEscolhida = palavras[rn];

    res.json(palavraEscolhida);
});

app.get("/filter", (req, res) => {
    const dica = req.query.dica;
    const palavrasFiltradas = palavras.filter(
        (palavra) => palavra.dica === dica
    );

    console.log(palavrasFiltradas);

    const rn = Math.floor(Math.random() * palavrasFiltradas.length);

    const palavraEscolhida = palavrasFiltradas[rn];
    console.log(palavraEscolhida);

    res.json(palavraEscolhida);
});

app.listen(port, () => {
    console.log(`API on port ${port}`);
});
