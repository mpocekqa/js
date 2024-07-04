const savedValues = [];
const savedDicesImages = [];
let values = [];
let images = [];
let numOfDice = 5;
let maxRolles = 3;
let rollNum = 1;


function rollDice(){
    //numOfDice = document.getElementById("numOfDice").value;
    if(rollNum <=3){
    //numOfDice = 5;
    const diceResult = document.getElementById("diceResult");
    const diceImages = document.getElementById("diceImages");

    values = [];
    images = [];

    for(let i = 0; i < numOfDice; i++){
        const value = Math.floor(Math.random() * 6) + 1;
        values.push(value);
        images.push(`<img onclick="saveDice(${i})" id="image${i}" name="${value}" src="dice_images/${value}.png">`)
    }

    diceResult.textContent = `dice: ${values.join(', ')}`;
    diceImages.innerHTML = images.join('');
    rollNum = rollNum+1;
    }
    else {
        window.alert("Pa bacao si vec 3 puta");
    }
}

function saveDice(id){
    //document.getElementById("diceImages").innerHTML = "";

    const diceImages = document.getElementById("diceImages");
    const selectedDices = document.getElementById("selectedDices");
    let valueOftheDice = document.getElementById("image"+id).getAttribute('name');
    savedValues.push(valueOftheDice);
    savedDicesImages.push(`<img src="dice_images/${valueOftheDice}.png">`)

    selectedDices.textContent = `saved dices: ${savedValues.join(', ')}`;
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
    diceResult.textContent = `dice: ${values.join(', ')}`;

    diceImages.innerHTML = images.join('');
    numOfDice = numOfDice-1;
    //document.getElementById("numOfDice").value = numOfDice;

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