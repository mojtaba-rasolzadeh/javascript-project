// class
class Calculator {
    constructor(previousElement, currentElement) {
        this.previousElement = previousElement;
        this.currentElement = currentElement;
        this.operation = undefined;
        this.previousOperand = '';
        this.currentOperand = '0';
    }

    // Add number to display
    appendNumber(number) {
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    // update display
    updateDisplay() {
        this.currentElement.textContent = this.currentOperand;
        this.previousElement.textContent = this.previousOperand;
    }

    // clear display
    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
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
})

// functions