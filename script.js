/**
 * PART B: Create the add, subtract, multiply and divide functions below
 */

/**
 * PART A: Convert all the following functions to use arrow functions
 * Note: The following calculator is taken from this tutorial:
 * https://freshman.tech/calculator/
 */

const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

const inputDigit = (digit) => {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
};

const inputDecimal = (dot) => {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
};

const handleOperator = (nextOperator) => {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
};

const calculate = (firstOperand, secondOperand, operator) => {
  if (operator === "+") {
    if (typeof add === "undefined") {
      throw new Error("add function is not declared");
    }
    return add(firstOperand, secondOperand);
  } else if (operator === "-") {
    if (typeof subtract === "undefined") {
      throw new Error("subtract function is not declared");
    }
    return subtract(firstOperand, secondOperand);
  } else if (operator === "*") {
    if (typeof multiply === "undefined") {
      throw new Error("multiply function is not declared");
    }
    return multiply(firstOperand, secondOperand);
  } else if (operator === "/") {
    if (typeof divide === "undefined") {
      throw new Error("divide function is not declared");
    }
    return divide(firstOperand, secondOperand);
  }

  return secondOperand;
};

const resetCalculator = () => {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
};

const updateDisplay = () => {
  const display = document.querySelector(".calculator-screen");
  display.value = calculator.displayValue;
};

const add = (num1, num2) => num1 + num2;

const subtract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) => num1 / num2;

updateDisplay();

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", (event) => {
  const { target } = event;
  const { value } = target;
  if (!target.matches("button")) {
    return;
  }

  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperator(value);
      break;
    case ".":
      inputDecimal(value);
      break;
    case "all-clear":
      resetCalculator();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});
