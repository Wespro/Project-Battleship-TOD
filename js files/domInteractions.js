import player1 from "./players/player1.js";
import computer from "./players/computer.js";
import shuffleBoards from "./players/shuffleBoards.js";

export default (function () {
  const play = document.querySelector(".play");
  const start = document.querySelector(".start");
  const shuffle = document.querySelector(".shuffle");
  const reset = document.querySelector(".reset");
  const footer = document.querySelector("footer");

  const yourBoardCont = document.querySelector(".yourBoardCont");
  const computerBoardCont = document.querySelector(".computerBoardCont");

  play.addEventListener("click", () => {
    player1.startTheBoard();
    computer.startTheBoard();
    shuffleBoards.shuffleShipstToBoardDomPlayer1(
      player1.player1,
      "player1",
      yourBoardCont
    );

    shuffleBoards.shuffleShipstToBoardDomComputer(
      computer.computer,
      "computer",
      computerBoardCont
    );

    play.style.display = "none";
    start.style.display = "inline";
    shuffle.style.display = "inline";
    reset.style.display = "inline";
    footer.style.alignItems = "start";

    shuffle.classList.add("clicked");
  });
  shuffle.addEventListener("click", () => {
    if (shuffle.classList.contains("clicked")) {
      shuffleBoards.reShuffle(player1.player1, "player1", yourBoardCont);
      shuffleBoards.reShuffle(computer.computer, "computer", computerBoardCont);
    } else {
      shuffleBoards.shuffleShipstToBoardDomPlayer1(
        player1.player1,
        "player1",
        yourBoardCont
      );

      shuffleBoards.shuffleShipstToBoardDomComputer(
        computer.computer,
        "computer",
        computerBoardCont
      );
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
