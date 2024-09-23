const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');
let arr2 = [];
let lastOperator = '';

function add(arr) {
    return arr.reduce((acc, value) => acc + value, 0);
}

function subtract(arr) {
    return arr.reduce((acc, value) => acc - value);
}

function multiply(arr) {
    return arr.reduce((acc, value) => acc * value);
}

function divide(arr) {
    return arr.reduce((acc, value) => acc / value);
}

function calculator(operator, arr) {
    switch (operator) {
        case '+':
            return add(arr);
        case '-':
            return subtract(arr);
        case 'x':
            return multiply(arr);
        case '/':
            return divide(arr);
        default:
            return null;
    }
}

