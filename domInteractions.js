import { Ship, Gameboard, Player } from "./index.js";

export default (function () {
  const play = document.querySelector(".play");
  const shuffle = document.querySelector(".shuffle");
  const reset = document.querySelector(".reset");

  play.addEventListener("click", () => {
    const computer = Player("Computer");
    const player = Player("Player");

    const yourBoardCont = document.querySelector(".yourBoardCont");
    const youBoard = document.createElement("div");
    const youBoardHeader = document.createElement("h2");
    youBoard.classList.add("youBoard");
    youBoardHeader.classList.add("youBoardHeader");
    youBoardHeader.textContent = "Your Board";
    const fragment = document.createDocumentFragment();

    player.gameboard.board.forEach((cord) => {
      const cell = document.createElement("div");
      cell.classList.add(`${cord.cord[0]}${cord.cord[1]}`, "cell");

      youBoard.append(cell);
      fragment.append(youBoard);
      yourBoardCont.append(youBoardHeader, fragment);
    });

    const computerBoardCont = document.querySelector(".computerBoardCont");

    const computerBoard = document.createElement("div");
    const computerBoardHeader = document.createElement("h2");
    computerBoard.classList.add("computerBoard");
    computerBoardHeader.classList.add("computerBoardHeader");
    computerBoardHeader.textContent = "Computer Board";
    const fragment2 = document.createDocumentFragment();

    computer.gameboard.board.forEach((cord) => {
      const cell = document.createElement("div");
      cell.classList.add(`${cord.cord[0]}${cord.cord[1]}`, "cell");

      computerBoard.append(cell);
      fragment2.append(computerBoard);
      computerBoardCont.append(computerBoardHeader, fragment2);
    });
    play.style.display = "none";
    shuffle.style.display = "inline";
    reset.style.display = "inline";
  });

  reset.addEventListener("click", () => {
    const computer = Player("Computer");
    const player = Player("Player");

    const yourBoardCont = document.querySelector(".yourBoardCont");

    const youBoard = document.createElement("div");
    const youBoardHeader = document.createElement("h2");
    youBoard.classList.add("youBoard");
    youBoardHeader.classList.add("youBoardHeader");
    youBoardHeader.textContent = "Your Board";
    const fragment = document.createDocumentFragment();

    const computerBoardCont = document.querySelector(".computerBoardCont");

    const computerBoard = document.createElement("div");
    const computerBoardHeader = document.createElement("h2");
    computerBoard.classList.add("computerBoard");
    computerBoardHeader.classList.add("computerBoardHeader");
    computerBoardHeader.textContent = "Computer Board";
    const fragment2 = document.createDocumentFragment();

    //reset dom elements
    yourBoardCont.replaceChildren();
    computerBoardCont.replaceChildren();
    // append
    player.gameboard.board.forEach((cord) => {
      const cell = document.createElement("div");
      cell.classList.add(`${cord.cord[0]}${cord.cord[1]}`, "cell");

      youBoard.append(cell);
      fragment.append(youBoard);
      yourBoardCont.append(youBoardHeader, fragment);
    });

    computer.gameboard.board.forEach((cord) => {
      const cell = document.createElement("div");
      cell.classList.add(`${cord.cord[0]}${cord.cord[1]}`, "cell");

      computerBoard.append(cell);
      fragment2.append(computerBoard);
      computerBoardCont.append(computerBoardHeader, fragment2);
    });
    play.style.display = "none";
  });

  return {};
})();
