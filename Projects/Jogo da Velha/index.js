let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.querySelector("#newgame");
let restartBtn = document.querySelector("#restart");
let msgRef = document.querySelector("#message");

let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

let xTurn = true;
let count = 0;
let xVenceu = [];
let oVenceu = [];

let xArr = [];
let oArr = [];

btnRef.forEach((element, i) => {
    element.addEventListener("click", () => {
        if (!element.textContent) {
            count++;

            if (xTurn) {
                xTurn = false;
                element.textContent = "X";

                xArr.push(i);
                xArr.sort((a, b) => a - b);

                for (let j = 0; j < winningPattern.length; j++) {
                    for (let i = 0; i < winningPattern[j].length; i++) {
                        if (xArr.includes(winningPattern[j][i])) {
                            xVenceu.push("True");
                        }
                    }

                    if (xVenceu.length === 3) {
                        console.log("X Ganhou");
                        popupRef.classList.remove("hide");
                        msgRef.textContent = "X Ganhou!";
                    } else {
                        xVenceu = [];
                        if (count === 9) {
                            popupRef.classList.remove("hide");
                            msgRef.textContent = "Empatou";
                        }
                    }
                }
            } else {
                xTurn = true;
                element.textContent = "O";

                oArr.push(i);
                oArr.sort((a, b) => a - b);
                console.log(oArr);

                for (let j = 0; j < winningPattern.length; j++) {
                    for (let i = 0; i < winningPattern[j].length; i++) {
                        if (oArr.includes(winningPattern[j][i])) {
                            oVenceu.push("True");
                        }
                    }

                    if (oVenceu.length === 3) {
                        console.log("O Ganhou");
                        popupRef.classList.remove("hide");
                        msgRef.textContent = "O Ganhou!";
                    } else {
                        oVenceu = [];
                        if (count === 9) {
                            popupRef.classList.remove("hide");
                            msgRef.textContent = "Empatou";
                        }
                    }
                }
            }
        }
    });
});

restartBtn.addEventListener("click", () => {
    location.reload();
});
newgameBtn.addEventListener("click", () => {
    location.reload();
});
