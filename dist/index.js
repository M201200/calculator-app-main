"use strict";
const currentValueElement = document.querySelector("#current-value");
const previousValueElement = document.querySelector("#prev-value");
const inputButtons = Array.from(document.querySelectorAll("[data-input]"));
const themeButtons = Array.from(document.querySelectorAll("[data-theme]"));
const resolveButton = document.querySelector("[data-solve]");
const deleteButton = document.querySelector("[data-del]");
const resetButton = document.querySelector("[data-reset]");
const colorScheme = localStorage.getItem("color-scheme") || "default";
document.documentElement.setAttribute("data-color-scheme", colorScheme);
setRadioCheck(colorScheme);
function setColorScheme(event) {
    const radio = event.target;
    const radioId = radio.id.toString();
    document.documentElement.setAttribute("data-color-scheme", radioId);
    localStorage.setItem("color-scheme", radioId);
}
function setRadioCheck(colorScheme) {
    const checkedElement = document.querySelector(`#${colorScheme}`);
    checkedElement.checked = true;
}
function insertInput(event) {
    let button = event.target;
    if (button.innerText === '.' && currentValueElement.value.includes("."))
        return;
    currentValueElement.value += button.innerText;
}
function inputCheck(event) {
    let inputField = event.target;
    inputField.value = inputField.value.replace(/[^0-9-+\.\*\/]|((?<=[0-9])[-+\*\/](?=[0-9]))|(^[-+\*\/](?=[0-9]))/, '');
    if (inputField.value.includes('.', 0)) {
        inputField.value = inputField.value.replace(/(?<=\d*\.\d*)\.$/, '');
    }
}
function appendPreviousValue() {
    if (/[-+\*\/]$/.test(currentValueElement.value)) {
        previousValueElement.innerText = currentValueElement.value.replace(/\.(?=[-+\*\/])/g, '');
        currentValueElement.value = "";
    }
}
const convertStringToMath = {
    '+': (x, y) => { return x + y; },
    '-': (x, y) => { return x - y; },
    '*': (x, y) => { return x * y; },
    '/': (x, y) => { return x / y; }
};
function computeChain() {
    if (/^[-+\*\/]$/.test(currentValueElement.value)) {
        currentValueElement.value = '';
    }
    if (currentValueElement.value && previousValueElement.innerText && /[-+\*\/]$/.test(currentValueElement.value)) {
        let firstNumber = +previousValueElement.innerText.slice(0, -1);
        let secondNumber = +currentValueElement.value.replace(/[-+\*\/]/, '');
        let operator = previousValueElement.innerText.slice(-1);
        let secondOperator = currentValueElement.value.slice(-1);
        previousValueElement.innerText = convertStringToMath[operator](firstNumber, secondNumber).toString() + secondOperator;
        currentValueElement.value = '';
    }
}
function solve() {
    if (currentValueElement.value && previousValueElement.innerText) {
        let firstNumber = +previousValueElement.innerText.slice(0, -1);
        let secondNumber = +currentValueElement.value;
        let operator = previousValueElement.innerText.slice(-1);
        currentValueElement.value = convertStringToMath[operator](firstNumber, secondNumber).toString();
        previousValueElement.innerText = '';
    }
}
function deleteInput() {
    if (currentValueElement.value === "")
        return;
    currentValueElement.value = currentValueElement.value.replace(/.$/, '');
}
function reset() {
    currentValueElement.value = '';
    previousValueElement.innerText = '';
}
inputButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        insertInput(event);
        computeChain();
        appendPreviousValue();
    });
});
themeButtons.forEach(button => {
    button.addEventListener("click", (setColorScheme));
});
currentValueElement.addEventListener("input", (event) => {
    inputCheck(event);
    computeChain();
    appendPreviousValue();
});
deleteButton.addEventListener("click", (deleteInput));
resetButton.addEventListener("click", (reset));
resolveButton.addEventListener("click", (solve));
currentValueElement.addEventListener("keypress", (event) => {
    if (event.key === 'Enter' || event.key === "=") {
        solve();
    }
});
//# sourceMappingURL=index.js.map