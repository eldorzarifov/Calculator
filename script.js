function addNum(a, b){
    return a + b;
}

function subtractNum(a, b){
    return a - b;
}

function multiplyNum(a, b){
    return a * b;
}

function divideNum(a, b){
    return a / b;
}

function percentage(a, b){
    return (a/100)*b;
}
function rootNum(a, b){
    return a ** (1/b);
}

function powerNum(a, b){
    return a ** b;
}

function plusMinusNum(a){
    return -a;
}

function operate(a, op, b){
    if(op == "+"){
        return addNum(a, b);
    }
    if(op == "−"){
        return subtractNum(a, b);
    }
    if(op == "÷"){
        if(b === 0){
            return "Nope"
        }
        return divideNum(a, b);
    }
    if(op == "×"){
        return multiplyNum(a, b);
    }
    if(op == "%"){
        return percentage(a, b);
    }
    if(op == "√"){
        if(b === 0){
            return "Nope"
        }
        return rootNum(a, b);
    }
    if(op == "^"){
        return powerNum(a, b);
    }
}

function clearTBox (){
    return textbox.textContent = "";
}
function reset(){
    firstNum = null;
    secondNum = null;
    currentOperator = null;
    resetDisplay = false;
    textbox.textContent = "";
}

let firstNum = null;
let secondNum = null;
let currentOperator = null;
let resetDisplay = false;

const textbox = document.querySelector(".textbox");
const numberButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const backspace = document.querySelector(".backspace");
const AC = document.querySelector(".clear");
const equalsBtn = document.querySelector(".equals");

numberButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if(resetDisplay == true){
            clearTBox();
            resetDisplay = false;
        }
        textbox.textContent += btn.textContent;
    })
});

operatorButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if(firstNum == null){
            firstNum = Number(textbox.textContent);
            currentOperator = btn.textContent;
            resetDisplay = true;
        }
        else if(resetDisplay == false && firstNum !== null && currentOperator !== null){
            secondNum = Number(textbox.textContent);
            let result = operate(firstNum, currentOperator, secondNum);
            firstNum = result;
            currentOperator = btn.textContent;
            textbox.textContent = firstNum;
            resetDisplay = true;
        }
        else if(currentOperator !== null && resetDisplay == true && firstNum !== null){
            currentOperator = btn.textContent;
            resetDisplay = true;
        }
    })
});

equalsBtn.addEventListener('click', () => {
    if(firstNum !== null && resetDisplay == false && currentOperator !==null){
        secondNum = Number(textbox.textContent);
        clearTBox();
        let result = operate(firstNum, currentOperator, secondNum);
        console.log(result);
        secondNum = null;
        textbox.textContent = result;
        firstNum = result;
        resetDisplay = true;
    }
})

AC.addEventListener("click", reset);

backspace.addEventListener("click", () => {
    if(resetDisplay) return;

    textbox.textContent = textbox.textContent.slice(0, -1)

    if(textbox.textContent === ""){
        textbox.textContent = "0"
    }
})