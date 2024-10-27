import { Ship, Gameboard, Player } from "../index.js";
import displayAxes from "./displayAxes.js";
export default (function player1() {
  const player1 = Player("Player");

  const player1BoardCont = document.querySelector(".player1BoardCont");

  const startTheBoard = (gameType) => {
    const player1BoardDiv = document.createElement("div");
    const player1BoardDivHeader = document.createElement("h2");
    player1BoardDiv.classList.add("player1BoardDiv", gameType);
    player1BoardDivHeader.classList.add("player1BoardDivHeader");
    player1BoardDivHeader.textContent = "Player1 Board";
    const fragment = document.createDocumentFragment();

    for (let i = 1; i < 11; i++) {
      const coulmn = document.createElement("div");
      coulmn.classList.add(`${i}`, "coulmn");

      fragment.append(coulmn);
    }
    player1BoardDiv.append(fragment);
    player1BoardCont.append(player1BoardDiv, player1BoardDivHeader);

    const coulmns = document.querySelectorAll(".coulmn");
    const rowletters = "abcdefghij";
    const rowsArr = rowletters.split("");

    coulmns.forEach((col, index) => {
      for (let i = 1; i < 11; i++) {
        const cell = document.createElement("div");
        gameType === "playVsComputer"
          ? cell.classList.add(
              `${rowsArr[index]}${i}`,
              "cell",
              "player1",
              "playVsComputer"
            )
          : cell.classList.add(
              `${rowsArr[index]}${i}`,
              "cell",
              "player1",
              `${gameType}`
            );
        col.append(cell);
      }
    });

    displayAxes.displayRowsNames();
    displayAxes.displayColmunsNames();
  };

  const resetBoard = () => {
    player1BoardCont.replaceChildren();
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
  const shipsStatusDom = (playerName) => {
    const shipscords = player1.gameboard.shipsCords;
    let shipsHits = 0;

    shipscords.forEach((cord) => {
      const boardCord = document.querySelector(`.${cord[0]}${cord[1]}.player1`);

      if (boardCord.classList.contains("attacked")) {
        shipsHits += 1;
      }
    });
    if (shipsHits >= 20) {
      if (playerName === "computer") {
        console.log("here");
        return "Computer Wins";
      } else if (playerName === "player2") {
        return "Player2 Wins";
      }
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
