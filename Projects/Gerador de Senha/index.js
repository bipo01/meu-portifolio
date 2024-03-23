let passwordLengthEl = document.querySelector("#rangeInp").value;

let percent = passwordLengthEl;

document.querySelector("#security-indicator-bar").style.width = `${percent}%`;

function calculandoQualidade() {
    const passwordLength = document.querySelector("#rangeInp").value;
    passwordLengthEl = passwordLength;

    percent = Math.round(
        (passwordLength / 64) * 65 +
            (document.querySelector("#uppercase-check").checked ? 5 : 0) +
            (document.querySelector("#number-check").checked ? 15 : 0) +
            (document.querySelector("#symbol-check").checked ? 15 : 0)
    );

    if (percent >= 60) {
        document.querySelector(".bar").classList.add("safe");
        document.querySelector(".bar").classList.remove("warning");
        document.querySelector(".bar").classList.remove("critical");
    } else if (percent > 20 && percent < 60) {
        document.querySelector(".bar").classList.add("warning");
        document.querySelector(".bar").classList.remove("safe");
        document.querySelector(".bar").classList.remove("critical");
    } else {
        document.querySelector(".bar").classList.add("critical");
        document.querySelector(".bar").classList.remove("safe");
        document.querySelector(".bar").classList.remove("warning");
    }

    document.querySelector(
        "#security-indicator-bar"
    ).style.width = `${percent}%`;

    if (
        parseInt(
            document.querySelector("#security-indicator-bar").style.width
        ) >= 100
    ) {
        document
            .querySelector("#security-indicator-bar")
            .classList.add("completed");
    } else {
        document
            .querySelector("#security-indicator-bar")
            .classList.remove("completed");
    }

    document.querySelector("#password-length-text").textContent =
        passwordLength;

    if (passwordLength >= 45) {
        document.querySelector("#password").style.fontSize = "1.1rem";
    } else if (passwordLength > 20 && passwordLength < 45) {
        document.querySelector("#password").style.fontSize = "1.65rem";
    } else {
        document.querySelector("#password").style.fontSize = "2.3rem";
    }

    generatePassword();
}

document.querySelector("#rangeInp").addEventListener("input", () => {
    calculandoQualidade();
});

document.querySelector("#copy1").addEventListener("click", () => {
    navigator.clipboard.writeText(document.querySelector("#password").value);
});

function generatePassword() {
    //CALCULANDO A PORCENTAGEM DA QUALIDADE DA SENHA

    //CHECANDO SE O CHARS INCLUI OS CHECKBOXES PARA MEDIR A QUALIDADE DA SENHA

    //CRIANDO A SENHA
    let password = "";

    for (let i = 0; i < passwordLengthEl; i++) {
        const rn = Math.floor(Math.random() * chars.length);
        password += chars[rn];
    }

    document.querySelector("#password").value = password;

    console.log(password);
}

let chars = "abcdefghijklmnopqrstuvwxyz";

const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbersChars = "123456789";
const symbolsChars = "?!@&*()[]";

if (document.querySelector("#uppercase-check").checked) {
    chars += upperCaseChars;
} else {
    chars = chars.replace(upperCaseChars, "");
}
document.querySelector("#uppercase-check").addEventListener("click", () => {
    calculandoQualidade();

    if (document.querySelector("#uppercase-check").checked) {
        chars += upperCaseChars;
    } else {
        chars = chars.replace(upperCaseChars, "");
    }
    generatePassword();
});

if (document.querySelector("#number-check").checked) {
    chars += numbersChars;
} else {
    chars = chars.replace(numbersChars, "");
}
document.querySelector("#number-check").addEventListener("click", () => {
    calculandoQualidade();

    if (document.querySelector("#number-check").checked) {
        chars += numbersChars;
    } else {
        chars = chars.replace(numbersChars, "");
    }
    generatePassword();
});

if (document.querySelector("#symbol-check").checked) {
    chars += symbolsChars;
} else {
    chars = chars.replace(symbolsChars, "");
}
document.querySelector("#symbol-check").addEventListener("click", () => {
    calculandoQualidade();

    if (document.querySelector("#symbol-check").checked) {
        chars += symbolsChars;
    } else {
        chars = chars.replace(symbolsChars, "");
    }
    generatePassword();
});

document.querySelector("#renew").addEventListener("click", () => {
    calculandoQualidade();

    generatePassword();
});

calculandoQualidade();

generatePassword();
