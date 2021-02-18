let display = document.querySelector('.operation');
let resume = document.querySelector('.visualization');
let op = '';
let first = '';
let second = '';
let eq = '';
let operation;
let resumeContent = [first, op, second, eq];

let sup = document.querySelector('.remove');
sup.addEventListener('click', e => {
    deleteContent();
});

function deleteContent() {
    if(display.textContent != '') {
        display.textContent = display.textContent.slice(0,display.textContent.length - 1);
    }
}

let clear = document.querySelector('.c');
clear.addEventListener('click', e => {
    clearContent();
})

function clearContent() {
    first = '';
    second = '';
    operation = '';
    eq = '';
    resumeContent = [first, operation, second, eq]
    updateResume();
    display.textContent = "";
}

let numbers = document.querySelectorAll('.num');
numbers.forEach( number => {
    number.addEventListener('click', e => {
        updateDisplay(e.target.textContent);
    })
})

let dot = document.querySelector('.dot');
dot.addEventListener('click', e => {
    updateDot();
})

function updateDot() {
    if(!display.textContent.includes('.') && display.textContent != "") {
        updateDisplay('.')
    }
}

let sign = document.querySelector('.sign')
sign.addEventListener('click', e => {
    display.textContent = +display.textContent * (-1);
})

let operators = document.querySelectorAll('.op');
operators.forEach( operator => {
    operator.addEventListener('click', e => {
        let pressed = e.target.textContent;
        updateOperator(pressed);
    })
})

let equal = document.querySelector('.equal');
equal.addEventListener('click', e => {
    resol()
})

function resol() {
    if (first !== '') {
        second = +display.textContent;
        eq = ' = '
        resumeContent = [first, op, second, eq];
        updateResume();
        let answer = operate(operation, first, second);
        
        if (answer == 'Division by 0') {
            answer = 'Error division by Zero';
        }else if (Math.floor(answer) != answer) {
            answer = answer.toFixed(3);
        }
        
        if (answer == Infinity || answer == -Infinity) {
            answer = "Opps too large number"
        } else if (answer > 9999999999 || answer < -9999999999) {
            answer = answer.toExponential(7);
        }
        display.textContent = answer;
        first = '';
        eq = '';
        second = '';
        operation = '';
    }
}  


function operate (operation, a, b) {
    return operation(a,b);
}
    
function updateDisplay(pressed) {
    
    if(display.textContent == 'Error division by Zero' || display.textContent == "Opps too large number") {
        display.textContent = '';
    }
    if (display.textContent == '0') {
        display.textContent = pressed;
    } else if (display.textContent.includes('.')) {
        if (display.textContent.length >= 13) {
        alert('the calculator only takes 13 digits numbers');
        } else {
            display.textContent += pressed;
        }
    } else if(display.textContent.length < 12) {
        display.textContent += pressed;
    } else {
        alert('the calculator only takes 13 digits numbers')
    }
}

function updateResume() {
    resume.textContent = `${resumeContent[0]} ${resumeContent[1]} ${resumeContent[2]} ${resumeContent[3]}`
}

function refresh() {
    first = +display.textContent;
    op = '';
    second = '';
    eq = '';
}

function updateOperator(pressed) {

    if(isNaN(display.textContent)) {
        display.textContent = '';
        first = 0;
    }

    if(first == '') {
        first = +display.textContent;
        display.textContent = '';
    }

    switch (pressed) {
        case "xy":
            operation = power;
            op = ' ^ ';
            break;
        case "x":
            operation = power;
            op = ' ^ ';
            break;
        case "/":
            operation = division;
            op = ' / ';
            break;
        case "X":
            operation = product;
            op = ' x ';
            break;
        case "+":
            operation = add;
            op = ' + ';
            break;
        case "-":
            operation = substract;
            op = ' - ';
    }
    resumeContent = [first, op, second, eq];
    updateResume();
}

function power(a,b) {
    return a ** b;
}
function division(a,b) {
    if (b == 0) {
        return 'Division by 0'
    }
    return a / b;
}
function product(a,b) {
    return a * b;
}
function add(a,b) {
    return a + b;
}
function substract(a,b) {
    return a - b;
}

window.addEventListener('keyup', e => {
    console.log(e.key);
    let oper = '/*-+^'
    if(+e.key >= 0 && +e.key <= 9) {
        updateDisplay(e.key);
    } else if (e.key == 'Enter') {
        resol();
    } else if (e.key == 'Backspace') {
        deleteContent();
    } else if (e.key == 'Delete') {
        clearContent();
    } else if (e.key == '.') {
        updateDot();
    } else if (e.key == 'Shift'){
        display.textContent = +display.textContent * (-1);
    }else if(oper.includes(e.key)) {
        if (e.key == '*') {
            updateOperator('X');
        } else if (e.key == '^') {
            updateOperator('xy')
        } else {
            updateOperator(e.key)
        }
    }
})
