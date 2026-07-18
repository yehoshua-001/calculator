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
let operator;
let b;

function operate(a, b, operator){
    if(operator === '+'){
        return add(a, b);
    }

    if(operator === '-'){
        return subtract(a, b);
    }

    if(operator === '*'){
        return multiply(a, b);
    }
    
    if(operator === '/'){
        return divide(a, b);
    }
};

const calculator = document.querySelector('.calculator');
const display = document.querySelector('#display');
const nums = Array.from(document.querySelectorAll('#number'));
const operators = Array.from(document.querySelectorAll('#operator'));
const decimal = document.querySelector('#decimal');
const isEqualTo = document.querySelector('#equal');
const clear = document.querySelector('#clear');
const allClear = document.querySelector('#allClear');
let result;

let input = "";
nums.map((button) => {
    button.addEventListener('click', () => {
        input += button.textContent;
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
            b = Number(input);
            display.value = `${a} ${operator} ${Number(input)}`
        }
    });
});

operators.map((button) => {
    button.addEventListener('click', () => {
        if(a === undefined){
            a = Number(input);
        }
        else if(b === undefined){
            b = Number(input);
        }

        if(a && b){
            result = operate(a, b, operator);
            display.value = result;
            a = result;
            b = undefined;
        }
        else{
            operator = button.textContent;
            input = "";
            display.value = `${a} ${operator}`;
            result = undefined;
            decimal.disabled = false;
        }
    });
});

let isDecimalClicked = false;
decimal.addEventListener('click', () => {
    isDecimalClicked = true;
    display.value = input += decimal.textContent;
});

isEqualTo.addEventListener('click', () => {
    if(a === undefined || b === undefined || !operator){
        display.value = "";
    }
    else{
        result = operate(a, b, operator);
        display.value = result;
        a = result;
        b = undefined;
        input = "";
    }
});

clear.addEventListener('click', () => {
    if(clear.textContent === "C"){
        if(result != undefined){
            a = undefined;
            b = undefined;
            operator = undefined;
            input = "";
            result = undefined;
            display.value = "";
            return;
        }

        if(input.length > 0){
            input = input.slice(0, -1);
        }

        if(a === undefined){
            display.value = input;
        }
        else if(operator && input === ""){
            display.value = `${a} ${operator}`;
        }
        else{
            b = input ? Number(input) : undefined;
            display.value = `${a} ${operator} ${input ? input : ''}`;
        }
    }
});

allClear.addEventListener('click', () => {
    a = undefined;
    b = undefined;
    operator = undefined;
    input = "";
    display.value = "";
});