const display = document.getElementById("display");
const numbers = document.querySelectorAll("[id*=key]");
const operators = document.querySelectorAll("[id*=operator]");

let newNumber = true;
let operator;
let previousNumber;

const newDOMById = (id, event) => {
  document.getElementById(id).addEventListener("click", event);
}

const operatorPending = () => operator !== undefined;

const calcular = () => {
  if (operatorPending()) {
    const currentNumber = parseFloat(display.textContent.replace(",", "."));
    newNumber = true;

    if (operator == "+") {
      updateDisplay(previousNumber + currentNumber);
    }
    else if (operator == "-") {
      updateDisplay(previousNumber - currentNumber);
    }
    else if (operator == "x") {
      updateDisplay(previousNumber * currentNumber);
    }
    else if (operator == "/") {
      updateDisplay(previousNumber / currentNumber);
    }
    else if (operator == "%") {
      updateDisplay((previousNumber * currentNumber) / 100);
    }
  }
};

const updateDisplay = (text) => {
  if (newNumber) {
    display.textContent = text.toLocaleString("pt-BR");
    newNumber = false;
  } else {
    display.textContent += text.toLocaleString("pt-BR");
  }
};

const addNumber = (event) => updateDisplay(event.target.textContent);

numbers.forEach(number => number.addEventListener("click", addNumber));

const selectOperator = (event) => {
  if (!newNumber) {
    newNumber = true;
    operator = event.target.textContent;
    previousNumber = parseFloat(display.textContent.replace(",", "."));
  }
};

operators.forEach(operator => operator.addEventListener("click", selectOperator));

const activeResult = () => {
  calcular();
  operator = undefined;
};
newDOMById("result", activeResult);

const clearCalc = () => {
  display.textContent = "";
  operator = undefined;
  previousNumber = undefined;
};
newDOMById("clearAll", clearCalc);

const deleteLastNumber = () => {
  display.textContent = display.textContent.slice(0, -1);
};
newDOMById("backspace", deleteLastNumber);

const reverseSign = () => {
  newNumber = true;
  updateDisplay(display.textContent * -1);
};
newDOMById("reverseSign", reverseSign);

const decimal = () => display.textContent.indexOf(",") !== -1;

const valueInDisplay = () => display.textContent.length > 0;

const addDecimal = () => {
  if (!decimal()) {
    if (valueInDisplay()) {
      updateDisplay(",");
    } else {
      updateDisplay("0,");
    }
  }
};
newDOMById("decimal", addDecimal);

const mapKeys = {
  "0": "key0",
  "1": "key1",
  "2": "key2",
  "3": "key3",
  "4": "key4",
  "5": "key5",
  "6": "key6",
  "7": "key7",
  "8": "key8",
  "9": "key9",
  "+": "operatorPlus",
  "-": "operatorMinus",
  "x": "operatorMultiplication",
  "*": "operatorMultiplication",
  "/": "operatorDivision",
  "%": "operatorPercentage",
  "=": "result",
  ",": "decimal",
  "C": "clearAll",
  "Enter": "result",
  "Escape": "clearAll",
  "Backspace": "backspace",
};

const keyboardMap = (event) => {
  const key = event.key;
  const keyAllowed = () => Object.keys(mapKeys).indexOf(key) !== -1;
  if (keyAllowed()) document.getElementById(mapKeys[key]).click();
}
document.addEventListener("keydown", keyboardMap);