const operatorsBtn = document.querySelectorAll(".right>button");
const digitBtn = document.querySelectorAll(".digit");
const displayCurrent = document.querySelector(".current");
const displayPrevious = document.querySelector(".previous");
const equalsBtn = document.querySelector(".equal");
let currentNumber = "";
let previousNumber = "";
let operator = "";

const add = function (num1, num2) {
  return num1 + num2;
};
const subtract = function (num1, num2) {
  return num1 - num2;
};
const multiply = function (num1, num2) {
  return num1 * num2;
};
const divide = function (num1, num2) {
  return num1 / num2;
};
const allClear = function () {
  currentNumber = "";
  previousNumber = "";
  operator = "";
};
const clear = function () {
  currentNumber = currentNumber.toString().slice(0, -1);
};
const chooseOpeator = function (operat) {
  if (previousNumber !== "") {
    operate();
  }
  operator = operat;
  previousNumber = currentNumber;
  currentNumber = "";
};

const appendNumber = function (number) {
  if (number === "." && currentNumber.includes(".")) return;
  currentNumber = currentNumber.toString() + number.toString();
};
const updateDisplay = function () {
  displayCurrent.innerHTML = currentNumber;
  displayPrevious.innerHTML = `${previousNumber} ${operator}`;
};
const operate = function () {
  let computation;
  let current = +currentNumber;
  let previous = +previousNumber;
  if (isNaN(current) || isNaN(previous)) return;
  switch (operator) {
    case "+":
      computation = add(current, previous);
      break;
    case "-":
      computation = subtract(previous, current);
      break;
    case "×":
      computation = multiply(previous, current);
      break;
    case "÷":
      computation = divide(previous, current);
      break;
    default:
      return;
  }
  currentNumber = computation;
  previousNumber = "";
  operator = "";
};

digitBtn.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
    updateDisplay();
  });
});

operatorsBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "AC") {
      allClear();
      updateDisplay();
      return;
    } else if (btn.textContent === "C") {
      clear();
      updateDisplay();
      return;
    } else {
      chooseOpeator(btn.textContent);
      updateDisplay();
      return;
    }
  });
});

equalsBtn.addEventListener("click", () => {
  operate();
  updateDisplay();
});