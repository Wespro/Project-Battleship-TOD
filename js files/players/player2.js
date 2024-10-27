import { Player } from "../index.js";
import displayAxes from "../Game Related/displayAxes.js";
export default (function player2() {
  const player2 = Player("Player2");

  const player2BoardCont = document.querySelector(".player2BoardCont");
  const computerBoardCont = document.querySelector(".computerBoardCont");
  const startTheBoard = () => {
    computerBoardCont.style.display = "none";
    const player2Board = document.createElement("div");
    const player2BoardHeader = document.createElement("h2");
    player2Board.classList.add("player2Board");
    player2BoardHeader.classList.add("player2BoardHeader");
    player2BoardHeader.textContent = "Player2 Board";
    const fragment = document.createDocumentFragment();

    for (let i = 1; i < 11; i++) {
      const coulmn = document.createElement("div");
      coulmn.classList.add(`${i}`, "coulmnComp");

      fragment.append(coulmn);
    }
    player2Board.append(fragment);
    player2BoardCont.append(player2Board, player2BoardHeader);

    const coulmns = document.querySelectorAll(".coulmnComp");
    const rowletters = "abcdefghij";
    const rowsArr = rowletters.split("");

    coulmns.forEach((col, index) => {
      for (let i = 1; i < 11; i++) {
        const cell = document.createElement("div");
        cell.classList.add(`${rowsArr[index]}${i}`, "cell", "player2");
        col.append(cell);
      }
    });

    displayAxes.displayRowsNames();
    displayAxes.displayColmunsNames();
  };

  const resetBoard = () => {
    player2BoardCont.replaceChildren();
  };
  const player2AttackDom = (cell) => {
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
    const shipscords = player2.gameboard.shipsCords;
    let shipsHits = 20;
    shipscords.forEach((cord) => {
      const boardCord = document.querySelector(`.${cord[0]}${cord[1]}.player2`);

      if (boardCord.classList.contains("attacked")) {
        shipsHits += 1;
      }
    });
    if (shipsHits >= 20) {
      return "Player1 Wins";
    }
  };

  return {
    player2,
    startTheBoard,
    resetBoard,
    player2AttackDom,
    shipsStatusDom,
  };
})();
