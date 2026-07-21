const add = function(a, b){
    return a + b;
};

const subtract = function(a, b){
    return a - b;
};

const multiply = function(a, b){
    return a * b;
};

const divide = function(a, b){
    if(b === 0){
        return "Error";
    }
    else{
        return a / b;
    }
};

let a;
let b;
let operator;

function operate(a, b, operator){
    if(operator === '+'){
        return add(a, b);
    }

    if(operator === '-'){
        return subtract(a, b);
    }

    if(operator === 'x'){
        return multiply(a, b);
    }
    
    if(operator === '/'){
        return divide(a, b);
    }
};

const display = document.querySelector(`#display`);
const numbers = Array.from(document.querySelectorAll(`#number`));
const operators = Array.from(document.querySelectorAll(`#operator`));
// const buttons = document.querySelectorAll(`button`);
const isEqualTo = document.querySelector(`#equal`);
const clear = document.querySelector(`#clear`);
const allClear = document.querySelector(`#allClear`);

let input = "";
let result = "";
display.value = "0";

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        input += number.textContent;
        if(a === undefined){
            display.value = Number(input);
        }
        else if(result){
            result = undefined;
            a = undefined;
            b = undefined;
            operator = undefined;
            display.value = Number(input);
        }
        else{
            display.value = `${a} ${operatorValue} ${Number(input)}`;
            b = Number(input);
        }
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if(a === undefined){
            a = Number(input);
            console.log(a);
        }
        else if(b === undefined){
            b = Number(input);
            console.log(b);
        }

        if(a && b){
            result = operate(a, b, operatorValue)
            display.value = result;
            a = result;
            b = undefined;
        }

        operatorValue = operator.textContent;
        input = "";
        display.value = `${a} ${operatorValue}`;
        result = undefined;
    });
});

isEqualTo.addEventListener('click', () => {
    if(a === undefined || b === undefined || !operatorValue){
        display.value = "0";
    }
    else{
        result = operate(a, b, operatorValue);
        display.value = result;
        a = result;
        b = undefined;
        input = "";
    }
});

clear.addEventListener('click', () => {
    input = input.slice(0, -1);
    display.value = input;
    if(input.length === 0){
        display.value = "0";
    }
});

allClear.addEventListener('click', () => {
    a = undefined;
    b = undefined;
    operatorValue = undefined;
    input = "";
    display.value = "0";
});