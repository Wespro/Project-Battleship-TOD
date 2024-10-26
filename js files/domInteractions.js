import player1 from "./players/player1.js";
import computer from "./players/computer.js";
import shuffleBoards from "./players/shuffleBoards.js";

export default (function () {
  const play1v1 = document.querySelector(".play1v1");
  const playVsComputer = document.querySelector(".playVsComputer");
  const start = document.querySelector(".start");
  const shuffle = document.querySelector(".shuffle");
  const reset = document.querySelector(".reset");
  const footer = document.querySelector("footer");
  const gameStatus = document.querySelector(".gameStatus");

  const yourBoardCont = document.querySelector(".yourBoardCont");
  const computerBoardCont = document.querySelector(".computerBoardCont");

  playVsComputer.addEventListener("click", () => {
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

    playVsComputer.style.display = "none";
    play1v1.style.display = "none";g
    start.style.display = "inline";
    shuffle.style.display = "inline";
    reset.style.display = "inline";
    reset.disabled = true;
    reset.classList.add("disabled");

    footer.style.alignItems = "start";

    gameStatus.style.visibility = "visible";

    shuffle.classList.add("clicked");

    computerBoardHold();
  });
  start.addEventListener("click", () => {
    reset.disabled = false;
    reset.classList.remove("disabled");
    shuffle.disabled = true;
    shuffle.classList.add("disabled");

    gameStatus.textContent = "Your turn";
    computerBoardEventlisterns();
  });
  shuffle.addEventListener("click", () => {
    if (shuffle.classList.contains("clicked")) {
      shuffleBoards.reShuffle(player1.player1, "player1", yourBoardCont);
      shuffleBoards.reShuffle(computer.computer, "computer", computerBoardCont);
      computerBoardHold();
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
    shuffleBoards.reShuffle(player1.player1, "player1", yourBoardCont);
    shuffleBoards.reShuffle(computer.computer, "computer", computerBoardCont);

    shuffle.disabled = false;
    shuffle.classList.remove("disabled");

    reset.disabled = true;
    reset.classList.add("disabled");
    computerBoardHold();
  });

  const computerBoardEventlisterns = () => {
    const computerBoard = document.querySelectorAll(".cell.computer");
    computerBoard.forEach((cell) => {
      cell.addEventListener(
        "click",
        () => {
          gameStatus.textContent = "Computer's turn";
          player1.player1AttackDom(cell);
          computerBoardHold();

          computer.computerAttackDom(cell, computerBoardUnHold);
          GamesStatusFn();
        },
        { once: true }
      );
    });
    computerBoardUnHold();
  };

  const computerBoardHold = () => {
    computerBoardCont.disabled = true;
    computerBoardCont.style.pointerEvents = "none";
    computerBoardCont.classList.add("disabledDarker");
  };
  const computerBoardUnHold = () => {
    computerBoardCont.style.pointerEvents = "auto";
    computerBoardCont.disabled = false;
    computerBoardCont.classList.remove("disabledDarker");
  };
  const GamesStatusFn = () => {
    const computerWins = player1.shipsStatusDom();
    const player1Wins = computer.shipsStatusDom();
    if (computerWins && !player1Wins) {
      gameStatus.textContent = "";
      gameStatus.textContent = `${computerWins}`;
    } else if (!computerWins && player1Wins) {
      gameStatus.textContent = "";
      gameStatus.textContent = `${player1Wins}`;
    } else if (computerWins && player1Wins) {
      gameStatus.textContent = "";
      gameStatus.textContent = `Draw`;
    }
  };
})();
