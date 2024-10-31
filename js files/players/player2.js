import { Player } from "../index.js";
import displayAxes from "../Game Related/displayAxes.js";
import fillingBoxOfShipsDom from "../Game Related/fillingBoxOfShipsDom.js";
export default (function player2() {
  const player2 = Player("Player2");

  const player2BoardCont = document.querySelector(".player2BoardCont");
  const computerBoardCont = document.querySelector(".computerBoardCont");
  const startTheBoard = () => {
    computerBoardCont.style.display = "none";
    const player2Board = document.createElement("div");
    const player2BoardHeader = document.createElement("h2");
    player2Board.classList.add("player2Board");
    player2BoardHeader.classList.add("player2BoardHeader");
    player2BoardHeader.textContent = "Player2 Board";
    const fragment = document.createDocumentFragment();

    for (let i = 1; i < 11; i++) {
      const coulmn = document.createElement("div");
      coulmn.classList.add(`${i}`, "coulmnComp");

      fragment.append(coulmn);
    }
    player2Board.append(fragment);
    player2BoardCont.append(player2Board, player2BoardHeader);

    const coulmns = document.querySelectorAll(".coulmnComp");
    const rowletters = "abcdefghij";
    const rowsArr = rowletters.split("");

    coulmns.forEach((col, index) => {
      for (let i = 1; i < 11; i++) {
        const cell = document.createElement("div");
        cell.classList.add(`${rowsArr[index]}${i}`, "cell", "player2");
        col.append(cell);
      }
    });

    displayAxes.displayRowsNames();
    displayAxes.displayColmunsNames();
  };

  const resetBoard = () => {
    player2BoardCont.replaceChildren();
  };
  const placeBoardPlayer2Fn = () => {
    fillingBoxOfShipsDom(2);
    let shipBlocksNum;
    let dropArea = [];
    let currentShip;
    const ships = document.querySelectorAll(".ship.player2");
    const board2Cells = document.querySelectorAll(`.cell.player2`);
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
    board2Cells.forEach((cell, index) => {
      cell.addEventListener("dragover", (e) => {
        let count = 10;
        e.preventDefault();
        if (!dropArea.includes(e.target)) {
          dropArea.push(e.target);
        }
        for (let i = 1; i < shipBlocksNum; i++) {
          if (
            !dropArea.includes(board2Cells[index + count]) &&
            board2Cells[index + count]
          ) {
            dropArea.push(board2Cells[index + count]);
          }
          count += 10;
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
    board2Cells.forEach((cell) => {
      cell.addEventListener("dragleave", (e) => {
        dropArea.forEach((element) => {
          setTimeout(() => {
            element.classList.remove("dragging");
          }, 100);
        });
        dropArea.length = 0;
      });
    });
    board2Cells.forEach((cell) => {
      cell.addEventListener("drop", (e) => {
        const isCellsOccupied = dropArea.filter((ele) => {
          return ele.classList.contains("occupied");
        });

        dropArea.forEach((element) => {
          element.classList.remove("dragging");
        });
        if (dropArea.length === shipBlocksNum) {
          if (isCellsOccupied.length === 0) {
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
          alert("Ship Size exceede the border of board");
        }
        shipBlocksNum = 0;
        dropArea.length = 0;
      });
    });
  };
  const isShipsBoxEmpty = () => {
    const ships = document.querySelectorAll(".ship.player2");
    const shipsArr = [...ships];
    const shipsOffBoard = shipsArr.filter((ship) => {
      return ship.style.display === "none";
    });
    if (shipsOffBoard.length >= 10) {
      exitShipBox();
    }
  };
  const exitShipBox = () => {
    const BoxOfShipsPlayer2 = document.querySelector(".BoxOfShipsPlayer2");
    const gameControls = document.querySelector(".gameControls");
    gameControls.style.display = "grid";
    BoxOfShipsPlayer2.style.display = "none";
    player2BoardHold();
  };
  const player2AttackDom = (cell) => {
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

  const shipsStatusDom = () => {
    const shipscords = player2.gameboard.shipsCords;
    let shipsHits = 0;
    shipscords.forEach((cord) => {
      const boardCord = document.querySelector(`.${cord[0]}${cord[1]}.player2`);

      if (boardCord.classList.contains("attacked")) {
        shipsHits += 1;
      }
    });
    if (shipsHits >= 20) {
      return "Player1 Wins";
    }
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
  return {
    player2,
    startTheBoard,
    resetBoard,
    placeBoardPlayer2Fn,
    player2AttackDom,
    shipsStatusDom,
    player2BoardHold,
    player2BoardUnHold,
    exitShipBox,
  };
})();
