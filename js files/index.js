//Ship  factory
const Ship = (length = 0, numHits = 0) => {
  return {
    length,
    numHits,
    hit: function () {
      this.numHits += 1;
    },
    isSunk: function () {
      return this.numHits >= this.length ? true : false;
    },
  };
};

//gameboard  factory
const Gameboard = () => {
  const horizontal = "abcdefghij";
  const horizontalGrid = horizontal.split("");
  const board = [];
  const shipsCords = [];
  const ships = {
    oneSquare: [],
    towSquare: [],
    threeSquare: [],
    fourSquare: [],
  };
  const cordsBeenHit = [];
  // getting the board
  horizontalGrid.forEach((item) => {
    for (let i = 1; i < 11; i++) {
      board.push({ cord: [item, i], occupied: false, attacked: false });
    }
  });
  //placeing ships on board
  const placeShipOnBoard = (...cords) => {
    const ship = Ship(cords.length);
    if (ship.length === 1) {
      ships.oneSquare.push(ship);
    } else if (ship.length === 2) {
      ships.towSquare.push(ship);
    } else if (ship.length === 3) {
      ships.threeSquare.push(ship);
    } else if (ship.length === 4) {
      ships.fourSquare.push(ship);
    }

    const shipcords = [];
    cords.forEach((cord) => {
      for (let boardCord of board) {
        //compare 2 array together with Json.stringfy
        if (JSON.stringify(cord) === JSON.stringify(boardCord.cord)) {
          boardCord.occupied = true;
          //new property
          boardCord.attacked = false;
          shipcords.push(boardCord.cord);
          shipsCords.push(boardCord.cord);
        }
      }
    });

    // return ship;
  };

  const receiveAttack = (cord) => {
    let hitCord;
    board.forEach((boardCord) => {
      if (JSON.stringify(cord) === JSON.stringify(boardCord.cord)) {
        boardCord.attacked = true;
        cordsBeenHit.push(boardCord);
        hitCord = boardCord;
      }
    });
    return hitCord;
  };

  return {
    board,
    placeShipOnBoard,
    receiveAttack,
    shipsCords,
    ships,
    cordsBeenHit,
  };
};

//player factory
const Player = (name) => {
  return {
    name,
    gameboard: Gameboard(),
  };
};

export { Ship, Gameboard, Player };
