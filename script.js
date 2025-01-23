// Select elements
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

// Initialize variables
let currentInput = "";
let result = null;
let operator = null;
let calculationHistory = "";

// Function to update the display
function updateDisplay(value) {
    display.textContent = value || "0";
}

// Function to handle button clicks
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const buttonClass = button.classList;
        const buttonText = button.textContent.trim();

        if (buttonClass.contains("seven") || buttonClass.contains("eight") || buttonClass.contains("nine") ||
            buttonClass.contains("four") || buttonClass.contains("five") || buttonClass.contains("six") ||
            buttonClass.contains("one") || buttonClass.contains("two") || buttonClass.contains("three") ||
            buttonClass.contains("zero") || buttonClass.contains("decimal")) {
            // Handle numbers and decimal point
            if (buttonText === "." && currentInput.includes(".")) return;
            currentInput += buttonText;
            calculationHistory += buttonText;
            updateDisplay(calculationHistory);
        } else if (buttonClass.contains("clear")) {
            // Clear the display
            currentInput = "";
            result = null;
            operator = null;
            calculationHistory = "";
            updateDisplay("0");
        } else if (buttonClass.contains("back")) {
            // Backspace functionality
            currentInput = currentInput.slice(0, -1);
            calculationHistory = calculationHistory.slice(0, -1);
            updateDisplay(calculationHistory || "0");
        } else if (buttonClass.contains("ans")) {
            // Calculate the result
            if (currentInput && operator) {
                const currentNumber = parseFloat(currentInput);
                switch (operator) {
                    case "+":
                        result += currentNumber;
                        break;
                    case "-":
                        result -= currentNumber;
                        break;
                    case "X":
                        result *= currentNumber;
                        break;
                    case "÷":
                        result /= currentNumber;
                        break;
                }
                updateDisplay(result);
                currentInput = result.toString();
                operator = null;
                calculationHistory = result.toString();
            }
        } else if (buttonClass.contains("percentage")) {
            // Percentage calculation
            if (currentInput) {
                currentInput = (parseFloat(currentInput) / 100).toString();
                calculationHistory += " %";
                updateDisplay(currentInput);
            }
        } else if (buttonClass.contains("root")) {
            // Square root calculation
            if (currentInput) {
                currentInput = Math.sqrt(parseFloat(currentInput)).toString();
                calculationHistory += " √";
                updateDisplay(currentInput);
            }
        } else if (buttonClass.contains("plus") || buttonClass.contains("minus") ||
            buttonClass.contains("into") || buttonClass.contains("divide")) {
            // Handle operators
            const operation = buttonClass.contains("plus") ? "+" :
                              buttonClass.contains("minus") ? "-" :
                              buttonClass.contains("into") ? "X" : "÷";
            if (currentInput) {
                if (result === null) {
                    result = parseFloat(currentInput);
                } else if (operator) {
                    const currentNumber = parseFloat(currentInput);
                    switch (operator) {
                        case "+":
                            result += currentNumber;
                            break;
                        case "-":
                            result -= currentNumber;
                            break;
                        case "X":
                            result *= currentNumber;
                            break;
                        case "÷":
                            result /= currentNumber;
                            break;
                    }
                }
                operator = operation;
                calculationHistory += ` ${operator} `;
                currentInput = "";
                updateDisplay(calculationHistory);
            }
        }
    });
});

// Initialize display
updateDisplay("0");
