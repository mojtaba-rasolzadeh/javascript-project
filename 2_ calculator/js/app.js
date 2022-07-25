// class
class Calculator {
    constructor(previousElement, currentElement) {
        this.previousElement = previousElement;
        this.currentElement = currentElement;
        this.operation = undefined;
        this.previousOperand = '';
        this.currentOperand = '';
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

}

// varibales
const previousElement = document.querySelector('.previous');
const currentElement = document.querySelector('.current');
const fractionalBtn = document.querySelector('#fractional');
const squareBtn = document.querySelector('#square');
const operationBtns = document.querySelectorAll('[data-operation]');
const numberBtns = document.querySelectorAll('.btn-number');
const equalBtn = document.querySelector('#equal');

const calculator = new Calculator(previousElement, currentElement);


// event handler
numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.input);
        calculator.updateDisplay();
    })
})

// functions