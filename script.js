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

