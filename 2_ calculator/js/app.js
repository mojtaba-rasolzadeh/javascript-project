// class
class Calculator {
    constructor(previousElement, currentElement) {
        this.previousElement = previousElement;
        this.currentElement = currentElement;
        this.operation = undefined;
        this.previousOperand = '';
        this.currentOperand = '0';
    }

    // choose operation
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }

    // compute
    compute() {
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        let computaion;
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computaion = prev + current;
                break;
            case '-':
                computaion = prev - current;
                break;
            case '*':
                computaion = prev * current;
                break;
            case '÷':
                computaion = prev / current;
                break;
            case '^':
                computaion = prev ** current;
                break;
            default:
                break;
        }
        this.currentOperand = computaion;
        this.previousOperand = '';
        this.operation = undefined;
    }

    // get display number
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigit = parseFloat(stringNumber.split('.')[0]);
        const decimalDigit = stringNumber.split('.')[1];
        let integerDisplay;

        // If integerDigit was a number, separate the numbers three by three
        if (isNaN(integerDigit)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigit.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        // If decimal is not null, execute the following command
        if (decimalDigit != null) {
            return `${integerDisplay}.${decimalDigit}`;
        } else {
            return integerDisplay;
        }
    }

    // Add number to display
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    // update display
    updateDisplay() {
        this.currentElement.textContent = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousElement.textContent = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousElement.textContent = '';
        }
    }

    // clear display
    clear() {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
    }

    // delete numbers 
    delete() {
        if (this.currentOperand.length == 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }
        return this.currentOperand;
    }

}

// varibales
const previousElement = document.querySelector('.previous');
const currentElement = document.querySelector('.current');
const fractionalBtn = document.querySelector('#fractional');
const squareBtn = document.querySelector('#square');
const rootBtn = document.querySelector('#root');
const operationBtns = document.querySelectorAll('[data-operation]');
const numberBtns = document.querySelectorAll('.btn-number');
const equalBtn = document.querySelector('#equal');
const clearBtn = document.querySelector('#clear');
const backspaceBtn = document.querySelector('#backspace');

const calculator = new Calculator(previousElement, currentElement);


// event handler
// number buttons
numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.input);
        calculator.updateDisplay();
    })
});

// clear button 
clear.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

// backspace button
backspace.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

// operation buttons
operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.operation);
        calculator.updateDisplay();
    })
});

// equal button
equalBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

// square button
squareBtn.addEventListener('click', () => {
    calculator.currentOperand **= 2;
    calculator.updateDisplay();
});

// fractiona button
fractionalBtn.addEventListener('click', () => {
    calculator.currentOperand = 1 / calculator.currentOperand;
    calculator.updateDisplay();
});

// root button
rootBtn.addEventListener('click', () => {
    calculator.currentOperand = Math.sqrt(calculator.currentOperand);
    calculator.updateDisplay();
})