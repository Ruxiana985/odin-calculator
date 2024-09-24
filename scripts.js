const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');
const sound=document.getElementById('clicked');
const toggle=document.getElementById('toggle');
const background=document.querySelector('html');
const volume=document.getElementById('off');
const div=document.getElementById('tog');
const link=document.querySelector('a');
let arr2 = [];
let lastOperator = '';

function add(arr) {
    return arr.reduce((acc, value) => acc + value, 0);
}

function subtract(arr) {
    return arr.reduce((acc, value) => acc - value);
}

function multiply(arr) {
    return arr.reduce((acc, value) => acc * value);
}

function divide(arr) {
    return arr.reduce((acc, value) => acc / value);
}

function negative(arr){
    return arr.map(element => { return element*=-1;
        
    });
}

function calculator(operator, arr) {
    switch (operator) {
        case '+':
            return add(arr);
        case '-':
            return subtract(arr);
        case 'x':
            return multiply(arr);
        case '/':
            return divide(arr);
        case '-/+':
            return negative(arr);

        case 'sin':
            return Math.sin(arr);
        default:
            return null;
    }
}
let counter=0;



        
        sound.muted = false;
        volume.style.backgroundImage='url("icon-1628258_1280.png")';

        volume.addEventListener('click', function(e) {
            sound.muted = !sound.muted; // Toggle mute state

            // Change the background image based on the mute state
            if (sound.muted) {
                volume.style.backgroundImage = 'url("mute-1628277_1280.png")'; 
            } else {
                volume.style.backgroundImage = 'url("icon-1628258_1280.png")'; // Replace with your unmute icon
            }
        });



        toggle.addEventListener('click', function(e) {
            counter++;
        
            // Toggle styles based on the counter
            if (counter % 2 === 1) {
                e.target.style.transform = 'translateX(60px)';
                background.style.backgroundColor = 'black';
                div.style.border = '3px solid white';
                link.style.color='white';
            } else {
                e.target.style.transform = 'translateX(-5px)';
                background.style.backgroundColor = 'white';
                div.style.border = '3px solid black';
                link.style.color='black';
            }
        });

let count = 0;

let operator = '';  // Stores the operator selected

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        sound.play();
        
        let value = e.target.textContent;
        display.textContent = value;
        count++;
        
        if (value === 'C') {
            arr2 = [];
            operator = '';
            display.textContent = '';
            count = 0;
        } 
        
        if (!['+', 'x', '/', '-'].includes(value) && value !== '=' && value !== 'C') {
            // Handle multi-digit numbers by concatenating strings first
            if (arr2.length === 0 || operator) {
                arr2.push(value);  // Add the first number or second number
            } else {
                // Concatenate the number if multiple digits
                arr2[arr2.length - 1] = arr2[arr2.length - 1] + value;
              
            }
             // Show the current number
        } 
        
        else if (['+', 'x', '/', '-','-/+'].includes(value)) {
            if (arr2.length > 0 && !operator) {
                operator = value;  // Store the operator when the first operand is ready
            }
        } 
        
        else if (value === '=' && arr2.length === 2 && operator) {
            // Perform the calculation if two operands and an operator exist
            let result = calculator(operator, arr2.map(Number));  // Convert to numbers before calculation
            arr2 = [result];
            operator = '';
            display.textContent = result;  // Display the result
        } else if(value==='Sin' && arr2.length==0){
            operator=value;
        }
        else if(value==='=' && arr2.length==1 && operator==='Sin'){
            let result = calculator(operator, arr2.map(Number));  // Convert to numbers before calculation
            arr2 = [result];
            operator = '';
            display.textContent = result;
        }
        

       
    });
});


