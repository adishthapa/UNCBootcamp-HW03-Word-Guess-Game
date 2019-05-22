var wins = 0;
var losses = 0;
var guessesLeft = 10;
var guesses = [];

var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var guessesLeftText = document.getElementById("guesses-left-text");
var guessesText = document.getElementById("guesses-text");

document.onkeyup = function(event) {

    winsText.textContent = wins;
    lossesText.textContent = losses;
    guessesLeftText.textContent = guessesLeft;
    guessesText.textContent = guesses.toString();
    
}