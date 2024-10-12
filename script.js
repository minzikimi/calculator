let currentInput ="";
let currentOperator ="";
let previousInput ="";


document.addEventListener("DOMContentLoaded",()=>{

  let numberKeys = document.querySelectorAll(".btn-num");
  let operaterKeys = document.querySelectorAll(".btn-operator");
  const resultKey = document.querySelector("#btn-equal");
  const resetKey = document.querySelector("#btn-reset");
  
  const displayNum = document.querySelector(".display-container");


  numberKeys.forEach(button => { button.addEventListener("click", () => { 
    if (currentInput.length<=20){
      currentInput = currentInput + button.textContent;
      updateDisplay();
    }
    else {
      alert ("Hey! you exeeded the max length of digit");
    }  
      })
  })
  
  //upon click operator keys
  operaterKeys.forEach(button => {
    button.addEventListener("click", () => {
        // Step 1: Check if we have any numbers to work with
        if (currentInput === "" && previousInput === "") {
            return; // If no numbers, do nothing
        }
        // if its the first click, there is no previous number. so make currentInput to previousInput
        else if (previousInput === "") {
            previousInput = currentInput;
            currentOperator = button.textContent;
            currentInput = '';  // Clear the current input for the next number
        }
        else {
            // We already have a previous number, so:
            calculate(); //perform the previous calculation
            currentOperator = button.textContent;
            previousInput = currentInput;
            
            currentInput = "";
        }
        updateDisplay();
    })
  })
  
  resultKey.addEventListener("click", () => {
    if (currentInput !== "" && previousInput !== "") {
      calculate();
    }
  })
  
  resetKey.addEventListener("click",()=>{
    reset();
  })
  
  
  function reset() {
    currentInput = '';
    currentOperator = '';
    previousInput = '';
    updateDisplay();
  }
  
  
  function calculate () {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch(currentOperator) {
        case "+": currentInput = (prev + current).toString(); break;
        case "-": currentInput = (prev - current).toString(); break;
        case "/": 
            currentInput = current !== 0 ? (prev / current).toString() : "Error"; 
            break;
        case "*": currentInput = (prev * current).toString(); break;
        default: return;
    }
    previousInput = '';
    currentOperator = '';
  
    updateDisplay();
  }
  
 
  function updateDisplay () {
    if (currentInput === "" && previousInput === "" && currentOperator === "") {
      displayNum.textContent = "Hello World";
    } else {
      displayNum.textContent = currentInput || previousInput || "0";
    }
  }
    updateDisplay();
  })
