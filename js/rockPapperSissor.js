const gameArray = ['rock', 'paper', 'sissor'];
const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const sissor = document.getElementById('sissor');
const options = [rock, paper, sissor];

let computersWepon = 0;

const newrockPapperSissorGame = () => {
    const rockPapperSissorContainer = document.querySelector(".rockPapperSissor");
    rockPapperSissorContainer.classList.remove('displayContainer');
    options.forEach(option => {
        option.addEventListener("click", userchoies)
    });
}

function userchoies() {
    computersChoies();
}

function computersChoies() {
    computersWepon = Math.floor(Math.random() * 2);
    console.log(computersWepon);
}



// event.stopPropagation(); // gör att det inte 'bubblar' upp till parent-element