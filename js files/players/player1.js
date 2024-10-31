import { Player } from "../index.js";
import displayAxes from "../Game Related/displayAxes.js";
import fillingBoxOfShipsDom from "../Game Related/fillingBoxOfShipsDom.js";
import player2 from "./player2.js";

export default (function player1() {
  const player1 = Player("Player");

  const player1BoardCont = document.querySelector(".player1BoardCont");

  const startTheBoard = (gameType) => {
    const player1BoardDiv = document.createElement("div");
    const player1BoardDivHeader = document.createElement("h2");
    player1BoardDiv.classList.add("player1BoardDiv", gameType);
    player1BoardDivHeader.classList.add("player1BoardDivHeader");
    player1BoardDivHeader.textContent = "Player1 Board";
    const fragment = document.createDocumentFragment();

    for (let i = 1; i < 11; i++) {
      const coulmn = document.createElement("div");
      coulmn.classList.add(`${i}`, "coulmn");

      fragment.append(coulmn);
    }
    player1BoardDiv.append(fragment);
    player1BoardCont.append(player1BoardDiv, player1BoardDivHeader);

    const coulmns = document.querySelectorAll(".coulmn");
    const rowletters = "abcdefghij";
    const rowsArr = rowletters.split("");

    coulmns.forEach((col, index) => {
      for (let i = 1; i < 11; i++) {
        const cell = document.createElement("div");
        gameType === "playVsComputer"
          ? cell.classList.add(
              `${rowsArr[index]}${i}`,
              "cell",
              "player1",
              "playVsComputer"
            )
          : cell.classList.add(
              `${rowsArr[index]}${i}`,
              "cell",
              "player1",
              `${gameType}`
            );
        i === 10 ? cell.classList.add("tenth") : i;
        col.append(cell);
      }
    });

    displayAxes.displayRowsNames();
    displayAxes.displayColmunsNames();
  };

  const resetBoard = () => {
    player1BoardCont.replaceChildren();
  };
  const placeBoardPlayer1Fn = () => {
    fillingBoxOfShipsDom(1);
    let shipBlocksNum = 0;
    const dropArea = [];
    let currentShip;
    const ships = document.querySelectorAll(".ship.player1");
    const board1Cells = document.querySelectorAll(`.cell.player1`);
    ships.forEach((ship) => {
      ship.addEventListener("dragstart", (e) => {
        if (ship.children.length === 0) {
          shipBlocksNum = 1;
        } else {
          shipBlocksNum = ship.children.length;
        }

        currentShip = ship;
        ship.classList.add("dragging");
      });
    });
    ships.forEach((ship) => {
      ship.addEventListener("dragend", (e) => {
        ship.classList.remove("dragging");
      });
    });
    board1Cells.forEach((cell, index) => {
      cell.addEventListener("dragover", (e) => {
        let count = 10;
        e.preventDefault();
        if (!dropArea.includes(e.target)) {
          dropArea.push(e.target);
        }
        if (
          !currentShip.getAttribute("direction") ||
          currentShip.getAttribute("direction") === "hori"
        ) {
          for (let i = 1; i < shipBlocksNum; i++) {
            if (
              !dropArea.includes(board1Cells[index + count]) &&
              board1Cells[index + count]
            ) {
              dropArea.push(board1Cells[index + count]);
            }
            count += 10;
          }
        } else if (currentShip.getAttribute("direction") === "vert") {
          for (let i = 1; i < shipBlocksNum; i++) {
            if (
              !dropArea.includes(board1Cells[index + i]) &&
              board1Cells[index + 1]
            ) {
              if (
                shipBlocksNum === 2 &&
                !board1Cells[index].classList.contains("tenth")
              ) {
                dropArea.push(board1Cells[index + i]);
                console.log("here");
              } else if (
                shipBlocksNum === 3 &&
                !board1Cells[index].classList.contains("tenth") &&
                !board1Cells[index + 1].classList.contains("tenth")
              ) {
                dropArea.push(board1Cells[index + i]);
              } else if (
                shipBlocksNum === 4 &&
                !board1Cells[index].classList.contains("tenth") &&
                !board1Cells[index + 1].classList.contains("tenth") &&
                !board1Cells[index + 2].classList.contains("tenth")
              ) {
                dropArea.push(board1Cells[index + i]);
              }
            }
          }
        }

        if (dropArea.length === shipBlocksNum) {
          dropArea.forEach((element) => {
            element.classList.add("dragging");
          });
        } else {
          dropArea.length = 0;
        }
      });
    });
    board1Cells.forEach((cell) => {
      cell.addEventListener("dragleave", (e) => {
        dropArea.forEach((element) => {
          setTimeout(() => {
            element.classList.remove("dragging");
          }, 100);
        });
        dropArea.length = 0;
      });
    });
    board1Cells.forEach((cell) => {
      cell.addEventListener("drop", (e) => {
        const isCellsOccupied = dropArea.filter((ele) => {
          return ele.classList.contains("occupied");
        });

        dropArea.forEach((element) => {
          element.classList.remove("dragging");
        });
        console.log(dropArea.length, shipBlocksNum);
        if (dropArea.length === shipBlocksNum) {
          console.log("first");
          if (isCellsOccupied.length === 0) {
            console.log("sec");
            dropArea.forEach((element) => {
              element.classList.add("occupied");
              element.classList.add("shipColor");
              element.style.pointerEvents = "none";
              currentShip.style.display = "none";
            });
            isShipsBoxEmpty();
          } else {
            alert("Area is Occupied");
          }
        } else {
          alert("Ship Size exceedes the border of board");
        }
        shipBlocksNum = 0;
        dropArea.length = 0;
      });
    });
  };
  const isShipsBoxEmpty = () => {
    const ships = document.querySelectorAll(".ship.player1");
    const shipsArr = [...ships];
    const shipsOffBoard = shipsArr.filter((ship) => {
      return ship.style.display === "none";
    });
    if (shipsOffBoard.length >= 10) {
      exitShipBox();
    }
  };
  const exitShipBox = () => {
    const BoxOfShipsPlayer1 = document.querySelector(".BoxOfShipsPlayer1");
    const gameControls = document.querySelector(".gameControls");
    gameControls.style.display = "grid";
    BoxOfShipsPlayer1.style.display = "none";
    player1BoardHold();
  };

  const player1AttackDom = (cell) => {
    if (!cell.classList.contains("attacked")) {
      if (cell.classList.contains("occupied")) {
        const hit = document.createElement("span");
        hit.classList.add(`hit`);
        hit.textContent = "X";
        hit.style.color = "red";
        cell.append(hit);
      }
      cell.classList.add("attacked");
      cell.disabled = true;
      cell.classList.add("disabled");
    }
  };
  const shipsStatusDom = (playerName) => {
    const shipscords = player1.gameboard.shipsCords;
    let shipsHits = 0;
    shipscords.forEach((cord) => {
      const boardCord = document.querySelector(`.${cord[0]}${cord[1]}.player1`);

      if (boardCord.classList.contains("attacked")) {
        shipsHits += 1;
      }
    });
    if (shipsHits >= 20) {
      if (playerName === "computer") {
        return "Computer Wins";
      } else if (playerName === "player2") {
        return "Player2 Wins";
      }
    }
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
  return {
    player1,
    startTheBoard,
    resetBoard,
    placeBoardPlayer1Fn,
    player1AttackDom,
    shipsStatusDom,
    player1BoardHold,
    player1BoardUnHold,
    exitShipBox,
  };
})();
