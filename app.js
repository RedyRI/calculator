let display = document.querySelector('.operation');
let resume = document.querySelector('.visualization')
let operators = [];

let numbtn = document.querySelectorAll('.num');
numbtn.forEach(button => {
    button.addEventListener('click', (e) => {
        if (display.textContent.includes("Error Division By 0")) {
            display.textContent = "";
            resume.textContent = '';
        }
        let pressed = e.target.textContent;
        console.log(pressed);
        updateDisplay(pressed);
    })
});

let dot = document.querySelector('.dot');
dot.addEventListener('click', e => {
    if (display.textContent.includes("Error Division By 0")) {
        display.textContent = "";
        resume.textContent = '';
    } else {
        if (!display.textContent.includes('.') && display.textContent != "") {
            display.textContent += '.';
        }
    }
})

let sign = document.querySelector('.sign');
sign.addEventListener('click', e => {
    display.textContent = +display.textContent * (-1);
})

let operations = document.querySelectorAll('.op');
operations.forEach(btn => {
    btn.addEventListener('click', e => {
        if(display.textContent.includes("Error Division By 0"))  {
            display.textContent = '';
            resume.textContent = '';
        } else {
            if(resume.textContent == '') {
                resume.textContent = display.textContent;
            }
            let pressed = e.target.textContent;
            addOperation(pressed);
            console.log(pressed);
        }
    })
})

function addOperation(pressed) {
    let operation;
    let operationSymbol;
    switch (pressed) {
        case '/': 
            operation = divide;
            operationSymbol = ' / '
            break;
        case 'x':
            operation = multiply;
            operationSymbol = ' x '
            break;
        case '+':
            operation = add;
            operationSymbol = ' + '
            break;
        case '-':
            operation = substract; 
            operationSymbol = ' - '
            break;
        case 'xy':
            operation = power;
            operationSymbol = ' ^ ';
            console.log('aaaaa');
            break;
        case 'y':
            operation = '';
    }

    if(operation == '') {
        return;
    }

    if (operators.length == 0 && display.textContent != '') {
        operators.push(+display.textContent);
        operators.push(operation);
        display.textContent = '';
        resume.textContent += operationSymbol;
    }
}

let clear = document.querySelector('.c');
clear.addEventListener('click', e =>{
    display.textContent = "";
    resume.textContent = "";
    operators = [];
})

let remove = document.querySelector('.remove');
remove.addEventListener('click', e => {
    if (display.textContent != "") {

        let dcontent = display.textContent;
        display.textContent = dcontent.slice(0,dcontent.length - 1);
        let rcontent = resume.textContent;
        resume.textContent = rcontent.slice(0,rcontent.length - 1);
    }
})


let equal = document.querySelector('.equal');
equal.addEventListener('click', e => {
    if (operators.length == 2) {
        answer = operate(operators[1], operators[0], +display.textContent);
        if (answer == Infinity) {
            console.log('aadasd');
            answer = "Error Division By 0";

        } else if(Math.floor(answer) != answer) {
            answer = answer.toFixed(3)
        }

        display.textContent = answer;
        operators = [];
        resume.textContent = answer;
}
})

function updateDisplay(pressed) {
    if (display.textContent.length <= 8 ) {
        display.textContent += pressed;
    }
};

function add(a,b) {
    return a + b;
}

function substract(a,b) {
    return a - b;
}

function multiply (a,b) {
    return a * b;
}

function divide (a,b) {
    return a / b;
}

function power (a,b) {
    return a ** b;
}

function operate(operation, a, b) {
    return operation(a,b)
}
