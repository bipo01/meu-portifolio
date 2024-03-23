/*const quiz1 = new Map([
    ["question", "Quem foi a primeira pessoa a viajar no Espaço?"],
    ["a)", "Yuri Gagarin"],
    ["b)", "Cadela Laika"],
    ["c)", "Neil Armstrong"],
    ["Correct", "a)"],
    [true, "Você acertou!"],
    [false, "Errou..."],
]);

const quiz2 = new Map([
    ["question", "Qual a montanha mais alta do mundo?"],
    ["a)", "Pico da Neblina"],
    ["b)", "Monte Everest"],
    ["c)", "Monte Chimborazo"],
    ["Correct", "b)"],
    [true, "Você acertou!"],
    [false, "Errou..."],
]);

const quiz3 = new Map([
    ["question", "Onde se localiza Machu Picchu?"],
    ["a)", "Colômbia"],
    ["b)", "China"],
    ["c)", "Peru"],
    ["Correct", "c)"],
    [true, "Você acertou!"],
    [false, "Errou..."],
]);*/

const quizes = [
    {
        id: 1,
        question: "Quem foi a primeira pessoa a viajar no Espaço?",
        respostas: ["Yuri Gagarin", "Cadela Laika", "Neil Armstrong"],
        correct: "Yuri Gagarin",
    },
    {
        id: 2,
        question: "Qual a montanha mais alta do mundo?",
        respostas: ["Pico da Neblina", "Monte Everest", "Monte Chimborazo"],
        correct: "Monte Everest",
    },
    {
        id: 3,
        question: "Onde se localiza Machu Picchu?",
        respostas: ["Colômbia", "China", "Peru"],
        correct: "Peru",
    },
];

import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    const rn = Math.floor(Math.random() * quizes.length);
    console.log(quizes);

    res.json(quizes[rn]);
});

app.post("/novoQuiz", (req, res) => {
    const todasRespostas = [
        req.body.respostaA,
        req.body.respostaB,
        req.body.respostaC,
    ];

    console.log(todasRespostas);

    const novoQuiz = {
        id: quizes.length + 1,
        question: req.body.question,
        respostas: todasRespostas,
        correct: req.body.correct,
    };

    quizes.push(novoQuiz);

    res.json(novoQuiz);
});

app.delete("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    const excluido = quizes.find((quiz) => quiz.id === id);
    console.log(excluido);

    quizes.splice(quizes.indexOf(excluido), 1);

    res.json(quizes);
});

app.listen(port, () => {
    console.log(`API running on port ${port}`);
});
