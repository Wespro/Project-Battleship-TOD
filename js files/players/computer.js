import { Ship, Gameboard, Player } from "../index.js";
import player1 from "./player1.js";

export default (function computer() {
  const play = document.querySelector(".play");
  const shuffle = document.querySelector(".shuffle");
  const reset = document.querySelector(".reset");

  const computer = Player("Computer");

  const footer = document.querySelector("footer");

  const computerBoardCont = document.querySelector(".computerBoardCont");

  const startTheBoard = () => {
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

    play.style.display = "none";
    shuffle.style.display = "inline";
    reset.style.display = "inline";
    footer.style.alignItems = "start";

    player1.displayRowsNames();
    player1.displayColmunsNames();
  };

  const resetBoard = () => {
    computerBoardCont.replaceChildren();
  };

  return {
    startTheBoard,
    resetBoard,
  };
})();
