import { Ship, Gameboard, Player } from "../index.js";

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

    computer.gameboard.board.forEach((cord) => {
      const cell = document.createElement("div");
      cell.classList.add(`${cord.cord[0]}${cord.cord[1]}`, "cell");

      fragment.append(cell);
    });
    computerBoard.append(fragment);
    computerBoardCont.append(computerBoardHeader, computerBoard);

    play.style.display = "none";
    shuffle.style.display = "inline";
    reset.style.display = "inline";
    footer.style.alignItems = "start";
  };
  const resetBoard = () => {
    computerBoardCont.replaceChildren();
  };

  return {
    startTheBoard,
    resetBoard,
  };
})();
