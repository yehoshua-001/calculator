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
    return a / b;
};

let a;
let operator;
let b;

function operate(a, b, operator){
    if(operator === '+'){
        return add(a, b);
    }
    else if(operator === '-'){
        return subtract(a, b);
    }
    else if(operator === '*'){
        return multiply(a, b);
    }
    else if(operator === '/'){
        return divide(a, b);
    }
};
