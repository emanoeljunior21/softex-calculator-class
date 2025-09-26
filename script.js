let displayValue = "0";
let currentInput = "0";
let operator = "";
let previousInput = "";
let shouldResetDisplay = false;

const displayElement = document.getElementById("display-value");

function updateDisplay() {
  displayElement.textContent = displayValue;
}

function appendToDisplay(value) {
  if (shouldResetDisplay) {
    displayValue = "";
    shouldResetDisplay = false;
  }

  if (value === "." && displayValue.includes(".")) {
    return;
  }

  if (displayValue === "0" && value !== ".") {
    displayValue = "";
  }

  const lastChar = displayValue.slice(-1);
  if (
    ["+", "-", "*", "/"].includes(lastChar) &&
    ["+", "-", "*", "/"].includes(value)
  ) {
    displayValue = displayValue.slice(0, -1) + value;
  } else {
    displayValue += value;
  }

  updateDisplay();
}

function clearDisplay() {
  displayValue = "0";
  currentInput = "0";
  operator = "";
  previousInput = "";
  shouldResetDisplay = false;
  updateDisplay();
}

function backspace() {
  if (displayValue.length > 1) {
    displayValue = displayValue.slice(0, -1);
  } else {
    displayValue = "0";
  }
  updateDisplay();
}

function calculate() {
  try {
    let expression = displayValue.replace(/×/g, "*");

    if (["+", "-", "*", "/"].includes(expression.slice(-1))) {
      throw new Error("Expressão inválida");
    }

    if (/(\+|\*|\/){2,}/.test(expression)) {
      throw new Error("Expressão inválida");
    }

    const result = eval(expression);

    displayValue = parseFloat(result.toFixed(10)).toString();
    updateDisplay();

    shouldResetDisplay = true;
  } catch (error) {
    displayValue = "Erro";
    updateDisplay();
    setTimeout(() => {
      clearDisplay();
    }, 1500);
  }
}

updateDisplay();

document.addEventListener("keydown", function (event) {
  if (/[0-9]/.test(event.key)) {
    appendToDisplay(event.key);
  } else if (event.key === ".") {
    appendToDisplay(".");
  } else if (event.key === "+") {
    appendToDisplay("+");
  } else if (event.key === "-") {
    appendToDisplay("-");
  } else if (event.key === "*") {
    appendToDisplay("*");
  } else if (event.key === "/") {
    appendToDisplay("/");
  } else if (event.key === "Enter" || event.key === "=") {
    calculate();
  } else if (event.key === "Escape") {
    clearDisplay();
  } else if (event.key === "Backspace") {
    backspace();
  }
});
