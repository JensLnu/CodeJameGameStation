const allGameFunctions = [];
const allGames = document.querySelectorAll('.header-li');

document.addEventListener("DOMContentLoaded", addFunctionality);

// enables buttons
function addFunctionality() {
    allGames.forEach(game => {
        allGameFunctions.push(game.id);
        game.addEventListener('click', choseGame);
    });
}

// displays the game user clicks on
function choseGame(event) {
    hidePreviousGame();
    for (let i = 0; i < allGames.length; i++) {
        if (allGames[i].id === event.target.id) {
            const runFunction = eval(allGameFunctions[i]);
            runFunction();
        }
    }
}

// makes only one game visible at the time
function hidePreviousGame() {
    const allGameContainers = document.querySelectorAll('.game-to-play');
    allGameContainers.forEach(game => {
        game.classList.add('display-none');
    });
}