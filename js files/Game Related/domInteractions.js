import player1 from "../players/player1.js";
import player2 from "../players/player2.js";
import computer from "../players/computer.js";
import shuffleBoards from "./shuffleBoards.js";

export default (function () {
  const gameControls = document.querySelector(".gameControls");
  const play1v1Btn = document.querySelector(".play1v1Btn");
  const playVsComputerBtn = document.querySelector(".playVsComputerBtn");
  const start = document.querySelector(".start");
  const shuffle = document.querySelector(".shuffle");
  const reset = document.querySelector(".reset");
  const placeBoardPlayer1 = document.querySelector(".placeBoardPlayer1");
  const placeBoardPlayer2 = document.querySelector(".placeBoardPlayer2");
  const BoxOfShipsPlayer1 = document.querySelector(".BoxOfShipsPlayer1");
  const BoxOfShipsPlayer2 = document.querySelector(".BoxOfShipsPlayer2");
  const closeIcons = document.querySelectorAll(".close");
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
    placeBoardPlayer1.style.display = "inline";
    back.style.display = "inline";
    reset.disabled = true;
    reset.classList.add("disabled");

    gameStatus.style.visibility = "visible";

    shuffle.classList.add("clicked");

    computerBoardHold();
  });

  placeBoardPlayer1.addEventListener("click", () => {
    shuffleBoards.resetBoardData(player1.player1);
    shuffleBoards.resetBoardDataDomPlayer1("player1");
    player1.player1BoardUnHold();
    gameControls.style.display = "none";
    BoxOfShipsPlayer1.style.display = "flex";
    player1.placeBoardPlayer1Fn();
  });

  placeBoardPlayer2.addEventListener("click", () => {
    shuffleBoards.resetBoardData(player2.player2);
    shuffleBoards.resetBoardDataDomPlayer2("player2");
    player2.player2BoardUnHold();
    gameControls.style.display = "none";
    BoxOfShipsPlayer2.style.display = "flex";
    player2.placeBoardPlayer2Fn();
  });

  closeIcons.forEach((node) => {
    node.addEventListener("click", () => {
      if (BoxOfShipsPlayer1.style.display === "flex") {
        const ships = document.querySelectorAll(".ship.player1");
        const shipsArr = [...ships];
        const shipsOffBoard = shipsArr.filter((ship) => {
          return ship.style.display === "none";
        });

        if (shipsOffBoard.length < 10) {
          let answer = prompt(
            `Closing resets the place of ships..Do you want to porceed with closing?
          (Yes,No)
            `
          );
          answer.toLowerCase();
          while (answer !== "yes" && answer !== "no") {
            answer = prompt(`Please enter (Yes or No)`);
          }
          if (answer === "yes") {
            player1.exitShipBox();
          }
        } else {
          player1.exitShipBox();
        }
      } else if (BoxOfShipsPlayer2.style.display === "flex") {
        const ships = document.querySelectorAll(".ship.player2");
        const shipsArr = [...ships];
        const shipsOffBoard = shipsArr.filter((ship) => {
          return ship.style.display === "none";
        });

        if (shipsOffBoard.length < 10) {
          let answer = prompt(
            `Closing resets ships places ..Do you want to porceed with closing?
          (Yes,No)
            `
          );
          answer.toLowerCase();
          while (answer !== "yes" && answer !== "no") {
            answer = prompt(`Please enter (Yes or No)`);
          }
          if (answer === "yes") {
            player2.exitShipBox();
          }
        } else {
          player2.exitShipBox();
        }
      }
    });
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
    placeBoardPlayer1.style.display = "inline";
    placeBoardPlayer2.style.display = "inline";
    back.style.display = "inline";
    reset.disabled = true;
    reset.classList.add("disabled");

    gameStatus.style.visibility = "visible";

    shuffle.classList.add("clicked");

    player1.player1BoardHold();
    player2.player2BoardHold();
  });

  start.addEventListener("click", () => {
    reset.disabled = false;
    reset.classList.remove("disabled");
    shuffle.disabled = true;
    shuffle.classList.add("disabled");
    start.disabled = true;
    start.classList.add("disabled");
    placeBoardPlayer1.disabled = true;
    placeBoardPlayer1.classList.add("disabled");
    placeBoardPlayer2.disabled = true;
    placeBoardPlayer2.classList.add("disabled");
    gameStatus.textContent = "Player1's turn";

    if (player2BoardCont.style.display === "none") {
      computerBoardEventlisterns();
    } else if (player2BoardCont.style.display !== "none") {
      const playersBoard = document.querySelectorAll(`.cell`);

      playersBoard.forEach((cell) => {
        cell.classList.remove("shipColor");
      });
      player2BoardEventlisterns();
      player1BoardEventlisterns();
      player2.player2BoardUnHold();
      player1.player1BoardUnHold();
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

      player1.player1BoardHold();
      player2.player2BoardHold();
    }

    shuffle.disabled = false;
    shuffle.classList.remove("disabled");
    shuffle.classList.add("clicked");
    reset.disabled = true;
    reset.classList.add("disabled");
    gameStatus.textContent = " Start the game..";
    start.style.display = "inline";
    start.disabled = false;
    start.classList.remove("disabled");

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
          player1.player1BoardHold();
          player2.player2BoardUnHold();
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
          player2.player2BoardHold();
          player1.player1BoardUnHold();
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
      player2.player2BoardUnHold();
      player1.player1BoardUnHold();
    } else if (computerWins && player1Wins) {
      gameStatus.textContent = `Draw`;
      start.style.display = "none";
      shuffle.style.display = "none";
    } else if (player2Wins && player1Wins && gameType) {
      gameStatus.textContent = `Draw`;
      start.style.display = "none";
      shuffle.style.display = "none";
      player2.player2BoardUnHold();
      player1.player1BoardUnHold();
    } else if (player2Wins && !player1Wins) {
      gameStatus.textContent = `${player2Wins}`;
      start.style.display = "none";
      shuffle.style.display = "none";
      player2.player2BoardUnHold();
      player1.player1BoardUnHold();
    }
  };
})();
