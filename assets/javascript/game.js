// Custom replaceAt function taken from https://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

// These are the things that are going to be written on index.html
var character = "";
var wins = 0;
var losses = 0;
var guessesLeft = 10;
var guesses = [];

var pictureText = document.getElementById("picture-text");
var characterText = document.getElementById("character-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var guessesLeftText = document.getElementById("guesses-left-text");
var guessesText = document.getElementById("guesses-text");

// These are the content for Word Guess Game
var characters = ["spongebob", "patrick", "squidward", "sandy", "mr.krabs", "pearl", "mrs.puff"];
var images = ["assets/images/spongebob.png", "assets/images/patrick.png", "assets/images/squidward.png", "assets/images/sandy.png", "assets/images/mr-krabs.png", "assets/images/pearl.png", "assets/images/mrs-puff.png"]


// This is the randomization for the contents
var min = 5;
var max = characters.length;
computerGuess = Math.floor(Math.random() * (+max - +min)) + +min;

// These are used to keep track of the current content
var word = characters[computerGuess];
var wordCount = 0;

// Creates the guess format for the current content and displays it
for (var i = 0; i < word.length; i++) {
    if (i === word.length - 1) {
        character += "_";
    } else {
        if (word[i] == ".") {
            character += ".\xa0";
            wordCount++;
        } else {
            character += "_\xa0";
        }
    }
}

characterText.textContent = character;
pictureText.setAttribute("src", images[computerGuess]);

// This is the event on key up
document.onkeyup = function(event) {

    // Checks to see if user can keep guessing or not
    if (guessesLeft > 0 && wordCount!= word.length) {

        var userGuess = event.keyCode;
        var charGuess = String.fromCharCode(userGuess).toLowerCase();
    
        if ((event.keyCode >= 65 && event.keyCode <= 90)) {

            if (characters[computerGuess].includes(charGuess)) {
                for (var j = 0; j < word.length; j++) {
                    if (word[j] === charGuess) {
                        if (j != 0) {
                            character = character.replaceAt(j*2, charGuess);
                            wordCount++;
                        } else {
                            character = character.replaceAt(j, charGuess);
                            wordCount++;
                        }
                    }
                }

            } else {
                guessesLeft--;
                guesses.push(String.fromCharCode(userGuess).toLowerCase());
            }

        }

    } else if (wordCount === word.length) {
        wins++;
        computerGuess = Math.floor(Math.random() * (+max - +min)) + +min;
        word = characters[computerGuess];
        pictureText.setAttribute("src", images[computerGuess]);
        wordCount = 0;
        character= "";
        for (var i = 0; i < word.length; i++) {
            if (i === word.length - 1) {
                character += "_";
            } else {
                if (word[i] == ".") {
                    character += ".\xa0";
                    wordCount++;
                } else {
                    character += "_\xa0";
                }
            }
        }
        guessesLeft = 10;
        guesses = [];

        alert("YAY! YOU DID IT!!!")

    } else {
        losses++;
        computerGuess = Math.floor(Math.random() * (+max - +min)) + +min;
        word = characters[computerGuess];
        pictureText.setAttribute("src", images[computerGuess]);
        wordCount = 0;
        character= "";
        for (var i = 0; i < word.length; i++) {
            if (i === word.length - 1) {
                character += "_";
            } else {
                if (word[i] == ".") {
                    character += ".\xa0";
                    wordCount++;
                } else {
                    character += "_\xa0";
                }
            }
        }
        guessesLeft = 10;
        guesses = [];

        alert("Better luck next time!");
    }

    characterText.textContent = character;
    winsText.textContent = wins;
    lossesText.textContent = losses;
    guessesLeftText.textContent = guessesLeft;
    guessesText.textContent = guesses.toString();

}