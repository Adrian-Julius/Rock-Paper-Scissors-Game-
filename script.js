/* ---------- Rock Paper Scissor Game ---------- */
const rockPaperScissorContainer = document.getElementById(
  "rockPaperScissorContainer"
);
const opponentContainer = document.getElementById("opponentContainer");
const instruction = document.getElementById("instruction");
const resultDisplay = document.getElementById("result");
const playerPickImage = document.getElementById("playerPickImage");
const computerOrPlayerPickImage = document.getElementById("compPlayerPickImg");

// -----------------------------------------------------
// variables for playerVsPlayer function()
let playersPicked = [];
let playerScore = 0;
let player2Score = 0;

// variables for playerVsComputer function()
const choices = ["rock", "paper", "scissor"];
let computerScore = 0;

/*----- VS PLAYER function() -----*/
function playerVsPlayer(playerPick) {
  // getting the players' picked and storing as array
  if (playersPicked.length < 2) {
    playersPicked.push(playerPick);
  }

  switch (playersPicked.length) {
    // if player 1 already picked
    case 1:
      resultDisplay.style.color = `brown`;
      resultDisplay.textContent = `Please pick, Player Two.`;
      break;

    // if both players picked
    case 2:
      // if both players have picked their choices -------------------------------------------------------------------------
      let result = "";

      // if player and computer picked the same ----------------------------------------------
      if (playersPicked[0] === playersPicked[1]) {
        resultDisplay.style.color = `black`;
        result = "It is a tie!";
      } else {
        switch (playersPicked[0]) {
          case "rock":
            if (playersPicked[1] === "scissor") {
              result = "Player 1 Won!";
            } else {
              result = "Player 2 Won!";
            }
            break;

          case "paper":
            if (playersPicked[1] === "rock") {
              result = "Player 1 Won!";
            } else {
              result = "Player 2 Won!";
            }
            break;

          case "scissor":
            if (playersPicked[1] === "paper") {
              result = "Player 1 Won!";
            } else {
              result = "Player 2 Won!";
            }
            break;
          default:
        }

        // Result counting and color styling -----------------------------------------
        switch (result) {
          case "Player 1 Won!":
            resultDisplay.style.color = `green`;
            playerScore++;
            break;

          case "Player 2 Won!":
            resultDisplay.style.color = `blue`;
            player2Score++;
            break;
          default:
        }
      }

      // Displaying the result  ------------------------------------------------------
      resultDisplay.textContent = result;

      // Displaying the Player One and Two scores & picked images --------------------
      playerPickImage.innerHTML = `<h2 id="player">Player One: ${playerScore}</h2>
                               <img src="./assets/${playersPicked[0]}.png" />`;

      computerOrPlayerPickImage.innerHTML = `<h2 id="player2">Player Two: ${player2Score}</h2>
                                         <img src="./assets/${playersPicked[1]}.png" />`;

      // Console result --------------------------------------------------------------
      console.log(`Player One picked: ${playersPicked[0]}`);
      console.log(`Player Two picked: ${playersPicked[1]}`);
      console.log(result);

      // resetting the players's picked
      playersPicked = [];
      break;
  }
}

/*----- VS COMPUTER function() -----*/
function playerVsComputer(playerPick) {
  let computerChoice = Math.floor(Math.random() * 3);
  let computerPick = choices[computerChoice];
  let result = "";

  // if player and user picked the same ----------------------------------------------
  if (playerPick === computerPick) {
    resultDisplay.style.color = `black`;
    result = "It is a tie!";
  } else {
    switch (playerPick) {
      case "rock":
        if (computerPick === "scissor") {
          result = "You Won!";
        } else {
          result = "You Lost!";
        }
        break;

      case "paper":
        if (computerPick === "rock") {
          result = "You Won!";
        } else {
          result = "You Lost!";
        }
        break;

      case "scissor":
        if (computerPick === "paper") {
          result = "You Won!";
        } else {
          result = "You Lost!";
        }
        break;
      default:
    }

    // Result counting and color styling -----------------------------------------
    switch (result) {
      case "You Won!":
        playerScore++;
        resultDisplay.style.color = `green`;

        break;

      case "You Lost!":
        computerScore++;
        resultDisplay.style.color = `red`;

        break;
      default:
    }
  }

  // Displaying the result  ------------------------------------------------------
  resultDisplay.textContent = result;

  // Displaying the Player and Computer scores & picked images -------------------
  playerPickImage.innerHTML = `<h2 id="player">Player: ${playerScore}</h2>
                               <img src="./assets/${playerPick}.png" />`;

  computerOrPlayerPickImage.innerHTML = `<h2 id="computer">Computer: ${computerScore}</h2>
                                         <img src="./assets/${computerPick}.png" />`;

  // Console result --------------------------------------------------------------
  console.log(`Player picked: ${playerPick}`);
  console.log(`Computer picked: ${computerPick}`);
  console.log(result);
}

let opponent;
let pleasePick;
/*----- VS computer and VS player buttons function() -----*/
function vsOpponent(opponentPicked) {
  //hide the VS computer and VS player container and buttons
  rockPaperScissorContainer.style.display = `block`;
  opponentContainer.style.display = `none`;
  resultDisplay.style.visibility = `visible`;

  opponent = opponentPicked;

  // Players title initialization
  let titleOne;
  let titleTwo;

  if (opponent == `player`) {
    playerScore = 0;
    instruction.textContent = `"Player One always picks first, followed by Player Two. After the result is displayed, 
                                Player One can pick again, then Player Two. This continues 
                                as long as both players wish to play."`;

    pleasePick = `Please pick, Player One.`;

    titleOne = `<h2 id="player">Player One: 0</h2>`;
    titleTwo = `<h2 id="player2">Player Two: 0</h2>`;
  } else {
    playerScore = 0;
    instruction.textContent = `"The player should make their choice, as the computer has already made its selection. 
                                After the result is displayed, the player can choose again. This process repeats 
                                for as long as the player wishes to continue playing."`;

    pleasePick = `Please pick, Player.`;

    titleOne = `<h2 id="player">Player: 0</h2>`;
    titleTwo = `<h2 id="computer">Computer: 0</h2>`;
  }
  resultDisplay.textContent = pleasePick;
  playerPickImage.innerHTML = titleOne;
  computerOrPlayerPickImage.innerHTML = titleTwo;
}

/*----- Rock, Paper, and Scissor buttons function() -----*/
function picked(pick) {
  if (opponent == `player`) {
    playerVsPlayer(pick);
  } else {
    playerVsComputer(pick);
  }
}

/*----- Exit buttons function() -----*/
function exit() {
  rockPaperScissorContainer.style.display = `none`;
  opponentContainer.style.display = `block`;
}

/*----- Reset button function() -----*/
function reset() {
  playerScore = 0;
  player2Score = 0;
  computerScore = 0;

  //Resetting the results
  resultDisplay.textContent = pleasePick;
  playerPickImage.innerHTML = ``;
  computerOrPlayerPickImage.innerHTML = ``;

  console.log(computerScore);
}
