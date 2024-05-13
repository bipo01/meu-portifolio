const alarmes = document.querySelector(".alarmes");
const horarios = [];
let audio;

let hora = `${new Date().getHours()}`;
let minuto = `${new Date().getMinutes()}`;
let segundo = `${new Date().getSeconds()}`;

if (hora.length == 1) {
    hora = `0${hora}`;
}
if (minuto.length == 1) {
    minuto = `0${minuto}`;
}
if (segundo.length == 1) {
    segundo = `0${segundo}`;
}

const agora = `${hora}:${minuto}:${segundo}`;

document.querySelector("h3").textContent = `${agora}`;

let ativarAlarme = [];
let indexesHorarios = [];

document.querySelector("#adicionarAlarme").addEventListener("click", (e) => {
    e.preventDefault();
    const horaInp = document.querySelector("#horaInp");
    const minInp = document.querySelector("#minInp");

    console.log(
        horarios.some(
            (arr) => arr.includes(horaInp.value) && arr.includes(minInp.value)
        )
    );

    if (horarios.length > 0) {
        if (
            horarios.some(
                (arr) =>
                    arr.includes(horaInp.value) && arr.includes(minInp.value)
            )
        ) {
            return;
        } else {
            const html = `
        <div class="alarme">
        <div class="alarmeIn">
            <span class="horaSpan">${horaInp.value}</span>
            <span class="separar">:</span>
            <span class="minutoSpan">${minInp.value}</span>
        </div>
        
        <input type="checkbox" class="onOrOff" />
        <button class="deletarBtn" hora="${horaInp.value}" minuto="${minInp.value}">🗑️</button>
    </div>
        `;

            alarmes.insertAdjacentHTML("afterbegin", html);

            horarios.push([horaInp.value, minInp.value]);

            console.log(horarios);
            ativarAlarme.push(document.querySelectorAll(".alarme")[0]);
            console.log(ativarAlarme);

            document.querySelectorAll(".deletarBtn").forEach((btn, i) => {
                btn.addEventListener("click", () => {
                    const horaInp = btn.getAttribute("hora");
                    const minInp = btn.getAttribute("minuto");
                    console.log(horaInp, minInp);

                    horarios.forEach((arr) => {
                        if (arr.includes(horaInp) && arr.includes(minInp)) {
                            console.log(arr);
                            const index = horarios.findIndex(
                                (el) => el === arr
                            );
                            console.log(index);
                            horarios.splice(index, 1);
                            ativarAlarme.splice(index, 1);
                        }
                    });
                    console.log(ativarAlarme);
                    console.log(horarios);
                    btn.parentElement.remove();
                });
            });
        }
    } else {
        const html = `
        <div class="alarme">
        <div class="alarmeIn">
            <span class="horaSpan">${horaInp.value}</span>
            <span class="separar">:</span>
            <span class="minutoSpan">${minInp.value}</span>
        </div>
        
        <input type="checkbox" class="onOrOff" />
        <button class="deletarBtn" hora="${horaInp.value}" minuto="${minInp.value}">🗑️</button>
    </div>
        `;

        alarmes.insertAdjacentHTML("afterbegin", html);

        horarios.push([horaInp.value, minInp.value]);

        console.log(horarios);
        ativarAlarme.push(document.querySelectorAll(".alarme")[0]);
        console.log(ativarAlarme);

        document.querySelectorAll(".deletarBtn").forEach((btn, i) => {
            btn.addEventListener("click", () => {
                const horaInp = btn.getAttribute("hora");
                const minInp = btn.getAttribute("minuto");
                console.log(horaInp, minInp);

                horarios.forEach((arr) => {
                    if (arr.includes(horaInp) && arr.includes(minInp)) {
                        console.log(arr);
                        const index = horarios.findIndex((el) => el === arr);
                        console.log(index);
                        horarios.splice(index, 1);
                        ativarAlarme.splice(index, 1);
                    }
                });
                console.log(ativarAlarme);
                console.log(horarios);
                btn.parentElement.remove();
            });
        });
    }

    horaInp.value = "";
    minInp.value = "";
});

setInterval(() => {
    let hora = `${new Date().getHours()}`;
    let minuto = `${new Date().getMinutes()}`;
    let segundo = `${new Date().getSeconds()}`;

    if (hora.length == 1) {
        hora = `0${hora}`;
    }
    if (minuto.length == 1) {
        minuto = `0${minuto}`;
    }
    if (segundo.length == 1) {
        segundo = `0${segundo}`;
    }

    const agora = `${hora}:${minuto}:${segundo}`;

    document.querySelector("h3").textContent = `${agora}`;

    if (ativarAlarme.length > 0) {
        ativarAlarme.forEach((el, i) => {
            if (el.children[1].checked) {
                horarios.forEach((arr) => {
                    if (
                        arr.includes(hora) &&
                        arr.includes(minuto) &&
                        el.children[0].children[0].textContent == hora &&
                        el.children[0].children[2].textContent == minuto
                    ) {
                        audio = new Audio(
                            "./ambient-flute-notification-3-185275.mp3"
                        );

                        audio.play();

                        console.log("Tocando");
                    }
                });
            }
        });
    }
}, 1000);
