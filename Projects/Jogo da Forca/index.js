const palavras = ["BANANA", "LARANJA", "BRAZIL", "CALABREZA"];
const palavraEscolhida = palavras[Math.floor(Math.random() * palavras.length)];

console.log(palavraEscolhida);

const palavraEscondida = palavraEscolhida.split("");

console.log(palavraEscondida);

//////////////////////////////////////////////////////////////////////////////////////////////
const palavra = document.querySelector("#user-input-section");
const letterContainer = document.querySelector("#letter-container");
const newGameContainer = document.querySelector("#new-game-container");
const newGameBtn = document.querySelector("#new-game-button");
const resultado = document.querySelector("#result-text");
let allLetters;
let chance = 5;

for (let i = 65; i < 91; i++) {
    const buttonLetter = document.createElement("button");
    buttonLetter.classList.add("letters");

    buttonLetter.innerText = String.fromCharCode(i);

    letterContainer.appendChild(buttonLetter);

    allLetters = [...document.querySelectorAll(".letters")];
}

allLetters.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        if (!btn.classList.contains("clicado")) {
            if (palavraEscolhida.includes(btn.textContent)) {
                palavraEscondida.forEach((letra, i) => {
                    if (letra === btn.textContent) {
                        return (palavraEscondida1[i] = letra);
                    }
                });
            } else {
                chance--;

                document.querySelector(
                    "#chances"
                ).textContent = `Chances: ${chance}`;
                if (chance === 0) {
                    resultado.textContent = "Você errou...";
                    newGameContainer.classList.remove("hide");
                    letterContainer.classList.add("hide");
                }
            }
            palavra.textContent = palavraEscondida1.join("");
            if (palavra.textContent.includes("-")) {
            } else {
                resultado.textContent = "Você acertou!!!";

                newGameContainer.classList.remove("hide");
                letterContainer.classList.add("hide");
            }
        }

        btn.classList.add("clicado");
    });
});

const palavraEscondida1 = palavraEscondida.map((letra) => (letra = "-"));

palavra.textContent = palavraEscondida1.join("");

newGameBtn.addEventListener("click", () => {
    location.reload();
});
