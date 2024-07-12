const diceResult = document.getElementById("diceResult");
const diceImages = document.getElementById("diceImages");
const selectedDices = document.getElementById("selectedDices");
const selectedDicesImages = document.getElementById("selectedDicesImages");
const rollButton = document.getElementById("rollButton");
const rollLabel = document.getElementById("throwLabel");



let savedValues = [];
let savedDicesImages = [];
let values = [];
let images = [];
let numOfDice = 5;
let maxRolles = 3;
let rollNum = 1;
let throwNum = 1;
let called = false;



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
        }if(rollNum == 4){
            rollButton.textContent = "round finished"
        }
    }
    else{
        window.alert("Pa bacao si vec 3 puta");
    }
}

function diceRolledCheck(){
    if (values.length==0) {
        window.alert("Please roll dice");
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

function saveResultDown(){
    diceRolledCheck();
    let number;
    sumOfNumbers = 0;
    for (let index = 0; index < savedValues.length; index++) {
        number = savedValues[index];
        if((index + 1) < savedValues.length){
            if(number != savedValues[index+1]){
                window.alert("Pa nisu ti isti brojevi!!!")   
            }
        }
        sumOfNumbers += Number (number);
    }
    console.log("Number je: " + number);
    rows = [1,2,3,4,5,6]
    let availableNumber;
    for (let index = 0; index < 6; index++) {
        el = document.getElementById(rows[index] + "2");
        //console.log(rows[index] + "2");
        if (el.textContent===' ') {
            
            availableNumber = rows[index];
            console.log("bingo: " + availableNumber);
            break;
        }  
    }

    console.log("Available is: " + availableNumber);

    if(number == availableNumber){
        console.log("isti su");
        document.getElementById(availableNumber + "2").textContent = sumOfNumbers;
    }else{
        window.alert("Polje za broj " + number + " nije dostupno");
    }

    if(number==6){
        let sumDown = 0
        for (let index = 0; index < rows.length; index++) {
            let element = Number (document.getElementById(rows[index] + "2").textContent);
            sumDown += element;  
        }
        if(sumDown>=60){
            sumDown+=30;
        }
        document.getElementById("sum2").textContent = sumDown;
    }
    newThrow();    
}

function newThrow(){
        if(called){
            let sum = 0;
                for (let index = 0; index < savedValues.length; index++) {
            sum += savedValues[index];
        }
        document.getElementById(savedValues[0] + "5").textContent = sum;
        }

        values = [];
        images = [];
        savedValues = [];
        savedDicesImages = [];
        throwNum += 1;
        rollLabel.textContent = "throw " + throwNum + ". :";
        rollButton.textContent = "1st time"
        rollNum = 1;
        numOfDice = 5;
        diceResult.textContent = ``;
        diceImages.innerHTML = ``;
        selectedDices.textContent = ``;
        selectedDicesImages.innerHTML = ``;
        
}

function saveResultRandom(element){
    if(element.textContent!==' '){
        window.alert("zauzeto!");
    }else{
        let number;
        sumOfNumbers = 0;
        for (let index = 0; index < savedValues.length; index++) {
            number = savedValues[index];
            if((index + 1) < savedValues.length){
                if(number != savedValues[index+1]){
                    window.alert("Pa nisu ti isti brojevi!!!")   
                }
            }
            sumOfNumbers += Number (number);
        }
        console.log("Number je: " + number);
        
        document.getElementById(number + "3").textContent = sumOfNumbers;
    }

    let e = document.getElementById("13").textContent;
    console.log(e);

    let allPopulated = true;
    for (let index = 1; index < 7; index++) {
        let id = index + "3";
        id = String(id);
        let element = document.getElementById(id).textContent;
        console.log(element);
        if(element==' '){
            allPopulated = false;
            break;
        } 
        console.log(allPopulated);       
    }
    if(allPopulated){
        let sumUp = 0
        for (let index = 1; index < 7; index++) {
            let element = Number (document.getElementById(index + "3").textContent);
            sumUp += element;  
        }
        if(sumUp>=60){
            sumUp+=30;
        }
        document.getElementById("sum3").textContent = sumUp;
    }
    newThrow();    
}

function saveResultUp(){
    let number;
    sumOfNumbers = 0;
    for (let index = 0; index < savedValues.length; index++) {
        number = savedValues[index];
        if((index + 1) < savedValues.length){
            if(number != savedValues[index+1]){
                window.alert("Pa nisu ti isti brojevi!!!")   
            }
        }
        sumOfNumbers += Number (number);
    }
    console.log("Number je: " + number);
    rows = [6,5,4,3,2,1]
    let availableNumber;
    for (let index = 0; index < 6; index++) {
        el = document.getElementById(rows[index] + "4");
        //console.log(rows[index] + "2");
        if (el.textContent===' ') {
            
            availableNumber = rows[index];
            console.log("bingo: " + availableNumber);
            break;
        }      
    }

    console.log("Available is: " + availableNumber);

    if(number == availableNumber){
        console.log("isti su");
        document.getElementById(availableNumber + "4").textContent = sumOfNumbers;
    }else{
        window.alert("Polje za broj " + number + " nije dostupno");
    }

    if(number==1){
        let sumUp = 0
        for (let index = 0; index < rows.length; index++) {
            let element = Number (document.getElementById(rows[index] + "4").textContent);
            sumUp += element;  
        }
        if(sumUp>=60){
            sumUp+=30;
        }
        document.getElementById("sum4").textContent = sumUp;
    }
    newThrow();    
}

function calculateDiceSum(element){
    let sum = 0;
    sum = Number (sum);
    if(savedValues.length!=5){
        window.alert("Please select 5 diceis");
    }else{
        for (let index = 0; index < savedValues.length; index++) {
            sum += Number (savedValues[index]);
        }
        document.getElementById(element.id).textContent = sum;
    }
    newThrow();
}

function call(element){
    console.log("Pozvan sam");
    
    if (called == false) {
        if(rollNum!=2){
            window.alert("call posible only after first dice roll")
        }else{
            called = true;
            let button = `<button onclick="saveCalled()" id="saveCalled">save called</button>`;
            //document.getElementById("container1").insertAdjacentHTML ('afterend', button);
            document.getElementById("container1").innerHTML = button;
            document.getElementById(element.id).style.backgroundColor = "#8DFF33";
            document.getElementById(element.id).innerText = "Called";
        }
    }
}

function saveCalled(){
    console.log("ovde sam, a called je:" + called);
    let sum = 0;
    for (let index = 0; index < savedValues.length; index++) {
        sum += Number (savedValues[index]);
    }
    let domElemetnt = document.getElementById(savedValues[0] + "5");
    domElemetnt.textContent = sum;
    domElemetnt.style.backgroundColor = "#FFFFFF";
    called=false;
    document.getElementById("container1").innerHTML = '';
    newThrow();
}

function minmax(element){
    let elementId = element.getAttribute("name");
    let numbersOf1 = document.getElementById(elementId).textContent;
    console.log(numbersOf1);
    let maxId;
    let minId;
    if(element.id=="minmaxDown"){
        maxId = "maxDown";
        minId = "minDown";
    }else if(element.id=="minmaxRandom"){
        maxId = "maxRandom";
        minId = "minRandom";
    }else if(element.id=="minmaxUp"){
        maxId = "maxUp";
        minId = "minUp";
    }else if(element.id=="minmaxFirst"){
        maxId = "86";
        minId = "96";
    }
    max = Number (document.getElementById(maxId).textContent);
    min = Number (document.getElementById(minId).textContent);
    console.log(numbersOf1, max, min);
    if(numbersOf1 ===' ' || max == 0 || min == 0){
        window.alert("ones, min and max can not be 0")
    }else{
        console.log(numbersOf1, max, min);
        numbersOf1 = Number (numbersOf1);
        let minmax = (max-min)*numbersOf1;
        document.getElementById(element.id).textContent = minmax;
    }
    newThrow();
}

function kenta(element){
    if(savedValues.length!=5){
        window.alert("Please select all dices");
    }else{
        savedValues.sort();
        console.log(savedValues);
        for (let index = 0; index < savedValues.length - 1; index++) {
            let difference = savedValues[index + 1] - savedValues[index];
            if(difference != 1){
                window.alert("nije kenta");
                break;
            }else{
                if(rollNum == 2){
                    document.getElementById(element.id).textContent="66";
                }else if(rollNum == 3){
                    document.getElementById(element.id).textContent="56";
                }else{
                    document.getElementById(element.id).textContent="46";
                }
                
            }
        }
    }
    newThrow();
    
}

function triple(element){
    for (let index = 0; index < savedValues.length; index++) {
        number = savedValues[index];
        if((index + 1) < savedValues.length){
            if(number != savedValues[index+1]){
                window.alert("Pa nisu ti isti brojevi!!!")   
            }
        }
    }

    if(savedValues.length<3){
        window.alert("nemas triling")
    }else{
        let triling = (savedValues[0] * 3) + 20;
        document.getElementById(element.id).textContent = triling;
    }
    newThrow();
}

function full(element){
    savedValues.sort();
    let firstValue = Number (savedValues[0]);
    let secondValue;
    for (let index = 0; index < savedValues.length; index++) {
        let x = Number (savedValues[index]);
        if(x!=firstValue){
            secondValue=x;
            break;
        }
    }
    console.log(firstValue);
    console.log(secondValue);
    let countFirstValue = 0;
    let countSecondValue = 0;
    for (let index = 0; index < savedValues.length; index++) {
        let x = savedValues[index];
        if(x == firstValue){
            countFirstValue+=1;
        }else if(x==secondValue){
            countSecondValue+=1;
        }else{
            console.log("Broj je problem: " + x)
        }
        newThrow();
    }

    console.log("Broj " + firstValue + " se pojavljuje " + countFirstValue + ". puta");
    console.log("Broj " + secondValue + " se pojavljuje " + countSecondValue + ". puta");

    let checkNumber = countFirstValue + countSecondValue;

    if(checkNumber!=5){
        window.alert("ovo nije full")
    }else{
        let zbir = 0;
        for (let index = 0; index < savedValues.length; index++) {
            let x = Number (savedValues[index]);
            zbir+=x;
        }
        let fullScore = zbir + 30;
        document.getElementById(element.id).textContent = fullScore;
    }
    newThrow();
}

function poc(element){
    if(savedValues.length<4){
        window.alert("Molim vas selektujte 4 broja")
    }else{
        let same = true;
        for (let index = 0; index < savedValues.length -1; index++) {
            let x = savedValues[index];
            if(x != savedValues[index+1]){
                same = false;
            }   
        }
        console.log(same);
        if(same){
            let val = (savedValues[0] * 4) + 40;
            document.getElementById(element.id).textContent = val;
        }else{
            window.alert("nije poker")
        }
    }
    newThrow();
}

function ja(element){
    if(savedValues.length<5){
        window.alert("Molim vas selektujte 5 brojeva")
    }else{
        let same = true;
        for (let index = 0; index < savedValues.length -1; index++) {
            let x = savedValues[index];
            if(x != savedValues[index+1]){
                same = false;
            }   
        }
        if(same){
            let val = (savedValues[0] * 5) + 50;
            document.getElementById(element.id).textContent = val;
        }else{
            window.alert("nije jamb")
        }
    }
    newThrow();
}


function first(element){
    if(element.textContent!==' '){
        window.alert("zauzeto!");
    }else if(rollNum!=2){
        window.alert("Nije ti prvo bacanje")
    }
    else{
        let number;
        sumOfNumbers = 0;
        for (let index = 0; index < savedValues.length; index++) {
            number = savedValues[index];
            if((index + 1) < savedValues.length){
                if(number != savedValues[index+1]){
                    window.alert("Pa nisu ti isti brojevi!!!")   
                }
            }
            sumOfNumbers += Number (number);
        }
        console.log("Number je: " + number);

        
        if (Number (element.getAttribute("name")) != Number (savedValues[0])) {
            window.alert("Nije to broj: " + savedValues[0]);
        }else{
            document.getElementById(element.getAttribute("name") + "6").textContent = sumOfNumbers;
        }
    }

    let e = document.getElementById("13").textContent;
    console.log(e);

    let allPopulated = true;
    for (let index = 1; index < 7; index++) {
        let id = index + "6";
        id = String(id);
        let element = document.getElementById(id).textContent;
        console.log(element);
        if(element==' '){
            allPopulated = false;
            break;
        } 
        console.log(allPopulated);       
    }
    if(allPopulated){
        let sumUp = 0
        for (let index = 1; index < 7; index++) {
            let element = Number (document.getElementById(index + "6").textContent);
            sumUp += element;  
        }
        if(sumUp>=60){
            sumUp+=30;
        }
        document.getElementById("76").textContent = sumUp;
    }
    newThrow();
}

function calculateDiceSumfirst(element){
    if(element.textContent!==' '){
        window.alert("zauzeto!");
    }else if(rollNum!=2){
        window.alert("Nije ti prvo bacanje")
    }
    else{
        calculateDiceSum(element);
    }
}

function kentaFirst(element){
    if(element.textContent!==' '){
        window.alert("zauzeto!");
    }else if(rollNum!=2){
        window.alert("Nije ti prvo bacanje")
    }
    else{
        kenta(element);
    }
}

function tripleFirst(element){
    if(element.textContent!==' '){
        window.alert("zauzeto!");
    }else if(rollNum!=2){
        window.alert("Nije ti prvo bacanje")
    }
    else{
        triple(element);
    }
}

function pocFirst(element){
    if(element.textContent!==' '){
        window.alert("zauzeto!");
    }else if(rollNum!=2){
        window.alert("Nije ti prvo bacanje")
    }
    else{
        poc(element);
    } 
}

function fullFirst(element){
    if(element.textContent!==' '){
        window.alert("zauzeto!");
    }else if(rollNum!=2){
        window.alert("Nije ti prvo bacanje")
    }
    else{
        full(element);
    } 
}


