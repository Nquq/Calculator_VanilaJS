const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const action = ['-', '+', 'X', '/'];

const output = document.querySelector('.output-screen');
const clearBtn = document.querySelector('.clear');
const buttons = document.querySelectorAll('.btn');
const minusButton = document.querySelector('.plus-minus');

output.textContent = 0;

let firstNumber = '';
let secondNumber = '';
let sign = '';
let isCalculated = false;

clearBtn.addEventListener('click', () => {
    clearOutput();
});

minusButton.addEventListener('click', () => {
    if (!firstNumber) {
        firstNumber = '-0.';
        output.textContent = firstNumber;
    }
    if (!secondNumber && !sign) {
        if (firstNumber.includes('-')) {
            firstNumber = firstNumber.replace('-', '');
            output.textContent = firstNumber;
            return;
        } else {
            firstNumber = '-' + firstNumber;
            output.textContent = firstNumber;
        }
    } else if (sign) {
        if (!secondNumber) {
            secondNumber = '-0.';
            output.textContent = secondNumber;
        } else if (secondNumber.includes('-')) {
            secondNumber = secondNumber.replace('-', '');
            output.textContent = secondNumber;
            return;
        } else {
            secondNumber = '-' + secondNumber;
            output.textContent = secondNumber;
        }
    }
});

buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const key = event.target.textContent;

        if (key === '%') {
            if (!firstNumber) {
                return;
            }
            if (!secondNumber && !sign) {
                firstNumber /= 100;
                output.textContent = firstNumber;
            }
            if (sign === '+' || sign === '-') {
                secondNumber = (firstNumber * secondNumber) / 100;
                output.textContent = secondNumber;
            }
            if (sign === 'X' || sign === '/') {
                secondNumber /= 100;
                output.textContent = secondNumber;
            }
        }

        if (key === '.') {
            if (!firstNumber) {
                firstNumber = '0.';
                output.textContent = firstNumber;
            } else if (!secondNumber && !sign) {
                if (firstNumber.includes('.')) return;
                firstNumber += key;
                output.textContent = firstNumber;
            } else {
                if (secondNumber.includes('.')) return;
                if (!secondNumber) {
                    secondNumber = '0.';
                    output.textContent = secondNumber;
                    return;
                }
                secondNumber += key;
                output.textContent = secondNumber;
            }
        }

        if (digit.includes(key)) {
            if (isCalculated) {
                clearOutput();
            }
            if (!secondNumber && !sign) {
                firstNumber += key;
                output.textContent = firstNumber;
            } else {
                secondNumber += key;
                output.textContent = +secondNumber;
            }
        }

        if (action.includes(key)) {
            isCalculated = false;
            sign = key;
            output.textContent = '';
        }

        if (key === '=') {
            if (!secondNumber) secondNumber = +firstNumber;
            switch (sign) {
                case '+':
                    firstNumber = +firstNumber + +secondNumber;
                    break;
                case '-':
                    firstNumber = +firstNumber - +secondNumber;
                    break;
                case 'X':
                    firstNumber = +firstNumber * +secondNumber;
                    break;
                case '/':
                    firstNumber = +firstNumber / +secondNumber;
                    break;
                default:
                    break;
            }
            if (secondNumber) secondNumber = '';
            isCalculated = true;
            output.textContent = +firstNumber.toFixed(2);
        }

        console.log(firstNumber, sign, secondNumber);
    });
});

function clearOutput() {
    firstNumber = '';
    secondNumber = '';
    sign = '';
    isCalculated = false;
    output.textContent = 0;
}
