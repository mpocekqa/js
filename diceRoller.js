const diceResult = document.getElementById("diceResult");
const diceImages = document.getElementById("diceImages");
const selectedDices = document.getElementById("selectedDices");
const selectedDicesImages = document.getElementById("selectedDicesImages");
const rollButton = document.getElementById("rollButton");



let savedValues = [];
let savedDicesImages = [];
let values = [];
let images = [];
let numOfDice = 5;
let maxRolles = 3;
let rollNum = 1;


function rollDice(){

    if(rollNum <=3){

    values = [];
    images = [];

    for(let i = 0; i < numOfDice; i++){
        const value = Math.floor(Math.random() * 6) + 1;
        values.push(value);
        images.push(`<img onclick="saveDice(${i})" id="image${i}" name="${value}" src="dice_images/${value}.png">`)
    }

    diceResult.textContent = `: ${values.join(', ')}`;
    diceImages.innerHTML = images.join('');

    rollNum = rollNum+1;
        if(rollNum == 2){
            rollButton.textContent = "2nd time"
        }
        if(rollNum == 3){
            rollButton.textContent = "3rd time"
        }
    }
    else{
        window.alert("Pa bacao si vec 3 puta");
    }
}

function saveDice(id){
    let valueOftheDice = document.getElementById("image"+id).getAttribute('name');
    savedValues.push(valueOftheDice);
    savedDicesImages.push(`<img onclick="unsaveDice(this.name)" name=${valueOftheDice} src="dice_images/${valueOftheDice}.png">`)

    selectedDices.textContent = `saved: ${savedValues.join(', ')}`;
    selectedDicesImages.innerHTML = savedDicesImages.join('');

    let indexInArray;
    for (let index = 0; index < values.length; index++) {
        if(valueOftheDice==values[index]){
            indexInArray = index;
            break;
        }
    }
        values.splice(indexInArray,1);
        
        images = [];

    for(let i = 0; i < values.length; i++){
        let value = values[i];
        images.push(`<img onclick="saveDice(${i})" id="image${i}" name="${value}" src="dice_images/${value}.png">`)
    }
    diceResult.textContent = `: ${values.join(', ')}`;

    diceImages.innerHTML = images.join('');
    numOfDice = numOfDice-1;
}

function saveResult(){
    console.log(savedValues);
    let number = savedValues[0];
    let zbir = 0;
    for (let index = 0; index < savedValues.length; index++) {
        savedValues[index]= Number(savedValues[index]);
        zbir += savedValues[index];
        
    }
    document.getElementById(number + "2").textContent = zbir;
}

function unsaveDice(element){
    console.log("sacuvane vrednosti: " + savedValues);
    console.log("inicijalne vrednosti: " + values);
    values.push(element);
    console.log("nakon prebacivanja: " + values);
    let indexOfElement;
    for (let index = 0; index < savedValues.length; index++) {
        if(element==savedValues[index]){
            indexOfElement = index;
        }   
    }
    console.log("index: " + indexOfElement);

    savedValues.splice(indexOfElement,1);

    console.log("nakon prebacivanja sacuvane vrednosti: " + savedValues);

    images = [];
    for(let i = 0; i < values.length; i++){
        let value = values[i];
        images.push(`<img onclick="saveDice(${i})" id="image${i}" name="${value}" src="dice_images/${value}.png">`)
    }

    diceResult.textContent = ``;

    diceResult.textContent = `: ${values.join(', ')}`;

    diceImages.innerHTML = images.join('');
    selectedDicesImages.innerHTML = '';

    selectedDices.textContent = `saved: ${savedValues.join(', ')}`;
    savedDicesImages = [];

    for(let i = 0; i < savedValues.length; i++){
        let value = savedValues[i];
        savedDicesImages.push(`<img onclick="unsaveDice(this.name)" name="${value}" src="dice_images/${value}.png">`)
    }

    selectedDicesImages.innerHTML = savedDicesImages.join('');
    numOfDice = numOfDice+1;
    
}