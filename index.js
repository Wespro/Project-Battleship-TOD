const ship = (length = 0, numHits = 0) => {
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

const gameBoard = () => {
  const horizontal = "abcdefghij";
  const horizontalGrid = horizontal.split("");
  const board = [];
  const shipCords = [];
  const cordsBeenHit = [];
  // getting the board
  horizontalGrid.forEach((item) => {
    for (let i = 1; i < 11; i++) {
      board.push({ cord: [item, i], occupied: false, attacked: false });
    }
  });
  //placeing ships on board
  const placeShipOnBoard = (...cords) => {
    const ship = [];
    cords.forEach((cord) => {
      for (let boardCord of board) {
        //compare 2 array together with Json.stringfy
        if (JSON.stringify(cord) === JSON.stringify(boardCord.cord)) {
          boardCord.occupied = true;
          //new property
          boardCord.attacked = false;
          ship.push(boardCord);
        }
      }
    });
    shipCords.push(ship);
    return ship;
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

  return { placeShipOnBoard, receiveAttack, shipCords, cordsBeenHit };
};
export { ship, gameBoard };
