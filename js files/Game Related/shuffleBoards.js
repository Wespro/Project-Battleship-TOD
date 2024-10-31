import randomGametemplates from "./randomGametemplates.js";

export default (function () {
  const shuffleShipstToBoard = (playerObj, playerCont) => {
    const randomGamesynarios = randomGametemplates();
    let randomDice = Math.floor(Math.random() * 6);
    if (randomDice === 0 && playerCont.id !== "synario1") {
      randomGamesynarios[0].one.forEach((cord) => {
        playerObj.gameboard.placeShipOnBoard(cord);
      });
      randomGamesynarios[0].tow.forEach((cord) => {
        playerObj.gameboard.placeShipOnBoard(...cord);
      });
      randomGamesynarios[0].three.forEach((cord) => {
        playerObj.gameboard.placeShipOnBoard(...cord);
      });
      playerObj.gameboard.placeShipOnBoard(...randomGamesynarios[0].four);

      playerCont.id = "synario1";
    } else if (randomDice === 1 && playerCont.id !== "synario2") {
      randomGamesynarios[1].one.forEach((cord) => {
        playerObj.gameboard.placeShipOnBoard(cord);
      });
      randomGamesynarios[1].tow.forEach((cord) => {
        playerObj.gameboard.placeShipOnBoard(...cord);
      });
      randomGamesynarios[1].three.forEach((cord) => {
        playerObj.gameboard.placeShipOnBoard(...cord);
      });
      playerObj.gameboard.placeShipOnBoard(...randomGamesynarios[1].four);

      playerCont.id = "synario2";
    } else if (randomDice === 2 && playerCont.id !== "synario3") {
      randomGamesynarios[2].one.forEach((cord) => {
        playerObj.gameboard.placeShipOnBoard(cord);
      });
      randomGamesynarios[2].tow.forEach((cord) => {
        playerObj.gameboard.placeShipOnBoard(...cord);
      });
      randomGamesynarios[2].three.forEach((cord) => {
        playerObj.gameboard.placeShipOnBoard(...cord);
      });
      playerObj.gameboard.placeShipOnBoard(...randomGamesynarios[2].four);

      playerCont.id = "synario3";
    } else if (randomDice === 3 && playerCont.id !== "synario4") {
      randomGamesynarios[3].one.forEach((cord) => {
        playerObj.gameboard.placeShipOnBoard(cord);
      });
      randomGamesynarios[3].tow.forEach((cord) => {
        playerObj.gameboard.placeShipOnBoard(...cord);
      });
      randomGamesynarios[3].three.forEach((cord) => {
        playerObj.gameboard.placeShipOnBoard(...cord);
      });
      playerObj.gameboard.placeShipOnBoard(...randomGamesynarios[3].four);

      playerCont.id = "synario4";
    } else if (randomDice === 4 && playerCont.id !== "synario5") {
      randomGamesynarios[4].one.forEach((cord) => {
        playerObj.gameboard.placeShipOnBoard(cord);
      });
      randomGamesynarios[4].tow.forEach((cord) => {
        playerObj.gameboard.placeShipOnBoard(...cord);
      });
      randomGamesynarios[4].three.forEach((cord) => {
        playerObj.gameboard.placeShipOnBoard(...cord);
      });
      playerObj.gameboard.placeShipOnBoard(...randomGamesynarios[4].four);

      playerCont.id = "synario5";
    } else if (randomDice === 5 && playerCont.id !== "synario6") {
      randomGamesynarios[5].one.forEach((cord) => {
        playerObj.gameboard.placeShipOnBoard(cord);
      });
      randomGamesynarios[5].tow.forEach((cord) => {
        playerObj.gameboard.placeShipOnBoard(...cord);
      });
      randomGamesynarios[5].three.forEach((cord) => {
        playerObj.gameboard.placeShipOnBoard(...cord);
      });
      playerObj.gameboard.placeShipOnBoard(...randomGamesynarios[5].four);

      playerCont.id = "synario6";
    } else {
      shuffleShipstToBoard(playerObj, playerCont);
    }
  };

  const shuffleShipstToBoardDomPlayer1 = (
    playerObj,
    playerName,
    playerCont,
    gameType
  ) => {
    shuffleShipstToBoard(playerObj, playerCont);

    const shipsCords = playerObj.gameboard.shipsCords;

    shipsCords.forEach((cord) => {
      const domCords = document.querySelectorAll(
        `.${cord[0]}${cord[1]}.${playerName}`
      );
      domCords.forEach((domCord) => {
        domCord.classList.add("occupied");
        gameType ? "" : domCord.classList.add("shipColor");
      });
    });
  };

  const shuffleShipstToBoardDomComputer = (
    playerObj,
    playerName,
    playerCont
  ) => {
    shuffleShipstToBoard(playerObj, playerCont);

    const shipsCords = playerObj.gameboard.shipsCords;

    shipsCords.forEach((cord) => {
      const domCords = document.querySelectorAll(
        `.${cord[0]}${cord[1]}.${playerName}`
      );
      domCords.forEach((domCord) => {
        domCord.classList.add("occupied");
      });
    });
  };

  const shuffleShipstToBoardDomPlayer2 = (
    playerObj,
    playerName,
    playerCont
  ) => {
    shuffleShipstToBoard(playerObj, playerCont);

    const shipsCords = playerObj.gameboard.shipsCords;

    shipsCords.forEach((cord) => {
      const domCords = document.querySelectorAll(
        `.${cord[0]}${cord[1]}.${playerName}`
      );
      domCords.forEach((domCord) => {
        domCord.classList.add("occupied");
      });
    });
  };

  const reShuffle = (playerObj, playerName, playerCont, gameType) => {
    if (playerName === "player1") {
      resetBoardData(playerObj);
      resetBoardDataDomPlayer1(playerName);
      shuffleShipstToBoardDomPlayer1(
        playerObj,
        playerName,
        playerCont,
        gameType
      );
    } else if (playerName === "computer") {
      resetBoardData(playerObj);
      resetBoardDataDomComputer(playerName);
      shuffleShipstToBoardDomComputer(playerObj, playerName, playerCont);
    } else {
      resetBoardData(playerObj);
      resetBoardDataDomPlayer2(playerName);
      shuffleShipstToBoardDomPlayer2(playerObj, playerName, playerCont);
    }
  };

  const resetBoardData = (playerObj) => {
    playerObj.gameboard.shipsCords.length = 0;

    playerObj.gameboard.ships.oneSquare = [];
    playerObj.gameboard.ships.towSquare = [];
    playerObj.gameboard.ships.threeSquare = [];
    playerObj.gameboard.ships.fourSquare = [];

    playerObj.gameboard.length = 0;
  };
  const resetBoardDataDomPlayer1 = (playerName) => {
    const playerBoard = document.querySelectorAll(`.cell.${playerName}`);

    playerBoard.forEach((cell) => {
      cell.classList.remove("occupied");
      cell.classList.remove("shipColor");
    });
  };
  const resetBoardDataDomComputer = (playerName) => {
    const playerBoard = document.querySelectorAll(`.cell.${playerName}`);

    playerBoard.forEach((cell) => {
      cell.classList.remove("occupied");
    });
  };
  const resetBoardDataDomPlayer2 = (playerName) => {
    const playerBoard = document.querySelectorAll(`.cell.${playerName}`);

    playerBoard.forEach((cell) => {
      cell.classList.remove("occupied");
      cell.classList.remove("shipColor");
    });
  };
  return {
    shuffleShipstToBoardDomPlayer1,
    shuffleShipstToBoardDomComputer,
    shuffleShipstToBoardDomPlayer2,
    reShuffle,
    resetBoardData,
    resetBoardDataDomPlayer1,
    resetBoardDataDomComputer,
    resetBoardDataDomPlayer2,
  };
})();
