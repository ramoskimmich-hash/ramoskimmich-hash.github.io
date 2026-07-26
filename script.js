// Calculator state
let display = '0';
let subDisplay = '';
let memory = 0;
let mode = 'standard';
let firstOperand = null;
let operator = null;
let waitingForNewOperand = false;

// Update display
function updateDisplay() {
    document.getElementById('display').textContent = display;
    document.getElementById('sub-display').textContent = subDisplay;
    updateMemoryIndicator();
}

// Update memory indicator
function updateMemoryIndicator() {
    const indicator = document.getElementById('memory-indicator');
    indicator.textContent = memory !== 0 ? Math.abs(memory).toString() : '';
}

// Append number
function appendNumber(num) {
    if (waitingForNewOperand) {
        display = num === '.' ? '0.' : num;
        waitingForNewOperand = false;
    } else {
        if (num === '.') {
            if (display.includes('.')) return;
            display += num;
        } else {
            display = display === '0' ? num : display + num;
        }
    }
    subDisplay = '';
    updateDisplay();
}

// Append operator
function appendOperator(op) {
    const currentValue = parseFloat(display);
    
    if (firstOperand === null) {
        firstOperand = currentValue;
    } else if (operator && !waitingForNewOperand) {
        const result = performCalculation(firstOperand, currentValue, operator);
        display = isNaN(result) || !isFinite(result) ? 'Error' : result.toString();
        firstOperand = result;
    }
    
    operator = op;
    subDisplay = `${firstOperand} ${op}`;
    waitingForNewOperand = true;
    updateDisplay();
}

// Perform calculation
function performCalculation(first, second, op) {
    switch (op) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return second === 0 ? NaN : first / second;
        default:
            return second;
    }
}

// Calculate result
function calculate() {
    if (operator === null || firstOperand === null) {
        return;
    }
    
    const currentValue = parseFloat(display);
    const result = performCalculation(firstOperand, currentValue, operator);
    
    if (isNaN(result) || !isFinite(result)) {
        display = 'Error';
    } else {
        display = result.toString();
    }
    
    subDisplay = `${firstOperand} ${operator} ${currentValue} =`;
    firstOperand = null;
    operator = null;
    waitingForNewOperand = true;
    updateDisplay();
}

// Clear display
function clearDisplay() {
    display = '0';
    subDisplay = '';
    firstOperand = null;
    operator = null;
    waitingForNewOperand = false;
    updateDisplay();
}

// Delete last character
function deleteLast() {
    if (display.length === 1) {
        display = '0';
    } else {
        display = display.slice(0, -1);
    }
    subDisplay = '';
    updateDisplay();
}

// Append function
function appendFunction(func) {
    let result;
    const currentValue = parseFloat(display);
    
    switch (func) {
        case 'sqrt':
            result = currentValue < 0 ? NaN : Math.sqrt(currentValue);
            break;
        case 'square':
            result = currentValue * currentValue;
            break;
        case 'percent':
            result = currentValue / 100;
            break;
        case 'reciprocal':
            result = currentValue === 0 ? NaN : 1 / currentValue;
            break;
        case 'negate':
            result = -currentValue;
            break;
        case 'pi':
            result = Math.PI;
            break;
        default:
            result = currentValue;
    }
    
    if (isNaN(result) || !isFinite(result)) {
        display = 'Error';
    } else {
        display = result.toString();
    }
    
    subDisplay = `${func}(${currentValue})`;
    waitingForNewOperand = true;
    updateDisplay();
}

// Toggle mode
function toggleMode() {
    mode = mode === 'standard' ? 'scientific' : 'standard';
    document.getElementById('mode-label').textContent = mode.toUpperCase();
}

// Memory functions
function memoryClear() {
    memory = 0;
    updateMemoryIndicator();
}

function memoryRecall() {
    display = memory.toString();
    waitingForNewOperand = true;
    subDisplay = 'MR';
    updateDisplay();
}

function memoryAdd() {
    memory += parseFloat(display) || 0;
    subDisplay = 'M+';
    waitingForNewOperand = true;
    updateDisplay();
}

function memorySubtract() {
    memory -= parseFloat(display) || 0;
    subDisplay = 'M−';
    waitingForNewOperand = true;
    updateDisplay();
}

// Initialize
updateDisplay();
