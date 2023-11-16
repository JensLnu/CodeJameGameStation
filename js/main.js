const guessTheNumber = document.getElementById("guess-the-number");
const rockPapperSissor = document.getElementById("rock-papper-sissor");
const memory = document.getElementById("memory");
const thePigGame = document.getElementById("the-pig-game");
const minehunter = document.getElementById("minehunter");

const gameContainer = document.querySelector(".game-container");

guessTheNumber.addEventListener("click", () => {
    hidePreviousGame();
    newGuessNumberGame();
});

rockPapperSissor.addEventListener("click", () => {
    hidePreviousGame();
    newrockPapperSissorGame();
});

memory.addEventListener("click", () => {
    hidePreviousGame();
    newMemoryGame();
});

thePigGame.addEventListener("click", () => {
    hidePreviousGame();
    newPigGame();
});

minehunter.addEventListener("click", () => {
    hidePreviousGame();
    newMinehunterGame();
});

const hidePreviousGame = () => {
    const guessNumberGame = document.querySelector(".guessNumberGame");
    const rockPapperSissor = document.querySelector(".rockPapperSissor");
    const memory = document.querySelector(".memory");
    const pigGame = document.querySelector(".pigGame");
    const minehunter = document.querySelector(".minehunter");
    const allGames = [guessNumberGame, rockPapperSissor, memory, pigGame, minehunter];
    
    for (let i = 0; i < allGames.length; i++) {
        allGames[i].style.display = 'none';
    }
}