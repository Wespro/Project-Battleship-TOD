import { ship, gameBoard } from "./index";
test("test for hit fn", () => {
  const ship1 = ship(3);
  ship1.hit();
  expect(ship1.numHits).toBe(1);
});
test("test for isSunk fn", () => {
  const ship1 = ship(3);
  ship1.hit();
  ship1.hit();
  ship1.hit();
  ship1.hit();
  expect(ship1.isSunk()).toBe(true);
});

test.only("test for Gameboard's placeShipOnBoard fn", () => {
  const gameBoard1 = gameBoard();
  const expectedResults = [
    { attacked: false, cord: ["a", 1], occupied: true },
    { attacked: false, cord: ["a", 2], occupied: true },
    { attacked: false, cord: ["a", 3], occupied: true },
  ];
  expect(gameBoard1.placeShipOnBoard(["a", 1], ["a", 2], ["a", 3])).toEqual(
    expectedResults
  );
});
