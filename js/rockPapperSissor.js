const options = document.querySelectorAll('.weapons img');
const yourWeapon = document.querySelector('.your-hand img');
const botWeapon = document.querySelector('.bot-hand img');
const gameMessageRPS = document.getElementById('game-message');
const endOfGameRPS = document.querySelector('.end-of-game-RPS');
const rockPaperSissorScore = document.getElementById('rockPaperSissorScore');
const gameBoard = document.querySelector('.game-board');
const gameArray = ['rock', 'paper', 'sissor']; // used to compare players and bots "weapons"

let yourSelectedWeapon, // displays which "weapon" you have clicked on
    botWeaponIndex = 0, // displays right img for bot
    yourScoreRPS = 0,
    botScoreRPS = 0;

// toggels a class name
const toggles = (elem, htmlclass) => elem.classList.toggle(htmlclass);

// displays game and enables buttons
const newRockPapperSissorGame = () => {
    const rockPapperSissorContainer = document.querySelector(".rockPapperSissor");
    rockPapperSissorContainer.classList.remove('display-none');
    options.forEach(option => {
        option.addEventListener("click", startGameRPS)
    });
}

// saves your and bots "weapon" 
function startGameRPS(event) {
    options.forEach(option => {
        option.removeEventListener("click", startGameRPS)
    });
    botWeaponIndex = Math.floor(Math.random() * 3);
    yourSelectedWeapon = this;
    newRoundresetRPS();
    setTimeout(() => showWeapon(event), 2100);
    showGameMessage();
}

// resets for new round
function newRoundresetRPS() {
    yourWeapon.src = options[0].src;
    botWeapon.src = options[0].src;
    gameBoard.classList.remove('display-none');
    toggles(yourWeapon, 'your-animation');
    toggles(botWeapon, 'bot-animation');
    toggles(yourSelectedWeapon, 'selected-weapon');
}

// displays interaktiv messages
function showGameMessage() {
    setTimeout(() => gameMessageRPS.textContent = 'rock', 333);
    setTimeout(() => gameMessageRPS.textContent = 'paper', 999);
    setTimeout(() => gameMessageRPS.textContent = 'sissor', 1666);
}

// displays your and bots "weapon"
function showWeapon(event) {
    toggles(yourSelectedWeapon, 'selected-weapon');
    yourWeapon.src = event.target.src;
    botWeapon.src = options[botWeaponIndex].src;
    whoWinsRound(event.target);
}

// decides who wins and updates score
function whoWinsRound(event) {
    const user = event.previousElementSibling.textContent; // heading for weapon
    const bot = gameArray[botWeaponIndex];
    if (user === bot) {
        gameMessageRPS.textContent = 'Draw!';
    } else if (user === 'rock' && bot === 'sissor' || user === 'paper' && bot === 'rock' || user === 'sissor' && bot === 'paper') {
        gameMessageRPS.textContent = 'You won!';
        yourScoreRPS++;
    } else {
        gameMessageRPS.textContent = 'You lose!';
        botScoreRPS++;
    }
    rockPaperSissorScore.textContent = `You - Bot: ${yourScoreRPS} - ${botScoreRPS}`; // updates score
    setTimeout(whoWinsGameRPS, 800);
}

// checks if player or bot got 5 wins
function whoWinsGameRPS() {
    toggles(yourWeapon, 'your-animation');
    toggles(botWeapon, 'bot-animation');
    if (yourScoreRPS === 1) gameOverRPS('Victory!<br>You reached 5 wins first!');
    else if (botScoreRPS === 1) gameOverRPS('Game Ovar!<br>The bot got 5 wins before you did!');
    else options.forEach(option => {
        option.addEventListener("click", startGameRPS)
    });
}

// displays messages who won, when game is finnihed and adds play again button
function gameOverRPS(message) {
    toggles(endOfGameRPS, 'display-none');
    endOfGameRPS.firstElementChild.innerHTML = message;
    const PlayAgainBtnRPS = document.getElementById('play-again-btr-RPS');
    PlayAgainBtnRPS.addEventListener('click', resetRPS);
}

// resets all data
function resetRPS() {
    toggles(endOfGameRPS, 'display-none');
    yourScoreRPS = 0;
    botScoreRPS = 0;
    rockPaperSissorScore.textContent = '';
    gameMessageRPS.textContent = '';
    toggles(gameBoard, 'display-none');
    newRockPapperSissorGame();
}