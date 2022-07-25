// variables
const input = document.querySelector('.input');
const preview = document.querySelector('.preview');
const display = document.querySelector('.display');
const clearBtn = document.querySelector('#clear');
const backspaceBtn = document.querySelector('#backspace');
const fractionalBtn = document.querySelector('#fractional');
const squareBtn = document.querySelector('#square');
const powBtn = document.querySelector('#pow');
const rootBtn = document.querySelector('#root');
const divideBtn = document.querySelector('#divide');
const multiplyBtn = document.querySelector('#multiply');
const minusBtn = document.querySelector('#minus');
const plusBtn = document.querySelector('#plus');
const equalBtn = document.querySelector('#equal');
const buttons = document.querySelectorAll('.btn-number');

// calculator options
let memory = 0,
    lastOperation = '';

// event handlers
buttons.forEach(button => {
    button.addEventListener('click', displayNumber);
});

// clear button
clearBtn.addEventListener('click', clearDisplay);

// backspace button
backspaceBtn.addEventListener('click', backspace);

// plus button
plusBtn.addEventListener('click', sumNumber);

// minus button
minusBtn.addEventListener('click', minusNumber);

// multiply button
multiplyBtn.addEventListener('click', multiplyNumber);

// divide button
divideBtn.addEventListener('click', divideNumber);

// pow button
powBtn.addEventListener('click', powNumber);

// square button
squareBtn.addEventListener('click', squareNumber);

// fractional button
fractionalBtn.addEventListener('click', fractionalNumber);

// root button
rootBtn.addEventListener('click', rootNumber);

// equal button
equalBtn.addEventListener('click', result);

// functions
// display number 
function displayNumber(event) {

    // If the length of the numbers is more than 15, do not enter any numbers
    if (display.textContent.length > 15) {
        return;
    }

    // get the number
    const data = event.currentTarget.dataset.input;

    // If the data contain '.', do the following
    if (data === '.') {
        // If the entered numbers do not contain '.' ,run the following command
        if (!display.textContent.includes('.')) {
            // Add the '.' to the display
            display.textContent += data;
        }
        //If the data do not contain '.', do the following
    } else {
        display.textContent += data;
        if (!display.textContent.includes('.')) {
            // We convert the display value to a number with the Number method so that the zero behind the number disappears
            // display.textContent = display.textContent.toLocaleString('en-us');
            display.textContent = parseInt(display.textContent).toLocaleString('en');
        }
    }
}
// clear display and reset values
function clearDisplay() {
    memory = 0;
    lastOperation = '';
    preview.textContent = '';
    display.textContent = '0';
}


// backspace 
function backspace() {
    if (display.textContent.length == 1) {
        display.textContent = '0';
    } else {
        display.textContent = display.textContent.substring(0, display.textContent.length - 1);
    }
}

// sum number
function sumNumber() {
    memory = Number(display.textContent);
    lastOperation = '+';
    preview.textContent = `${memory} + `;
    display.textContent = '0';
}

// minus number
function minusNumber() {
    memory = Number(display.textContent);
    lastOperation = '-';
    preview.textContent = `${memory} - `;
    display.textContent = '0';
}

// multiply number
function multiplyNumber() {
    memory = Number(display.textContent);
    lastOperation = '*';
    preview.textContent = `${memory} * `;
    display.textContent = '0';
}

// divide number
function divideNumber() {
    memory = Number(display.textContent);
    lastOperation = '÷';
    preview.textContent = `${memory} ÷ `;
    display.textContent = '0';
}

// pow number
function powNumber() {
    memory = Number(display.textContent);
    lastOperation = '^';
    preview.textContent = `${memory} ^ `;
    display.textContent = '0';
}

// square number
function squareNumber() {
    memory = Number(display.textContent);
    preview.textContent = `sqr ( ${memory} )`;
    display.textContent **= 2;
}

// fractional number
function fractionalNumber() {
    memory = Number(display.textContent);
    preview.textContent = `1/ ( ${memory} )`;
    if (!memory == 0) {
        display.textContent = 1 / memory;
    }
}

// root number
function rootNumber() {
    memory = Number(display.textContent);
    preview.textContent = `√ ( ${memory} )`;
    display.textContent = Math.sqrt(memory);
}

// result
function result() {
    // Get the value of the display and convert it to a number and store it in memory
    const number = Number(display.textContent);
    // If the lastoperation includes + - * ÷ ^ do the following
    switch (lastOperation) {
        case '+':
            preview.textContent = `${memory} + ${number}`;
            display.textContent = memory + number;
            break;
        case '-':
            preview.textContent = `${memory} - ${number}`;
            display.textContent = memory - number;
            break;
        case '*':
            preview.textContent = `${memory} * ${number}`;
            display.textContent = memory * number;
            break;
        case '÷':
            preview.textContent = `${memory} ÷ ${number}`;
            display.textContent = memory / number;
            break;
        case '^':
            preview.textContent = `${memory} ^ ${number}`;
            display.textContent = Math.pow(memory, number);
            break;
        default:
            return;
    }

}

console.log((1234556).toLocaleString('en'));