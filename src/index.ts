//////////////////////
//////////////////////
//// Global var's ////
//////////////////////
//////////////////////


const currentValueElement: HTMLInputElement = document.querySelector("#current-value")!
const previousValueElement: HTMLElement = document.querySelector("#prev-value")!
const inputButtons = Array.from(document.querySelectorAll("[data-input]"))!
const resolveButton = document.querySelector("[data-resolve]") as HTMLButtonElement
const deleteButton = document.querySelector("[data-del]") as HTMLButtonElement
const resetButton = document.querySelector("[data-reset]") as HTMLButtonElement


///////////////////
///////////////////
//// Functions ////
///////////////////
///////////////////


function insertInput (event: Event) {
let button = event.target as HTMLButtonElement
if (button.innerText === '.' && currentValueElement.value.includes(".")) return
currentValueElement.value += button.innerText
}

function inputCheck (event: Event) {
    let inputField = event.target as HTMLInputElement
        inputField.value = inputField.value.replace(/[^0-9-+\.\*\/]|((?<=[0-9])[-+\*\/](?=[0-9]))|(^[-+\*\/](?=[0-9]))/, '')
        if (inputField.value.includes('.', 0)) {
            inputField.value = inputField.value.replace(/(?<=\d*\.\d*)\.$/, '')
        }
}

function appendPreviousValue () {
if (/[-+\*\/]$/.test(currentValueElement.value)){
    previousValueElement.innerText = currentValueElement.value.replace(/\.(?=[-+\*\/])/g, '')
    currentValueElement.value = ""
}
}


const convertStringToMath = {
    '+': function (x: number, y: number) { return x + y },
    '-': function (x: number, y: number) { return x - y },
    '*': function (x: number, y: number) { return x * y },
    '/': function (x: number, y: number) { return x / y }
}​​​​​​​;

function computeChain () {
    if (/^[-+\*\/]$/.test(currentValueElement.value)) {
        currentValueElement.value = ''
    }
    if (currentValueElement.value && previousValueElement.innerText && /[-+\*\/]$/.test(currentValueElement.value)) {
        let firstNumber = +previousValueElement.innerText.slice(0, -1)
        let secondNumber = +currentValueElement.value.replace(/[-+\*\/]/, '')
        let operator = previousValueElement.innerText.slice(-1)
        let secondOperator = currentValueElement.value.slice(-1)
        previousValueElement.innerText = convertStringToMath[operator as keyof typeof convertStringToMath](firstNumber, secondNumber).toString() + secondOperator
        currentValueElement.value = ''
    }
}

function resolve () {
    if (currentValueElement.value && previousValueElement.innerText) {
        let firstNumber = +previousValueElement.innerText.slice(0, -1)
        let secondNumber = +currentValueElement.value
        let operator = previousValueElement.innerText.slice(-1)

    currentValueElement.value = convertStringToMath[operator as keyof typeof convertStringToMath](firstNumber, secondNumber).toString()
    previousValueElement.innerText = ''
    }
}

function deleteInput () {
    if (currentValueElement.value === "") return
    currentValueElement.value = currentValueElement.value.replace(/.$/, '')
    }
    
function reset () {
    currentValueElement.value = ''
    previousValueElement.innerText = ''
}


/////////////////////////
/////////////////////////
//// Event Listeners ////
/////////////////////////
/////////////////////////

inputButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        insertInput(event)
        computeChain()
        appendPreviousValue()
    })
})

currentValueElement.addEventListener("input", (event) => {
    inputCheck(event)
    computeChain()
    appendPreviousValue()
}
)

deleteButton.addEventListener("click", (deleteInput))

resetButton.addEventListener("click", (reset))

resolveButton.addEventListener("click", (resolve))

currentValueElement.addEventListener("keypress", (event) => {

    if (event.key === 'Enter' || event.key === "=") {
        resolve()
    }
})