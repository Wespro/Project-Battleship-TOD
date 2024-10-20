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
  // getting the board
  horizontalGrid.forEach((item) => {
    for (let i = 1; i < 11; i++) {
      board.push({ cord: [item, i], occupied: false });
    }
  });

  return { board };
};
export { ship, gameBoard };
