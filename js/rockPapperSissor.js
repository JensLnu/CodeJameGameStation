const gameArray = ['rock', 'paper', 'sissor'];

const newrockPapperSissorGame = () => {
    const rockPapperSissorContainer = document.querySelector(".rockPapperSissor");
    rockPapperSissorContainer.style.display = 'inline-block';
    console.log(gameArray);
    console.log(gameArray.toString());
    console.log(gameArray.join(', '));
}