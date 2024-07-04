let fruits = ["apple", "orange","strawberry","pienapple"];

fruits.forEach(upperCase);
fruits.forEach(displayConsole);
fruits.forEach(displayPage);

function upperCase(element, index, array){
    array[index] = element.charAt(0).toUpperCase() + element.slice(1).toLowerCase();
}

function displayConsole(element){
    console.log(element);
}

function displayPage(){
    document.getElementById("fruitList").textContent = fruits.join(', ')
}