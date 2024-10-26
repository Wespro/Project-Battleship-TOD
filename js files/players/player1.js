import { Ship, Gameboard, Player } from "../index.js";
import displayAxes from "./displayAxes.js";
export default (function player1() {
  const player1 = Player("Player");

  const yourBoardCont = document.querySelector(".yourBoardCont");

  const startTheBoard = () => {
    const youBoard = document.createElement("div");
    const youBoardHeader = document.createElement("h2");
    youBoard.classList.add("youBoard");
    youBoardHeader.classList.add("youBoardHeader");
    youBoardHeader.textContent = "Your Board";
    const fragment = document.createDocumentFragment();

    for (let i = 1; i < 11; i++) {
      const coulmn = document.createElement("div");
      coulmn.classList.add(`${i}`, "coulmn");

      fragment.append(coulmn);
    }
    youBoard.append(fragment);
    yourBoardCont.append(youBoard, youBoardHeader);

    const coulmns = document.querySelectorAll(".coulmn");
    const rowletters = "abcdefghij";
    const rowsArr = rowletters.split("");

    coulmns.forEach((col, index) => {
      for (let i = 1; i < 11; i++) {
        const cell = document.createElement("div");
        cell.classList.add(`${rowsArr[index]}${i}`, "cell", "player1");
        col.append(cell);
      }
    });

    displayAxes.displayRowsNames();
    displayAxes.displayColmunsNames();
  };

  const resetBoard = () => {
    yourBoardCont.replaceChildren();
  };
  const player1AttackDom = (cell) => {
    if (!cell.classList.contains("attacked")) {
      if (cell.classList.contains("occupied")) {
        const hit = document.createElement("span");
        hit.classList.add(`hit`);
        hit.textContent = "X";
        hit.style.color = "red";
        cell.append(hit);
      }
      cell.classList.add("attacked");
      cell.disabled = true;
      cell.classList.add("disabled");
    }
  };
  const shipsStatusDom = () => {
    const shipscords = player1.gameboard.shipsCords;
    let shipsHits = 0;

    shipscords.forEach((cord) => {
      const boardCord = document.querySelector(`.${cord[0]}${cord[1]}.player1`);

      if (boardCord.classList.contains("attacked")) {
        shipsHits += 1;
      }
    });
    if (shipsHits === 20) {
      return "Computer Wins";
    }
  };

  return {
    player1,
    startTheBoard,
    resetBoard,
    player1AttackDom,
    shipsStatusDom,
  };
})();
