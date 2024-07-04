let randomNum;
let min;
let max;

//console.log(randomNum);


document.getElementById("btnGenerate").onclick = function(){
    min = document.getElementById("snInput").value;
    max = document.getElementById("lnInput").value;
    randomNum = Math.floor(Math.random()*(max-min)) + Number(min);
    document.getElementById("gnLabel").textContent = "Generated number between " + min + " and " + max + " is " + randomNum;
}

