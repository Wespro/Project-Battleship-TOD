import { Ship, Gameboard, Player } from "../index.js";
export default (function player1() {
  const play = document.querySelector(".play");
  const shuffle = document.querySelector(".shuffle");
  const reset = document.querySelector(".reset");

  const player = Player("Player");

  const footer = document.querySelector("footer");
  const yourBoardCont = document.querySelector(".yourBoardCont");

  const startTheBoard = () => {
    const youBoard = document.createElement("div");
    const youBoardHeader = document.createElement("h2");
    youBoard.classList.add("youBoard");
    youBoardHeader.classList.add("youBoardHeader");
    youBoardHeader.textContent = "Your Board";
    const fragment = document.createDocumentFragment();

    player.gameboard.board.forEach((cord) => {
      const cell = document.createElement("div");
      cell.classList.add(`${cord.cord[0]}${cord.cord[1]}`, "cell");

      fragment.append(cell);
    });
    youBoard.append(fragment);
    yourBoardCont.append(youBoardHeader, youBoard);

    play.style.display = "none";
    shuffle.style.display = "inline";
    reset.style.display = "inline";
    footer.style.alignItems = "start";
  };

  const resetBoard = () => {
    yourBoardCont.replaceChildren();
  };

  return {
    startTheBoard,
    resetBoard,
  };
})();
