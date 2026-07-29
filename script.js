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
        displayValue = result;
        display();
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

const displayBox = document.querySelector(`#display`);
const buttons = Array.from(document.querySelectorAll(`button`));
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/'];

let input = "";
let result = "";
let displayValue = "";

function display(){
    displayBox.value = displayValue || "0";
};

function numbersHandler(input){
    if(a === undefined){
        displayValue = Number(input);
        display();
    }
    else if(result){
        result = undefined;
        a = undefined;
        b = undefined;
        operator = undefined;
        displayValue = Number(input);
        display();
    }
    else if(displayBox.value === "Error"){
        result = undefined;
        a = undefined;
        b = undefined;
        operator = undefined;
        displayValue = Number(input);
        display();
    }
    else{
        b = Number(input);
        displayValue = `${a}${operatorValue}${Number(input)}`;
        display();
    }
};

function operatorsHandler(operatorValue){
    if(a === undefined){
        a = Number(input);
    }
    else if(b === undefined){
        b = Number(input);
    }
    
    if(a && b){
        result = operate(a, b, operator);
        if(!Number.isInteger(result)){
            precision = countDecimals(result);
            result = roundToPrecision(result, precision);
            a = Number(result.toFixed(4));
            displayValue = a;
            display();
            b = undefined;
            input = "";
            decimal.disabled = false;
        }
        else{
            a = result;
            displayValue = a;
            display();
            b = undefined;
            input = "";
            decimal.disabled = false;
        }
    }
    operator = operatorValue;
    input = "";
    displayValue = `${a}${operator}`;
    display();
    result = undefined;
    decimal.disabled = false;
};

function isEqualTo(){
    if(a === undefined || b === undefined || operatorValue === undefined){
        display();
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
            displayValue = a;
            display();
            b = undefined;
            input = "";
            decimal.disabled = false;
        }
        else{
            a = result;
            displayValue = a;
            display();
            b = undefined;
            input = "";
            decimal.disabled = false;
        }
    }
    else if(operatorValue === "/"){
        result = operate(a, b, operatorValue);
        if(b === 0){
            result = "Error";
            displayValue = result;
            display();
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
        displayValue = a;
        display();
        b = undefined;
        input = "";
        decimal.disabled = false;
    }
};

function clearLastInput(){
    if(displayBox.value.length > 0){
        let lastInput = displayBox.value.slice(-1);
        input = input.slice(0, -1);
        displayValue = displayBox.value.slice(0, -1);
        display();
        if(lastInput === '.'){
            decimal.disabled = false;
        }

        if(operators.includes(lastInput)){
            operatorValue = undefined;
        }
        else if(operatorValue !== undefined && b !== undefined){
            b = b.toString();
            b = b.length === 1 ? undefined : Number(b.slice(0, -1));
        }
        else if(a !== undefined && b === undefined){
            a = a.toString();
            a = a.length === 1 ? undefined : Number(a.slice(0, -1));
        }

        if(displayBox.value.length === 0){
            a = undefined;
            b = undefined;
            result = undefined;
            operator = undefined;
            input = "";
            displayValue = undefined;
            display();
            decimal.disabled = false;
        }
    }
}

function allClearInput(){
    a = undefined;
    b = undefined;
    operatorValue = undefined;
    input = "";
    displayValue = undefined;
    display();
    decimal.disabled = false;
}

function inputDecimal(){
    input += decimal.textContent;
    if(a === undefined || b === undefined){
        if(displayBox.value == '0'){
            displayValue = '0.';
            display();
            decimal.disabled = true;
        }
        
        if(!displayBox.value.includes(".")){
            displayValue = input;
            display();
            decimal.disabled = true;
        }
    }
    else if(result){
        a = undefined;
        b = undefined;
        operatorValue = undefined;
        displayValue = '0.';
        display();
    }
    else{
        displayValue = `${a}${operatorValue}${Number(input)}`;
        display();
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

// Buttons action
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent;
        if(numbers.includes(buttonValue)){
            input += buttonValue;
            numbersHandler(input);
        }
        if(operators.includes(buttonValue)){
            operatorValue = buttonValue;
            operatorsHandler(operatorValue);
        }
        if(buttonValue === '='){
            isEqualTo();
        }
        if(buttonValue === '⌫'){
            clearLastInput();
        }
        if(buttonValue === 'C'){
            allClearInput();
        }
        if(buttonValue === '.'){
            inputDecimal();
        }
    });
});

// Keyboard support and event style
document.addEventListener('keyup', (event) => {
    const key = event.key;
    const targetElement = document.querySelector(`[data-key="${key}"]`);
    if(targetElement){
        if(numbers.includes(key)){
            input += key;
            numbersHandler(input);
            targetElement.setAttribute('style', 'background-color: #000000; color: #6C757D;');
            setTimeout(() => {
                targetElement.style.removeProperty('background-color');
                targetElement.style.removeProperty('color');
            }, 300);
        }
        if(operators.includes(key)){
            operatorValue = key;
            operatorsHandler(operatorValue);
            targetElement.setAttribute('style', 'background-color: #000000; color: #ADB5DB;');
            setTimeout(() => {
                targetElement.style.removeProperty('background-color');
                targetElement.style.removeProperty('color');
            }, 300);
        }
        if(key === '=' || key === 'Enter'){
            event.preventDefault();
            isEqualTo();
            targetElement.setAttribute('style', 'background-color: #000000; color: #ADB5BD;');
            setTimeout(() => {
                targetElement.style.removeProperty('background-color');
                targetElement.style.removeProperty('color');
            }, 300);
        }
        if(key === 'Backspace'){
            clearLastInput();
            targetElement.setAttribute('style', 'background-color: #000000; color: #EB5E28;');
            setTimeout(() => {
                targetElement.style.removeProperty('background-color');
                targetElement.style.removeProperty('color');
            }, 300);
        }
        if(key === 'Escape' || key.toLowerCase() === 'c'){
            allClearInput();
            targetElement.setAttribute('style', 'background-color: #000000; color: #EB5E28;');
            setTimeout(() => {
                targetElement.style.removeProperty('background-color');
                targetElement.style.removeProperty('color');
            }, 300);
        }
        if(key === '.'){
            inputDecimal();
            targetElement.setAttribute('style', 'background-color: #000000; color: #6C757D;');
            setTimeout(() => {
                targetElement.style.removeProperty('background-color');
                targetElement.style.removeProperty('color');
            }, 300);
        }        
    }
});

display();
