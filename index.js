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

export { ship };
