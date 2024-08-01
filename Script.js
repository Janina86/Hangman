let words = ["BOOK", "CLASS", "UNIVERSITY"];
let chosenWord, displayWord, life, guessedLetters, lettersLeft;

function startGame() {
    chosenWord = pickWord(words);
    displayWord = Array(chosenWord.length).fill("_");
    lettersLeft = chosenWord.length;
    guessedLetters = [];
    life = 7;

    updateDisplay();
    document.getElementById("finalMessage").innerText = "";
    document.getElementById("restartButton").style.display = "none";
}

function pickWord(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function updateDisplay() {
    document.getElementById("wordToDisplay").innerText = displayWord.join(' ');
    document.getElementById("livesRemaining").innerText = `Lives remaining: ${life}`;
}

function checkLetter() {
    let letter = document.getElementById("enterLetter").value.toUpperCase();
    document.getElementById("enterLetter").value = "";

    if (guessedLetters.includes(letter)) {
        document.getElementById("finalMessage").innerText = "Invalid format.";
        return;
    }

    document.getElementById("finalMessage").innerText = ""; 

    guessedLetters.push(letter);
    if (updateWord(letter)) {
        if (lettersLeft === 0) {
            endGame("You WIN!");
        }
    } else {
        --life;
        if (life <= 0) {
            endGame("You LOSE!");
        }
    }

    updateDisplay();
}

function updateWord(letter) {
    let letterFound = false;
    for (let i = 0; i < chosenWord.length; ++i) {
        if (chosenWord[i] === letter) {
            if (displayWord[i] === "_") {
                displayWord[i] = letter;
                --lettersLeft;
                letterFound = true;
            }
        }
    }
    return letterFound;
}

function endGame(message) {
    document.getElementById("finalMessage").innerText = message;
    document.getElementById("restartButton").style.display = "inline";
}

window.addEventListener('load', startGame);
