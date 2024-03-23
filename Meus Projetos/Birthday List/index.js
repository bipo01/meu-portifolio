const diaAtual = new Date().getDate();
console.log(diaAtual);

const mesAtual = new Date().getMonth() + 1;
console.log(mesAtual);

let dataAtual;

switch (mesAtual) {
  case 1:
    dataAtual = `${diaAtual} de Janeiro`;
    break;
  case 2:
    dataAtual = `${diaAtual} de Fevereiro`;
    break;
  case 3:
    dataAtual = `${diaAtual} de Março`;
    break;
  case 4:
    dataAtual = `${diaAtual} de Abril`;
    break;
  case 5:
    dataAtual = `${diaAtual} de Maio`;
    break;
  case 6:
    dataAtual = `${diaAtual} de Junho`;
    break;
  case 7:
    dataAtual = `${diaAtual} de Julho`;
    break;
  case 8:
    dataAtual = `${diaAtual} de Agosto`;
    break;
  case 9:
    dataAtual = `${diaAtual} de Setembro`;
    break;
  case 10:
    dataAtual = `${diaAtual} de Outubro`;
    break;
  case 11:
    dataAtual = `${diaAtual} de Novembro`;
    break;
  case 12:
    dataAtual = `${diaAtual} de Dezembro`;
    break;
}

/*
function Pessoa(nome, dataAniversario) {
  this.nome = nome;
  this.dataAniversario = dataAniversario;
}

const victorKrewer = new Pessoa("Victor Krewer", "15Janeiro");
console.log(victorKrewer);
*/

const listaAniversario = [
  { nome: "Victor Krewer", dataAniversario: "15 de Janeiro" },
  { nome: "Raíssa Fontoura", dataAniversario: "23 de Janeiro" },
  { nome: "Odara", dataAniversario: "23 de Janeiro" },
  { nome: "Vitor Hugo", dataAniversario: "2 de Fevereiro" },
  { nome: "Clariana Monteiro", dataAniversario: "3 de Fevereiro" },
  { nome: "Davi Gomes", dataAniversario: "10 de Fevereiro" },
  { nome: "Arianny Lima", dataAniversario: "11 de Fevereiro" },
  { nome: "Ana Helena", dataAniversario: "21 de Maio" },
  { nome: "Raiany Monteiro", dataAniversario: "13 de Junho" },
];

let aniversariantes = listaAniversario
  .filter((pessoa) => pessoa.dataAniversario === dataAtual)
  .map((pessoa) => pessoa.nome);

console.log(aniversariantes.length);

for (index in listaAniversario) {
  let infoPessoa = document.createElement("p");
  infoPessoa.innerHTML = `${listaAniversario[index].nome} faz aniversário dia ${listaAniversario[index].dataAniversario} <hr>`;
  document.querySelector(".container1").appendChild(infoPessoa);
}

console.log(dataAtual);

for (valor of aniversariantes) {
  var aniversariantesDoDia = document.createElement("p");
  aniversariantesDoDia.innerHTML = `${valor} está fazendo aniversário hoje! Viva!`;
  document.querySelector(".container").appendChild(aniversariantesDoDia);
}

if (aniversariantes.length === 0) {
  document.querySelector(".container").style.display = "none";
}
