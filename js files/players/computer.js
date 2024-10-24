import { Ship, Gameboard, Player } from "../index.js";
import displayAxes from "./displayAxes.js";
export default (function computer() {
  const computer = Player("Computer");

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

    displayAxes.displayRowsNames();
    displayAxes.displayColmunsNames();
  };

  const resetBoard = () => {
    computerBoardCont.replaceChildren();
  };

  return {
    computer,
    startTheBoard,
    resetBoard,
  };
})();
