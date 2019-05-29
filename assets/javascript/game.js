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

var soundText = document.getElementById("sound-text");
var pictureText = document.getElementById("picture-text");
var characterText = document.getElementById("character-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var guessesLeftText = document.getElementById("guesses-left-text");
var guessesText = document.getElementById("guesses-text");

// These are the content for the Word Guess Game
var characters = ["spongebob", "patrick", "squidward", "sandy", "mr.krabs", "pearl", "mrs.puff", "gary", "plankton"];
var images = ["assets/images/spongebob.png", "assets/images/patrick.png", "assets/images/squidward.png", "assets/images/sandy.png", "assets/images/mr-krabs.png", "assets/images/pearl.png", "assets/images/mrs-puff.png", "assets/images/gary.png", "assets/images/plankton.png"]
var sounds = ["assets/sounds/spongebob.mp3", "assets/sounds/patrick.mp3", "assets/sounds/squidward.wav", "assets/sounds/sandy.wav", "assets/sounds/mr-krabs.mp3", "assets/sounds/pearl.mp3", "assets/sounds/mrs-puff.wav", "assets/sounds/gary.wav", "assets/sounds/plankton.mp3"]

// This is the randomization for the contents
var min = 0;
var max = characters.length;
computerGuess = Math.floor(Math.random() * (+max - +min)) + +min;

// These are used to keep track of the current content
var word = characters[computerGuess];
var wordCount = 0;
var correctGuesses = [];

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
    if (guessesLeft > 0 && wordCount != word.length) {

        var userGuess = event.keyCode;
        var charGuess = String.fromCharCode(userGuess).toLowerCase();
    
        if ((event.keyCode >= 65 && event.keyCode <= 90)) {

            if (word.includes(charGuess) && !(correctGuesses.includes(charGuess))) {
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
                correctGuesses.push(charGuess);

            } else {
                if (!(correctGuesses.includes(charGuess)) && !(guesses.includes(charGuess))) {
                    guessesLeft--;
                    guesses.push(String.fromCharCode(userGuess).toLowerCase());
                }
            }

        }

    // Checks to see if the user guessed the word correctly
    } else if (wordCount === word.length) {
        soundText.setAttribute("src", sounds[computerGuess]);
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
        correctGuesses = [];

        alert("YAY! YOU DID IT!!!")

    // Takes the following steps if the user was not able to guess correctly
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
        correctGuesses = [];

        alert("Better luck next time!");
    }

    // Writes the following updates to the HTML
    characterText.textContent = character;
    winsText.textContent = wins;
    lossesText.textContent = losses;
    guessesLeftText.textContent = guessesLeft;
    guessesText.textContent = guesses.toString();

}