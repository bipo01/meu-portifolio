const valores = [
  "1",
  "1",
  "2",
  "2",
  "3",
  "3",
  "4",
  "4",
  "5",
  "5",
  "6",
  "6",
  "7",
  "7",
  "8",
  "8",
];
const total = new Set(valores);
let randons = [];
let vidas;

document.querySelectorAll(".btnsDificuldade").forEach((el) => {
  el.addEventListener("click", () => {
    const nivel = el.textContent;
    console.log(nivel);
    switch (nivel) {
      case "Fácil":
        vidas = 20;
        break;

      case "Médio":
        vidas = 15;
        break;

      case "Difícil":
        vidas = 10;
        break;
    }

    document.querySelector(".container").classList.remove("hidden");
    document.querySelector(".header").classList.remove("hidden");
    document.querySelector(".dificuldade").classList.add("hidden");

    document.querySelector("#vidas").textContent = vidas;
  });
});

while (randons.length < valores.length) {
  const random = Math.floor(Math.random() * valores.length);
  if (!randons.includes(random)) {
    randons.push(random);
  }
}

for (let i = 0; i < randons.length; i++) {
  document.querySelector(".container").insertAdjacentHTML(
    "afterbegin",
    `
      <div class="div-click">
                  <div class="amostra">?</div>
                  <div class="conteudo hidden"><img src="./img/img-${
                    valores[randons[i]]
                  }.png" alt=""></div>
              </div>
              `
  );
}

const divs = document.querySelectorAll(".div-click");
const amostras = document.querySelectorAll(".amostra");
const conteudos = document.querySelectorAll(".conteudo");

let selecionados = [];
let acertos = [];

divs.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!btn.classList.contains("selecionado") && selecionados.length < 2) {
      btn.children[0].classList.add("hidden");
      btn.children[1].classList.remove("hidden");

      btn.classList.add("selecionado");

      selecionados.push(btn);
      console.log(selecionados[0]);

      if (selecionados.length === 2) {
        if (
          selecionados[0].querySelector(".conteudo").querySelector("img")
            .src !==
          selecionados[1].querySelector(".conteudo").querySelector("img").src
        ) {
          vidas--;
          document.querySelector("#vidas").textContent = vidas;

          setTimeout(() => {
            divs.forEach((btn) => {
              if (!acertos.includes(btn)) {
                btn.children[0].classList.remove("hidden");
                btn.children[1].classList.add("hidden");
                btn.classList.remove("selecionado");
              }

              selecionados = [];
            });
          }, 500);
        } else {
          acertos.push(...selecionados);
          selecionados = [];
        }
      }
    }
    if (acertos.length === valores.length) {
      document.querySelector("body").innerHTML = `
                  <div class="resultado">
                  <h2>Você ganhou!!!</h2>
                      <button class="reset">Recomeçar</button>
                      </div>`;
      document.querySelector("body").classList.add("vencedor");
    }
    if (vidas == 0) {
      document.querySelector("body").innerHTML = `
              <div class="resultado">
              <h2>Você perdeu...</h2>
                  <button class="reset">Recomeçar</button>
                  </div>
                  `;
      document.querySelector("body").classList.add("perdedor");
    }
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("reset")) {
    location.reload();
  }
});
