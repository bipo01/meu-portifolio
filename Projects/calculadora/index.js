const display = document.getElementById("display");
const caracteres = ["+", "-", "*", "/"];

function appendToDisplay(input) {
  if (display.value == "Erro") {
    display.value = "";
  }

  if (caracteres.includes(input)) {
    if (isFinite(display.value.split("").at(-1))) {
      display.value += input;
    }
  } else if (input != ".") {
    display.value += input;
  }

  if (
    display.value
      .split(/[\/\+\-\*]/)
      .at(-1)
      .includes(".")
  ) {
    console.log("Existe");
  } else {
    if (input == ".") {
      if (isFinite(display.value.split("").at(-1))) {
        display.value += input;
      }
    }
  }
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Erro";
    setTimeout(() => {
      if (display.value == "Erro") {
        display.value = "";
      }
    }, 1500);
  }
}
