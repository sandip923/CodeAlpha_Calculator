let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

const currentTextElement = document.getElementById('current-operand');
const previousTextElement = document.getElementById('previous-operand');

function updateDisplay() {
  currentTextElement.innerText = currentOperand;
  if (operation != null) {
    previousTextElement.innerText = `${previousOperand} ${operation}`;
  } else {
    previousTextElement.innerText = '';
  }
}

function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;
  if (currentOperand === '0' && number !== '.') {
    currentOperand = number.toString();
  } else {
    currentOperand += number.toString();
  }
  updateDisplay();
}

function appendOperator(op) {
  if (currentOperand === '' && previousOperand === '') return;
  if (previousOperand !== '') {
    compute();
  }
  operation = op;
  previousOperand = currentOperand;
  currentOperand = '';
  updateDisplay();
}

function clearAll() {
  currentOperand = '0';
  previousOperand = '';
  operation = undefined;
  updateDisplay();
}

function deleteNumber() {
  if (currentOperand === '0') return;
  currentOperand = currentOperand.slice(0, -1);
  if (currentOperand === '') currentOperand = '0';
  updateDisplay();
}

function compute() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '×':
    case '*':
      computation = prev * current;
      break;
    case '÷':
    case '/':
      if (current === 0) {
        alert("Cannot divide by zero!");
        clearAll();
        return;
      }
      computation = prev / current;
      break;
    default:
      return;
  }

  currentOperand = Math.round(computation * 100000) / 100000; // Limits decimal overflow
  operation = undefined;
  previousOperand = '';
  updateDisplay();
}

// Keyboard Support
document.addEventListener('keydown', (e) => {
  if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
    appendNumber(e.key);
  }
  if (e.key === '+' || e.key === '-') {
    appendOperator(e.key);
  }
  if (e.key === '*') {
    appendOperator('×');
  }
  if (e.key === '/') {
    e.preventDefault(); // Prevents browser quick-find shortcut
    appendOperator('÷');
  }
  if (e.key === 'Enter' || e.key === '=') {
    e.preventDefault();
    compute();
  }
  if (e.key === 'Backspace') {
    deleteNumber();
  }
  if (e.key === 'Escape') {
    clearAll();
  }
});