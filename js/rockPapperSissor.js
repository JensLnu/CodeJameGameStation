const gameArray = ['rock', 'paper', 'sissor'];
// const rock = document.getElementById('rock');
// const paper = document.getElementById('paper');
// const sissor = document.getElementById('sissor');
// const options = [rock, paper, sissor];

const options = document.querySelectorAll('.weapons img');
const yourWeapon = document.querySelector('.your-hand img');
const botWeapon = document.querySelector('.bot-hand img');
const gameMessageRPS = document.getElementById('game-message');
const endOfGameRPS = document.querySelector('.end-of-game-RPS');
const rockPaperSissorScore = document.getElementById('rockPaperSissorScore');
const gameBoard = document.querySelector('.game-board');

let yourSelectedWeapon;
let botWeaponIndex = 0;
let yourScoreRPS = 0;
let botScoreRPS = 0;


const toggles = (elem, htmlclass) => elem.classList.toggle(htmlclass);

const newRockPapperSissorGame = () => {
    const rockPapperSissorContainer = document.querySelector(".rockPapperSissor");
    toggles(rockPapperSissorContainer, 'display-none');
    //rockPapperSissorContainer.classList.remove('display-none');
    options.forEach(option => {
        option.addEventListener("click", startGameRPS)
    });
}


function startGameRPS(event) {
    options.forEach(option => {
        option.removeEventListener("click", startGameRPS)
    });
    console.log(options[0].src)
    yourWeapon.src = options[0].src;
    botWeapon.src = options[0].src;
    botWeaponIndex = Math.floor(Math.random() * 3);
    yourSelectedWeapon = this;
    toggles(yourSelectedWeapon, 'selected-weapon');
    //yourSelectedWeapon.classList.add('selected-weapon');
    //toggles(gameBoard, 'display-none');
    gameBoard.classList.remove('display-none');
    //toggles(yourWeapon, 'your-animation');
    yourWeapon.classList.add('your-animation');
    //toggles(botWeapon, 'bot-animation');
    botWeapon.classList.add('bot-animation');

    setTimeout(() => showWeapon(event), 2100);
    showGameMessage();
}

function showGameMessage() {
    setTimeout(() => gameMessageRPS.textContent = 'rock', 333);
    setTimeout(() => gameMessageRPS.textContent = 'paper', 999);
    setTimeout(() => gameMessageRPS.textContent = 'sissor', 1666);
}

function showWeapon(event) {
    toggles(yourSelectedWeapon, 'selected-weapon');
    //yourSelectedWeapon.classList.remove('selected-weapon');
    console.log(event.target)
    yourWeapon.src = event.target.src;
    botWeapon.src = options[botWeaponIndex].src;
    whoWins(event.target);
}

function whoWins(event) {
    const user = event.previousElementSibling.textContent;
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
    updateScore();
}

function updateScore() {
    rockPaperSissorScore.textContent = `You - Bot: ${yourScoreRPS} - ${botScoreRPS}`;
    if (yourScoreRPS === 5) gameOverRPS('Victory!<br>You reached 5 wins first!');
    if (botScoreRPS === 5) gameOverRPS('Game Ovar!<br>The bot got 5 wins before you did!');
    yourWeapon.classList.remove('your-animation');
    botWeapon.classList.remove('bot-animation');
    options.forEach(option => {
        option.addEventListener("click", startGameRPS)
    });
}

function gameOverRPS(message) {
    toggles(endOfGameRPS, 'display-none');
    //endOfGameRPS.classList.remove('display-none');
    endOfGameRPS.firstElementChild.innerHTML = message;
    const PlayAgainBtnRPS = document.getElementById('play-again-btr-RPS');
    PlayAgainBtnRPS.addEventListener('click', resetRPS);
}

function resetRPS() {
    console.log('reserRPS')
    toggles(endOfGameRPS, 'display-none');
    //endOfGameRPS.classList.add('display-none');
    yourScoreRPS = 0;
    botScoreRPS = 0;
    rockPaperSissorScore.textContent = '';
    gameMessageRPS.textContent = '';
    toggles(gameBoard, 'display-none');
    // gameBoard.classList.add('display-none');
}



// event.stopPropagation(); // gör att det inte 'bubblar' upp till parent-element