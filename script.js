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
        result = "Error";
        display.value = result;
        a = undefined;
        b = undefined;
        operator = undefined;
        input = "";
        result = undefined;
    }
    else{
        return a / b;    
    }
};

let a;
let b;
let operator;
let operatorValue;

function operate(a, b, operator){
    switch (operator){
        case "+":
            return add(a, b);
        break;
        case "-":
            return subtract(a, b);
        break;
        case "*":
            return multiply(a, b);
        break;
        case "/":
            return divide(a, b);
        break;
        default:
            return "Error";
    }
};

const display = document.querySelector(`#display`);
const numbers = Array.from(document.querySelectorAll(`#number`));
const operators = Array.from(document.querySelectorAll(`#operator`));
const equals = document.querySelector(`#equal`);
const clear = document.querySelector(`#clear`);
const allClear = document.querySelector(`#allClear`);
const decimal = document.querySelector(`#decimal`);

let input = "";
let result = "";
display.value = 0;

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        input += number.textContent;
        numbersHandler(input);
    });
});
function numbersHandler(input){
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
    else if(display.value === "Error"){
        result = undefined;
        a = undefined;
        b = undefined;
        operator = undefined;
        display.value = Number(input);
    }
    else{
        b = Number(input);
        display.value = `${a}${operatorValue}${Number(input)}`;
    }
};

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        operatorValue = operator.textContent;
        operatorsHandler(operatorValue);
    });
});
function operatorsHandler(operatorValue){
    if(a === undefined){
        a = Number(input);
    }
    else if(b === undefined){
        b = Number(input);
    }
    else if(a || b){
        result = operate(a, b, operatorValue)
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
    else if(result){
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
    input = "";
    display.value = `${a}${operatorValue}`;
    result = undefined;
    decimal.disabled = false;
    
};

equals.addEventListener('click', () => {
    isEqualTo();
});
function isEqualTo(){
    if(a === undefined || b === undefined || operatorValue === undefined){
        display.value = display.value || input;
        a = undefined;
        b = undefined;
        operator = undefined;
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
    else if(operatorValue === "/"){
        result = operate(a, b, operatorValue);
        if(b === 0){
            result = "Error";
            display.value = result;
            a = undefined;
            b = undefined;
            operator = undefined;
            input = "";
            result = undefined;
        }
    }
    else{
        result = operate(a, b, operatorValue);
        a = result;
        display.value = a;
        b = undefined;
        input = "";
        decimal.disabled = false;
    }
};

clear.addEventListener('click', () => {
    clearLastInput();
});
function clearLastInput(){
    if (display.value.length > 0) {
        let lastInput = display.value.slice(-1);
        input = input.slice(0, -1);
        display.value = display.value.slice(0, -1);
        if (lastInput === ".")  decimal.disabled = false;

        if (lastInput === "+" || lastInput === "-" || lastInput === "*" || lastInput === "/") {
            operatorValue = undefined;
        } else if (operatorValue !== undefined && b !== undefined) {
            b = b.toString();
            b = b.length === 1 ? undefined : Number(b.slice(0, -1));
        } else if (a !== undefined && b == undefined) {
            a = a.toString();
            a = a.length === 1 ? undefined : Number(a.slice(0, -1));
        }
        if (display.value.length === 0) {
            a = undefined;
            b = undefined;
            result = undefined;
            operator = undefined;
            input = "";
            display.value = 0;
            decimal.disabled = false;
        }
    }
}

allClear.addEventListener('click', () => {
    allClearInput();
});
function allClearInput(){
    a = undefined;
    b = undefined;
    operatorValue = undefined;
    input = "";
    display.value = 0;
    decimal.disabled = false;
}

decimal.addEventListener(`click`, () => {
    inputDecimal();
});
function inputDecimal(){
    input += decimal.textContent;
    if(display.value == 0){
        display.value = `0.`;
        decimal.disabled = true;
    }
    else if(a === undefined){
        if(!display.value.includes(".")){
            display.value = input;
            decimal.disabled = true;
        }
    }
    else if(result){
        a = undefined;
        b = undefined;
        operatorValue = undefined;
        display.value = `0.`;
    }
    else{
        display.value = `${a}${operatorValue}${Number(input)}`;
        b = Number(input);
        decimal.disabled = true;
    }
}

// Round off functions
function countDecimals(result){
    const parts = result.toString().split(".");
    return parts[1] ? parts[1].length : 0;
};
function roundToPrecision(result, precision){
    const factor = Math.pow(10, precision);
    return Math.round(result * factor) / factor;
};

// Keyboard support
document.addEventListener('keyup', (event) => {
    const key = event.key;
    if(key >= '0' && key <= '9'){
        input += key;
        numbersHandler(input);
    }
    if(key === '+' || key === '-' || key === '*' || key === '/'){
        operatorValue = key;
        operatorsHandler(operatorValue);
    }
    if(key === '=' || key === 'Enter'){
        event.preventDefault();
        isEqualTo();
    }
    if(key === 'Backspace'){
        clearLastInput();
    }
    if(key === 'Escape' || key.toLowerCase() === 'c'){
        allClearInput();
    }
    if(key === '.'){
        inputDecimal();
    }
});
