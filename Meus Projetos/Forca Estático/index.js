const palavras = [
    "banana",
    "peixe",
    "laranja",
    "violino",
    "celular",
    "abacate",
];

const randomNumber = Math.floor(Math.random() * palavras.length);

let palavraEscolhida = palavras[randomNumber];
let palavraEscolhidaOriginal = [];

//Loop que cria um array com as letras da palavra escolhida
for (const letra of palavraEscolhida) {
    const letraPalavra = document.createElement("p");
    letraPalavra.textContent = letra;
    letraPalavra.classList.add("hidden");
    letraPalavra.classList.add(letraPalavra.textContent);

    document.querySelector("h2").appendChild(letraPalavra);
}

//Funcionalidade de Click que checa se a letra faz parte da Palavra Escolhida

const alfabeto = document.querySelector(".alfabeto");
alfabeto.addEventListener("click", (e) => {
    const element = e.target.textContent;

    if (palavraEscolhida.includes(element)) {
        if (!palavraEscolhidaOriginal.includes(element)) {
            for (
                let i = 0;
                i < document.querySelectorAll(`.${element}`).length;
                i++
            ) {
                document
                    .querySelectorAll(`.${element}`)
                    [i].classList.remove("hidden");
                document.querySelectorAll(`.${element}`)[i].style.borderBottom =
                    "none";

                palavraEscolhidaOriginal.push(element);
                console.log(palavraEscolhidaOriginal.sort());
            }
        }

        if (palavraEscolhida.length === palavraEscolhidaOriginal.length) {
            document.querySelector("h2").textContent = palavraEscolhida;
            document.querySelector("h2").classList.add("venceu");

            document.querySelector(".alfabeto").innerHTML =
                " <button class='recomecar'>Recomeçar</button>";

            document
                .querySelector(".alfabeto")
                .addEventListener("click", () => {
                    location.reload();
                });
        }
    }
});

//Tirando função de click
for (let i = 0; i < document.querySelectorAll(".alfabeto p").length; i++) {
    document
        .querySelectorAll(".alfabeto p")
        [i].addEventListener("click", () => {
            document
                .querySelectorAll(".alfabeto p")
                [i].classList.add("clicado");
            document
                .querySelectorAll(".alfabeto p")
                [i].classList.remove("pSemClique");
        });
}
