// class
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.operation = undefined;
        this.previousOperand = '';
        this.currentOperand = '';
    }

    appendNumber(number) {
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand.length == 1) {
            this.currentOperand = '0';
        } else {
            return this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }
    }

    square() {
        this.currentOperand **= 2;
    }

    fractional() {
        this.currentOperand = 1 / this.currentOperand;
    }

    root() {
        this.currentOperand = Math.sqrt(this.currentOperand);
    }

    chooseOperation(operation) {
        if (this.currentOperand == '0') return;
        if (this.previousOperand !== '0') {
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '0';
    }

    compute() {
        let computaion;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
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
                computaion = Math.pow(prev, current);
                break;
            default:
                return;
        }
        this.currentOperand = computaion;
        this.previousOperand = '';
        this.operation = undefined;
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigit = parseFloat(stringNumber.split('.')[0]);
        const decimalDigit = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigit)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigit.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigit != null) {
            return `${integerDisplay}.${decimalDigit}`;
        } else {
            return integerDisplay;
        }
    }
    updateDisplay() {
        if (this.currentOperand.length > 15) return;
        this.currentOperandTextElement.textContent = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.textContent =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.textContent = '';
        }
    }
}

// variables
const previousOperandTextElement = document.querySelector('.previous');
const currentOperandTextElement = document.querySelector('.current');
const clearBtn = document.querySelector('#clear');
const backspaceBtn = document.querySelector('#backspace');
const operationBtns = document.querySelectorAll('span[data-operation]');
const fractionalBtn = document.querySelector('#fractional');
const squareBtn = document.querySelector('#square');
const rootBtn = document.querySelector('#root');
const equalBtn = document.querySelector('#equal');
const buttons = document.querySelectorAll('.btn-number');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// event handlers

// number buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.input);
        calculator.updateDisplay();
    })
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

// clear button
clearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

// delete button
backspaceBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

// square button
squareBtn.addEventListener('click', () => {
    calculator.square();
    calculator.updateDisplay();
});

// fractional button
fractionalBtn.addEventListener('click', () => {
    calculator.fractional();
    calculator.updateDisplay();
})

// root button
rootBtn.addEventListener('click', () => {
    calculator.root();
    calculator.updateDisplay();
});