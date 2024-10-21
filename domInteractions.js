import { Ship, Gameboard, Player } from "./index.js";

export default (function () {
  const computer = Player("Computer");
  const player = Player("Player");

  const youBoard = document.querySelector(".youBoard");
  const computerBoard = document.querySelector(".computerBoard");
  const fragment = document.createDocumentFragment();
  const fragment2 = document.createDocumentFragment();

  player.gameboard.board.forEach((cord) => {
    const cell = document.createElement("div");
    cell.classList.add(`${cord.cord[0]}${cord.cord[1]}`, "cell");
    fragment.append(cell);
    youBoard.append(fragment);
  });

  computer.gameboard.board.forEach((cord) => {
    const cell = document.createElement("div");
    cell.classList.add(`${cord.cord[0]}${cord.cord[1]}`, "cell");
    fragment2.append(cell);
    computerBoard.append(fragment2);
  });

  return {};
})();
