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
    if(op == "+") return addNum(a,b);
    if(op == "−" || op == "-") return subtractNum(a,b);
    if(op == "×" || op == "*") return multiplyNum(a,b);
    if(op == "÷" || op == "/") return b === 0 ? "Nope" : divideNum(a,b);
    if(op == "%") return percentage(a,b);
    if(op == "√") return b === 0 ? "Nope" : rootNum(a,b);
    if(op == "^") return powerNum(a,b);
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
const dot = document.querySelector(".dot");
const toggler = document.querySelector(".toggleMode")
const keyToOperator = {
    '+': '+',
    '-': '−',
    '*': '×',
    '/': '÷',
    '%': '%',
    '^': '^'
};

numberButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if(resetDisplay == true){
            clearTBox();
            resetDisplay = false;
        }
        if(textbox.textContent == "0"){
            clearTBox();
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
        let result = operate(firstNum, currentOperator, secondNum);

        if(result === "Nope"){
            reset();
            textbox.textContent = "Nope";
            resetDisplay = true; 
            return;
        }
        
        result = Math.round(result * 1000000)/1000000;

        if(result >= 10000000000){
            reset();
            textbox.textContent = "Too big";
            resetDisplay = true;  
            return;
        }
        textbox.textContent = result;
        firstNum = result;
        secondNum = null;
        resetDisplay = true;
    }
});

AC.addEventListener("click", reset);

backspace.addEventListener("click", () => {
    if(resetDisplay) return;

    textbox.textContent = textbox.textContent.slice(0, -1);

    if(textbox.textContent === ""){
        textbox.textContent = "0";
    }
});

dot.addEventListener("click", () => {
    if(textbox.textContent == ""){
        textbox.textContent = "0.";
        resetDisplay = false;
    }
    else if(textbox.textContent.includes(".") == true){
        return;
    }
    else{
        textbox.textContent += "."
    }
})

toggler.addEventListener("click", () => {
    if(resetDisplay == false){
    textbox.textContent = plusMinusNum(Number(textbox.textContent))
    }
})

document.addEventListener("keydown", (e) => {
    console.log(e.key)
    if(e.key >= '0' && e.key <= '9'){ 
        if(resetDisplay == true){
            clearTBox();
            resetDisplay = false;
        }
        if(textbox.textContent == "0"){
            clearTBox();
        }
        textbox.textContent += e.key;
    }
    if(e.key == "Enter"){
        if(firstNum !== null && resetDisplay == false && currentOperator !== null){
            if(textbox.textContent.trim() === "") return;
            
            secondNum = Number(textbox.textContent);
            let result = operate(firstNum, currentOperator, secondNum);

            if(result === "Nope"){
                reset();
                textbox.textContent = "Nope";
                resetDisplay = true;
                return;
            }

            result = Math.round(result * 1000000)/1000000;

            if(result >= 10000000000){
                reset();
                textbox.textContent = "Too big";
                resetDisplay = true;
                return;
            }

            textbox.textContent = result;
            firstNum = result;
            secondNum = null;
            resetDisplay = true;
        }
    }

    if(e.key == "Backspace"){
        if(resetDisplay) return;

        textbox.textContent = textbox.textContent.slice(0, -1);

        if(textbox.textContent === ""){
            textbox.textContent = "0";
        }
    }

    if(e.key == "Escape"){
        reset();
    }

    if(e.key == "."){
        if(textbox.textContent == ""){
            textbox.textContent = "0.";
            resetDisplay = false;
        }
        else if(textbox.textContent.includes(".") == true){
            return;
        }
        else{
            textbox.textContent += "."
        }
    }

    if(keyToOperator[e.key]){
        if(firstNum == null){
            firstNum = Number(textbox.textContent);
            currentOperator = keyToOperator[e.key];
            resetDisplay = true;
        }
        else if(resetDisplay == false && firstNum !== null && currentOperator !== null){
            secondNum = Number(textbox.textContent);
            let result = operate(firstNum, currentOperator, secondNum);
            firstNum = result;
            currentOperator = keyToOperator[e.key];
            textbox.textContent = firstNum;
            resetDisplay = true;
        }
        else if(currentOperator !== null && resetDisplay == true && firstNum !== null){
            currentOperator = keyToOperator[e.key];
            resetDisplay = true;
        }
    }
    

});
