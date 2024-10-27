import player1 from "../players/player1.js";
import player2 from "../players/player2.js";
import computer from "../players/computer.js";
import shuffleBoards from "./shuffleBoards.js";

export default (function () {
  const play1v1Btn = document.querySelector(".play1v1Btn");
  const playVsComputerBtn = document.querySelector(".playVsComputerBtn");
  const start = document.querySelector(".start");
  const shuffle = document.querySelector(".shuffle");
  const reset = document.querySelector(".reset");
  const back = document.querySelector(".back");
  const gameStatus = document.querySelector(".gameStatus");

  const player1BoardCont = document.querySelector(".player1BoardCont");
  const computerBoardCont = document.querySelector(".computerBoardCont");
  const player2BoardCont = document.querySelector(".player2BoardCont");

  playVsComputerBtn.addEventListener("click", () => {
    player1.startTheBoard("playVsComputer");
    computer.startTheBoard();
    shuffleBoards.shuffleShipstToBoardDomPlayer1(
      player1.player1,
      "player1",
      player1BoardCont
    );

    shuffleBoards.shuffleShipstToBoardDomComputer(
      computer.computer,
      "computer",
      computerBoardCont
    );

    playVsComputerBtn.style.display = "none";
    play1v1Btn.style.display = "none";
    start.style.display = "inline";
    shuffle.style.display = "inline";
    reset.style.display = "inline";
    back.style.display = "inline";
    reset.disabled = true;
    reset.classList.add("disabled");

    gameStatus.style.visibility = "visible";

    shuffle.classList.add("clicked");

    computerBoardHold();
  });

  play1v1Btn.addEventListener("click", () => {
    player1.startTheBoard("play1v1");
    player2.startTheBoard();

    shuffleBoards.shuffleShipstToBoardDomPlayer2(
      player1.player1,
      "player1",
      player1BoardCont
    );

    shuffleBoards.shuffleShipstToBoardDomComputer(
      player2.player2,
      "player2",
      player2BoardCont
    );

    playVsComputerBtn.style.display = "none";
    play1v1Btn.style.display = "none";
    start.style.display = "inline";
    shuffle.style.display = "inline";
    reset.style.display = "inline";
    back.style.display = "inline";
    reset.disabled = true;
    reset.classList.add("disabled");

    gameStatus.style.visibility = "visible";

    shuffle.classList.add("clicked");

    player1BoardHold();
    player2BoardHold();
  });

  start.addEventListener("click", () => {
    reset.disabled = false;
    reset.classList.remove("disabled");
    shuffle.disabled = true;
    shuffle.classList.add("disabled");

    gameStatus.textContent = "Player1's turn";
    if (player2BoardCont.style.display === "none") {
      computerBoardEventlisterns();
    } else if (player2BoardCont.style.display !== "none") {
      player2BoardEventlisterns();
      player1BoardEventlisterns();
      player2BoardUnHold();
    }
  });
  shuffle.addEventListener("click", () => {
    if (player2BoardCont.style.display === "none") {
      if (shuffle.classList.contains("clicked")) {
        shuffleBoards.reShuffle(player1.player1, "player1", player1BoardCont);
        shuffleBoards.reShuffle(
          computer.computer,
          "computer",
          computerBoardCont
        );
        computerBoardHold();
      } else {
        shuffleBoards.shuffleShipstToBoardDomPlayer1(
          player1.player1,
          "player1",
          player1BoardCont
        );

        shuffleBoards.shuffleShipstToBoardDomComputer(
          computer.computer,
          "computer",
          computerBoardCont
        );
      }
    } else {
      gameStatus.textContent = "Shuffled";
      setTimeout(() => {
        gameStatus.textContent = "Start the game..";
      }, 500);
      if (shuffle.classList.contains("clicked")) {
        shuffleBoards.reShuffle(
          player1.player1,
          "player1",
          player1BoardCont,
          "1v1"
        );
        shuffleBoards.reShuffle(
          player2.player2,
          "player2",
          player2BoardCont,
          "1v1"
        );
      } else {
        shuffleBoards.shuffleShipstToBoardDomPlayer1(
          player1.player1,
          "player1",
          player1BoardCont,
          "1v1"
        );

        shuffleBoards.shuffleShipstToBoardDomComputer(
          player2.player2,
          "player2",
          player2BoardCont,
          "1v1"
        );
      }
    }
  });
  reset.addEventListener("click", () => {
    if (player2BoardCont.style.display === "none") {
      player1.resetBoard();
      computer.resetBoard();

      player1.startTheBoard();
      computer.startTheBoard();
      shuffleBoards.reShuffle(player1.player1, "player1", player1BoardCont);
      shuffleBoards.reShuffle(computer.computer, "computer", computerBoardCont);
      computerBoardHold();
    } else {
      player1.resetBoard();
      player2.resetBoard();

      player1.startTheBoard("play1v1");
      player2.startTheBoard();

      shuffleBoards.shuffleShipstToBoardDomPlayer2(
        player1.player1,
        "player1",
        player1BoardCont
      );

      shuffleBoards.shuffleShipstToBoardDomComputer(
        player2.player2,
        "player2",
        player2BoardCont
      );

      player1BoardHold();
      player2BoardHold();
    }

    shuffle.disabled = false;
    shuffle.classList.remove("disabled");
    shuffle.classList.add("clicked");
    reset.disabled = true;
    reset.classList.add("disabled");
    gameStatus.textContent = " Start the game..";
    start.style.display = "inline";
    shuffle.style.display = "inline";
  });

  back.addEventListener("click", () => {
    location.reload();
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
          setTimeout(GamesStatusFn(), 0);
        },
        { once: true }
      );
    });
    computerBoardUnHold();
  };

  const player1BoardEventlisterns = () => {
    const player1Board = document.querySelectorAll(".cell.player1");
    player1Board.forEach((cell) => {
      cell.addEventListener(
        "click",
        () => {
          player2.player2AttackDom(cell);
          gameStatus.textContent = "Player1's turn";
          player1BoardHold();
          player2BoardUnHold();
          setTimeout(GamesStatusFn("1v1"), 0);
        },
        { once: true }
      );
    });
  };
  const player2BoardEventlisterns = () => {
    const player2Board = document.querySelectorAll(".cell.player2");
    player2Board.forEach((cell) => {
      cell.addEventListener(
        "click",
        () => {
          player1.player1AttackDom(cell, player1BoardEventlisterns);
          gameStatus.textContent = "Player2's turn";
          player2BoardHold();
          player1BoardUnHold();
          setTimeout(GamesStatusFn("1v1"), 0);
        },
        { once: true }
      );
    });
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
  const player1BoardHold = () => {
    player1BoardCont.disabled = true;
    player1BoardCont.style.pointerEvents = "none";
    player1BoardCont.classList.add("disabledDarker");
  };
  const player1BoardUnHold = () => {
    player1BoardCont.style.pointerEvents = "auto";
    player1BoardCont.disabled = false;
    player1BoardCont.classList.remove("disabledDarker");
  };
  const player2BoardHold = () => {
    player2BoardCont.disabled = true;
    player2BoardCont.style.pointerEvents = "none";
    player2BoardCont.classList.add("disabledDarker");
  };
  const player2BoardUnHold = () => {
    player2BoardCont.style.pointerEvents = "auto";
    player2BoardCont.disabled = false;
    player2BoardCont.classList.remove("disabledDarker");
  };

  const GamesStatusFn = (gameType) => {
    const player1Wins = computer.shipsStatusDom();
    const player1Wins2 = player2.shipsStatusDom();
    let computerWins;
    let player2Wins;
    gameType
      ? (player2Wins = player1.shipsStatusDom("player2"))
      : (computerWins = player1.shipsStatusDom("computer"));

    if (!gameType && computerWins && !player1Wins) {
      gameStatus.textContent = `${computerWins}`;
      start.style.display = "none";
      shuffle.style.display = "none";
    } else if (!computerWins && player1Wins && !gameType) {
      gameStatus.textContent = `${player1Wins}`;
      start.style.display = "none";
      shuffle.style.display = "none";
    } else if (player1Wins2 && !player2Wins && gameType) {
      gameStatus.textContent = `${player1Wins2}`;
      start.style.display = "none";
      shuffle.style.display = "none";
      player2BoardUnHold();
      player1BoardUnHold();
    } else if (computerWins && player1Wins) {
      gameStatus.textContent = `Draw`;
      start.style.display = "none";
      shuffle.style.display = "none";
    } else if (player2Wins && player1Wins && gameType) {
      gameStatus.textContent = `Draw`;
      start.style.display = "none";
      shuffle.style.display = "none";
      player2BoardUnHold();
      player1BoardUnHold();
    } else if (player2Wins && !player1Wins) {
      gameStatus.textContent = `${player2Wins}`;
      start.style.display = "none";
      shuffle.style.display = "none";
      player2BoardUnHold();
      player1BoardUnHold();
    }
  };
})();
