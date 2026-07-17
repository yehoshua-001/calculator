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
    switch(operator){
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
        default:
            return NaN;
    }
};

const calculator = document.querySelector('.calculator');
const display = document.querySelector('#display');
const nums = Array.from(document.querySelectorAll('#number'));
const operators = Array.from(document.querySelectorAll('#operator'));
const options = Array.from(document.querySelectorAll('#option'));
const decimal = document.querySelector('#equal');
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
            display.value = `${a} ${operator} ${Number(input)}`
            b = Number(input);
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