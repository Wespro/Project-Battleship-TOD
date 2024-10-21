import player1 from "./players/player1.js";
import computer from "./players/computer.js";

export default (function () {
  const play = document.querySelector(".play");
  const shuffle = document.querySelector(".shuffle");
  const reset = document.querySelector(".reset");

  play.addEventListener("click", () => {
    player1.startTheBoard();
    computer.startTheBoard();
  });

  reset.addEventListener("click", () => {
    player1.resetBoard();
    computer.resetBoard();

    player1.startTheBoard();
    computer.startTheBoard();
  });

  return {};
})();
