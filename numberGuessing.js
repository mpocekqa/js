const min = 1;
const max = 100;
const answer = Math.floor(Math.random() *(max-min+1)) + min;

let attempts = 0;
let guess;
let running = true;

while(running){
    guess = window.prompt("Guess the number between " + min + " and " + max);
    guess = Number(guess);

    if(isNaN(guess)){
        window.alert("Please enter a valid number");
    }
    else if(guess<min || guess>max){
        window.alert("The number " + guess + "is out of range")
    }else{
        attempts++;
        if(guess < answer){
            window.alert("NOO, number is higher")
        }else if(guess > answer){
            window.alert("NOO, number is lower")
        }else{
            window.alert("Correct Number " + guess + " is guessed from " + attempts + ". time") 
            running = false;
        }
    }
}