import { Ship, Gameboard, Player } from "../index.js";
import displayAxes from "./displayAxes.js";
export default (function computer() {
  const computer = Player("Computer");

  const computerBoardCont = document.querySelector(".computerBoardCont");
  const player2BoardCont = document.querySelector(".player2BoardCont");

  const startTheBoard = () => {
    player2BoardCont.style.display = "none";
    const computerBoard = document.createElement("div");
    const computerBoardHeader = document.createElement("h2");
    computerBoard.classList.add("computerBoard");
    computerBoardHeader.classList.add("computerBoardHeader");
    computerBoardHeader.textContent = "Computer Board";
    const fragment = document.createDocumentFragment();

    for (let i = 1; i < 11; i++) {
      const coulmn = document.createElement("div");
      coulmn.classList.add(`${i}`, "coulmnComp");

      fragment.append(coulmn);
    }
    computerBoard.append(fragment);
    computerBoardCont.append(computerBoard, computerBoardHeader);

    const coulmns = document.querySelectorAll(".coulmnComp");
    const rowletters = "abcdefghij";
    const rowsArr = rowletters.split("");

    coulmns.forEach((col, index) => {
      for (let i = 1; i < 11; i++) {
        const cell = document.createElement("div");
        cell.classList.add(`${rowsArr[index]}${i}`, "cell", "computer");
        col.append(cell);
      }
    });

    displayAxes.displayRowsNames();
    displayAxes.displayColmunsNames();
  };

  const resetBoard = () => {
    computerBoardCont.replaceChildren();
  };
  const computerAttackDom = (cell, callBack) => {
    const board = document.querySelectorAll(`.cell.player1`);
    const randomCord = board[Math.floor(Math.random() * 100)];
    const gameStatus = document.querySelector(".gameStatus");
    gameStatus.textContent = "Your turn";
    const attack = () => {
      if (!randomCord.classList.contains("attacked")) {
        if (randomCord.classList.contains("occupied")) {
          const hit = document.createElement("span");
          hit.classList.add(`hit`);
          hit.textContent = "X";
          randomCord.append(hit);
        }
        randomCord.classList.add("attacked");
        randomCord.disabled = true;
        randomCord.classList.add("disabled");

        callBack();
      } else {
        computerAttackDom(cell, callBack);
      }
    };
    setTimeout(attack, 500);
  };

  const shipsStatusDom = () => {
    const shipscords = computer.gameboard.shipsCords;
    let shipsHits = 0;
    shipscords.forEach((cord) => {
      const boardCord = document.querySelector(
        `.${cord[0]}${cord[1]}.computer`
      );
      if (boardCord.classList.contains("attacked")) {
        shipsHits += 1;
      }
    });
    console.log(shipsHits);
    if (shipsHits >= 20) {
      return "Player1 Wins";
    }
  };

  return {
    computer,
    startTheBoard,
    resetBoard,
    computerAttackDom,
    shipsStatusDom,
  };
})();
