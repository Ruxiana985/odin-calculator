const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');
const sound=document.getElementById('clicked');
const toggle=document.getElementById('toggle');
const background=document.querySelector('html');
const volume=document.getElementById('off');
const div=document.getElementById('tog');

let lastOperator = '';

function add(arr) {
    return arr.reduce((acc, value) => acc + value, 0).toFixed(3);
}

function subtract(arr) {
    return arr.reduce((acc, value) => acc - value).toFixed(3);
}

function multiply(arr) {
    return arr.reduce((acc, value) => acc * value).toFixed(3);
}

function divide(arr) {
    return arr.reduce((acc, value) => acc / value).toFixed(3);
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

        case 'Sin':
            return (Math.sin(arr)).toFixed(4);
        
        case 'Cos':
            return (Math.cos(arr)).toFixed(4);
        case 'Tan':
            return (Math.tan(arr)).toFixed(4);
        case 'Log':
            return (Math.log10(arr)).toFixed(4);
        case '%':
            return arr/100;
        case '√':
            return (Math.sqrt(arr)).toFixed(4);
        case 'x^y':
            return Math.pow(arr[0],arr[1]);
        default:
            return null;
    }
}
let counter=0;



        
        sound.muted = false;
        volume.style.backgroundImage='url("speaker-31227_1280.png")';

        volume.addEventListener('click', function() {
            sound.muted = !sound.muted; // Toggle mute state

            // Change the background image based on the mute state
            if (sound.muted) {
                volume.style.backgroundImage = 'url("mute-1628277_1280.png")'; 
            } else {
                volume.style.backgroundImage = 'url("speaker-31227_1280.png")'; // Replace with your unmute icon
            }
        });



        toggle.addEventListener('click', function(e) {
            counter++;
        
            // Toggle styles based on the counter
            if (counter % 2 === 1) {
                e.target.style.transform = 'translateX(60px)';
                background.style.backgroundColor = 'black';
                div.style.border = '3px solid white';
            } else {
                e.target.style.transform = 'translateX(-5px)';
                background.style.backgroundColor = 'white';
                div.style.border = '3px solid black';
            }
        });

        let i = 0;
        let arr1 = [];
        let operator = null;
        let countClick = 0;
        
        const operatorCollection = ['+', '-', 'x', '/', 'Sin', 'Cos', 'Tan', '-/+','Log','%','√','x^y'];
        const numCollection = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9','.'];
        
        
        buttons.forEach(button => {
            button.addEventListener('click', function (e) {
                
                sound.play();
                countClick++;
                let value = e.target.textContent;
                
                if(value==='C'){
                    arr1=[];
                    operator=null;
                    num1=null;
                    countClick=0;
                    i=0;
                    display.textContent='';
                }
        
                if (numCollection.includes(value)) {
                    // Handling the input of numbers
                    
                    let num1 = value;
                    if (countClick > 1) {
                        // Concatenate to form multi-digit numbers
                        arr1[i] = (arr1[i] || '') + num1;
                        display.textContent=arr1[i];
                    } else {
                        arr1[i] = num1;
                        display.textContent=arr1[i];
                    }

        
                } else if (operatorCollection.includes(value)) {
                    // Handling the operator input

                    display.textContent=value;
                    
                    operator = value;
                    i++;
                    countClick = 0;
                    if(value==='-/+' || value==='x^y'){
                        display.textContent='';
                    } 
                     // Reset countClick for the next number input
                    if(value==='Sin'|| value==='Cos'|| value==='Tan'||value==='Log'|| value==='%'|| value==='√'){
                        operator=value;
                        i=0;
                        
                        display.textContent=value;
                        
                    }
                } else if (value === '=') {
                    // Perform calculation and display the result
                    
                    let result = calculator(operator, arr1.map(Number)); // Convert array to numbers
                    display.textContent=result; 

                    i = 0;
                    arr1= [Number(result)];
                }
            });
        });


