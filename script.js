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
const isEqualTo = document.querySelector(`#equal`);
const clear = document.querySelector(`#clear`);
const allClear = document.querySelector(`#allClear`);
const decimal = document.querySelector(`#decimal`);

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
            display.value = `${a}${operatorValue}${Number(input)}`;
            b = Number(input);
        }
    });
});

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        if(a === undefined){
            a = Number(input);
        }
        else if(b === undefined){
            b = Number(input);
        }

        if(a && b){
            result = operate(a, b, operatorValue)
            display.value = result;
            a = result;
            b = undefined;
        }
        if(result){
            if(!Number.isInteger(result)){
                precision = countDecimals(result);
                result = roundToPrecision(result, precision);
                a = Number(result.toFixed(4));
                display.value = a;
                b = undefined;
                input = "";
                decimal.disabled = false;
            }
        }

        operatorValue = operator.textContent;
        input = "";
        display.value = `${a}${operatorValue}`;
        result = undefined;
        decimal.disabled = false;
    });
});

isEqualTo.addEventListener('click', () => {
    if(a === undefined || b === undefined || !operatorValue){
        display.value = display.value;
    }
    else if(a && b && operatorValue){
        result = operate(a, b, operatorValue);
        if(!Number.isInteger(result)){
            precision = countDecimals(result);
            result = roundToPrecision(result, precision);
            a = Number(result.toFixed(4));
            display.value = a;
            b = undefined;
            input = "";
            decimal.disabled = false;
        }
        else{
            a = result;
            display.value = a;
            b = undefined;
            input = "";
            decimal.disabled = false;
        }
    }
    else{
        display.value = "Error";
    }
    
});

clear.addEventListener('click', () => {
    if(display.value.length > 0){
        display.value = display.value.slice(0, -1);
        if(display.value.length === 0){
            a = undefined;
            b = undefined;
            operator = undefined;
            input = "";
            display.value = "0";
        }
    }
});

allClear.addEventListener('click', () => {
    a = undefined;
    b = undefined;
    operatorValue = undefined;
    input = "";
    display.value = "0";
});

decimal.addEventListener(`click`, () => {
    input += decimal.textContent;
    if(a === undefined){
        if(!display.value.includes(".")){
            display.value = input;
            decimal.disabled = true;
        }
        else if(display.value === "" || display.value === 0)
            display.value = `0${input}`;
    }
    else if(result){
        a = undefined;
        b = undefined;
        operatorValue = 0;
        display.value = `0${input}`;
    }
    else{
        display.value = `${a}${operatorValue}${input}`;
        decimal.disabled = true;
    }
});

function countDecimals(result){
    const parts = result.toString().split(".");
    return parts[1] ? parts[1].length : 0;
};
function roundToPrecision(result, precision){
    const factor = Math.pow(10, precision);
    return Math.round(result * factor) / factor;
};