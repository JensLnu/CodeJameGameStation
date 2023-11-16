// referenser till element
const gameMessage = document.getElementById("gameMessage");
const guessedNumberInput = document.getElementById("guessedNumber");
const submitNumBtn = document.getElementById("submitNum");
const yourGuesses = document.getElementById("yourGuesses");
const botGuess = document.getElementById("botGuess");
// globala variabler
let correctAnswer;
let numberOfGuesses;
let guessNum;
let userGuesses;           // array för användarens gissningar
let botGuesses;            // array för bottens gissningar
let userScore = 0;         // spelarens poäng
let botScore = 0;          // bottens poäng
let lowGuess;
let highGuess;
let guessOutOfbounds = false;
let usersTurn = true;   // håller reda på vems tur i spelet det är

function newGuessNumberGame() {
    const guessNumberGame = document.querySelector(".guessNumberGame");
    guessNumberGame.style.display = 'block';
    correctAnswer = Math.floor(Math.random() * 101);
    gameMessage.textContent = '';
    yourGuesses.textContent = '';
    botGuess.textContent = '';
    userGuesses = [];
    botGuesses = [];
    numberOfGuesses = 0;
    lowGuess = 0;
    highGuess = 100;
    console.log(correctAnswer + ' correctanswer')
    startGame();
}

function startGame() {
    guessedNumberInput.value = '';
    if (usersTurn) {
        guessedNumberInput.focus();
        submitNumBtn.addEventListener("click", guessNumber);
        guessedNumberInput.addEventListener("keydown", enablerEnter);
    } else { // bottens tur
        renderBotsGuess();
    }
}

function enablerEnter(e) {
    if (e.keyCode == 13) guessNumber();
}

function guessNumber() {
    guessNum = Number(guessedNumberInput.value);
    constrolGuessedNumber();
    checkPreviousGuess();
    if (guessOutOfbounds) {
        guessOutOfbounds = false;
        return startGame();
    }
    removeEventAndClass();
    userGuesses.push(guessNum);
    yourGuesses.textContent = userGuesses.join(', ');

    if (guessNum == correctAnswer) {
        gameMessage.textContent = `Congratulations you have guessed the right number: ${correctAnswer}`;
        userScore++;
        return gameFinnished();

    } else if (guessNum < correctAnswer) {
        gameMessage.textContent = `${guessNum} is to low.`;
        lowGuess = guessNum + 1;
        numberOfGuesses++;
    } else {
        gameMessage.textContent = `${guessNum} is to high.`;
        highGuess = guessNum - 1;
        numberOfGuesses++;
    }
    usersTurn = false;
    setTimeout(startGame, 2000);
};

function constrolGuessedNumber() {
    const rightFormat = /^\d{1,3}$/;
    if (!rightFormat.test(guessNum) || guessNum > 100 || guessNum < 0) {
        guessedNumberInput.classList.add('wrongInput');
        gameMessage.textContent = 'You can only guess on a number between 0-100.';
        guessOutOfbounds = true;
    }
}

function checkPreviousGuess() {
    if (guessNum > highGuess || guessNum < lowGuess) {
        guessedNumberInput.classList.add('wrongInput');
        gameMessage.textContent = `Hold up! you should now guess between ${lowGuess}-${highGuess}.`;
        guessOutOfbounds = true;
    }
}

function removeEventAndClass() {
    submitNumBtn.removeEventListener("click", guessNumber);
    guessedNumberInput.removeEventListener("keydown", enablerEnter);
    guessedNumberInput.classList.remove('wrongInput');
}

function renderBotsGuess() {
    usersTurn = true;
    guessNum = Math.floor(Math.random() * (highGuess - lowGuess) + lowGuess);
    botGuesses.push(guessNum);
    botGuess.textContent = botGuesses.join(', ');

    if (guessNum == correctAnswer) {
        gameMessage.textContent = `Bot won! It guessed the right number: ${correctAnswer}`;
        botScore++;
        return gameFinnished();
    } else if (guessNum < correctAnswer) {
        gameMessage.textContent = `Bot guessed ${guessNum}, that is to low.`;
        lowGuess = guessNum + 1;
    } else {
        gameMessage.textContent = `Bot guessed ${guessNum}, that is to high.`;
        highGuess = guessNum - 1;
    }
    if (numberOfGuesses == 5) {
        setTimeout(function () {
            gameMessage.textContent = `Draw! Both reached ${numberOfGuesses} guesses, The number was ${correctAnswer}`;
            return gameFinnished();
        }, 2000);
    }
    startGame();
}

function gameFinnished() {
    const guessGameScore = document.getElementById("guessGameScore");
    guessGameScore.textContent = `You - Bot: ${userScore} - ${botScore}`;

    const playAgainBtn = document.createElement("button");
    const localGuessNumberContainer = document.querySelector(".local-guess-number-container");

    playAgainBtn.textContent = 'Play again!';
    playAgainBtn.classList.add('buttonStyle');
    localGuessNumberContainer.appendChild(playAgainBtn);

    submitNumBtn.removeEventListener("click", guessNumber);
    playAgainBtn.addEventListener("click", function () {
        localGuessNumberContainer.removeChild(playAgainBtn);
        newGuessNumberGame();
    });
};