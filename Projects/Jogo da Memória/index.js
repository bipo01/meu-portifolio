const cards = document.querySelectorAll(".card");
let arr = [
    "img-1",
    "img-2",
    "img-3",
    "img-4",
    "img-5",
    "img-6",
    "img-7",
    "img-8",
    "img-1",
    "img-2",
    "img-3",
    "img-4",
    "img-5",
    "img-6",
    "img-7",
    "img-8",
];
arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
console.log(arr);

const pairs = [];
const reveals = [];
const indexes = [];

let count = 0;

cards.forEach((card, i) => {
    card.children[1].children[0].src =
        card.children[1].children[0].src.split("/").slice(0, -1).join("/") +
        "/" +
        arr[i] +
        ".png";

    card.addEventListener("click", () => {
        count++;
        card.children[1].style.transform = "rotateY(0)";

        reveals.push(card);
        indexes.push(i);

        const transformacao = `${card.children[1].style.transform}`;

        if (transformacao === "rotateY(0deg)") {
            card.classList.add("revelado");
        }

        if (count === 2) {
            if (
                reveals[0].children[1].children[0].src ===
                    reveals[1].children[1].children[0].src &&
                indexes[0] !== indexes[1]
            ) {
                pairs.push(reveals[0], reveals[1]);
                console.log(pairs.length);

                reveals.splice(0, reveals.length);
                indexes.splice(0, reveals.length);
            } else {
                setTimeout(() => {
                    reveals[0].children[1].style.transform = "rotateY(90deg)";
                    reveals[1].children[1].style.transform = "rotateY(90deg)";

                    reveals[0].classList.remove("revelado");
                    reveals[1].classList.remove("revelado");

                    reveals.splice(0, reveals.length);
                    indexes.splice(0, reveals.length);
                }, 600);
            }

            if (pairs.length === 16) {
                setTimeout(() => {
                    document
                        .querySelector(".wrapper")
                        .insertAdjacentHTML(
                            "beforeend",
                            "<h2>Parabéns!</h2> <button onclick='location.reload()'>Recomeçar</button>"
                        );
                }, 400);
            }
            count = 0;
        }
    });
});
