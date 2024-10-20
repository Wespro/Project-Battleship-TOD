const ship = (length, numHits = 0) => {
  return {
    length,
    numHits,
    hit: function () {
      numHits += 1;
    },
  };
};
export { ship };
