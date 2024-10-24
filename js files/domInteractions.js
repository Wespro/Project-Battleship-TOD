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
  shuffle.addEventListener("click", () => {
    if (shuffle.classList.contains("clicked")) {
      player1.reShuffle();
    } else {
      player1.shuffleShipstToBoardDom();
      shuffle.classList.add("clicked");
    }
  });
  reset.addEventListener("click", () => {
    player1.resetBoard();
    computer.resetBoard();

    player1.startTheBoard();
    computer.startTheBoard();
  });

  return {};
})();
