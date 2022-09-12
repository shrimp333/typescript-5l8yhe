// Import stylesheets
import './style.css';
import { Player } from './models/Player';
import { Colour } from './models/Colour.enum';

let Players: Player[] = [];
let playerRolls: Number[] = [];

//event listeners
document.getElementById('rollDice').addEventListener('click', rollDice);
document
  .getElementById('changeColour-btn')
  .addEventListener('click', changeColour);

init();

function init() {
  //players
  let playerSelector: HTMLSelectElement = <HTMLSelectElement>(
    document.getElementById('playerSelector')
  );

  let player1: Player = new Player('Player 1', 0, Colour.Blue);
  let player2: Player = new Player('Player 2', 0, Colour.Red);
  Players.push(player1);
  Players.push(player2);

  let option1: string = `<option value="0">${player1.name}</option>`;
  let option2: string = `<option value="1">${player2.name}</option>`;
  playerSelector.innerHTML += option1;
  playerSelector.innerHTML += option2;

  //colours
  let colourSelector: HTMLSelectElement = <HTMLSelectElement>(
    document.getElementById('colourSelector')
  );

  for (let item in Colour) {
    let colourOption1: string = `<option>${item}</option>`;
    colourSelector.innerHTML += colourOption1.toString();
  }

  updateDisplay();
}

function changeColour() {
  let selection: HTMLSelectElement = <HTMLSelectElement>(
    document.getElementById('playerSelector')
  );
  let colourSelection: HTMLSelectElement = <HTMLSelectElement>(
    document.getElementById('colourSelector')
  );

  Players[selection.value].colour = Colour[colourSelection.value];

  updateDisplay();
}

function drawPlayers() {
  let playerDiv: HTMLDivElement = <HTMLDivElement>(
    document.getElementById('playerDiv')
  );
  playerDiv.innerHTML = '';
  for (let index in Players) {
    let newPlayer: HTMLDivElement = <HTMLDivElement>(
      document.createElement('div')
    );
    newPlayer.className = 'player';
    newPlayer.innerHTML = Players[index].score.toString();
    newPlayer.style.backgroundColor = Players[index].colour;
    playerDiv.appendChild(newPlayer);
  }
}

function diceFunction(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
  /*   return Math.random() * (max - min) + min; */
}

function rollDice() {
  //make it roll a 6 sided die, show the result in the created dice, and add the score to the player
  let selection: HTMLSelectElement = <HTMLSelectElement>(
    document.getElementById('playerSelector')
  );
  let outcome = diceFunction(1, 6);
  playerRolls.push(outcome);
  Players[selection.value].score += outcome;

  if (Players[selection.value] === '0') {
    Players[selection.value] = '1';
  } else if (Players[selection.value] === '1') {
    Players[selection.value] = '0';
  }

  updateStats();
  updateDisplay();
}

function updateStats() {
  let selection: HTMLSelectElement = <HTMLSelectElement>(
    document.getElementById('playerSelector')
  );

  //Current player
  let currentPlayer: HTMLSelectElement = <HTMLSelectElement>(
    document.getElementById('currentPlayer')
  );
  currentPlayer.innerHTML = 'Current player: ' + Players[selection.value].name;
  //Player 1 total

  let player1Total: HTMLSelectElement = <HTMLSelectElement>(
    document.getElementById('player1Total')
  );

  player1Total.innerHTML = 'Player 1 total score: ' + Players[0].score;
  //Player 2 total
  let player2Total: HTMLSelectElement = <HTMLSelectElement>(
    document.getElementById('player2Total')
  );

  player2Total.innerHTML = 'Player 2 total score: ' + Players[1].score;
  //List of rolls
  let rollList: HTMLDivElement = <HTMLDivElement>(
    document.getElementById('rollList')
  );

  rollList.innerHTML = 'List of rolls: ';
  for (let i = 0; i < playerRolls.length; i++) {
    rollList.innerHTML += playerRolls[i].toString() + ' | ';
  }

  winGame();
}

function winGame() {
  let winner: HTMLSelectElement = <HTMLSelectElement>(
    document.getElementById('winner')
  );

  if (Players[0].score >= 20) {
    winner.innerHTML = 'Winner: Player 1';
  } else if (Players[1].score >= 20) {
    winner.innerHTML = 'Winner: Player 2';
  }
}

function updateDisplay() {
  drawPlayers();
}
