const ship = (length = 0, numHits = 0) => {
  return {
    length,
    numHits,
    hit: function () {
      this.numHits += 1;
    },
  };
};

export { ship };
