import { Ship, Gameboard } from "./index";
test("test for hit fn", () => {
  const ship1 = Ship(3);
  ship1.hit();
  expect(ship1.numHits).toBe(1);
});
test("test for isSunk fn", () => {
  const ship1 = Ship(3);
  ship1.hit();
  ship1.hit();
  ship1.hit();
  ship1.hit();
  expect(ship1.isSunk()).toBe(true);
});

test("test for Gameboard's placeShipOnBoard fn", () => {
  const gameBoard1 = Gameboard();
  const expectedResults = [
    { attacked: false, cord: ["a", 1], occupied: true },
    { attacked: false, cord: ["a", 2], occupied: true },
    { attacked: false, cord: ["a", 3], occupied: true },
    ,
  ];
  const expectedResults2 = [
    [
      { attacked: false, cord: ["a", 1], occupied: true },
      { attacked: false, cord: ["a", 2], occupied: true },
      { attacked: false, cord: ["a", 3], occupied: true },
      ,
    ],
  ];
  expect(gameBoard1.placeShipOnBoard(["a", 1], ["a", 2], ["a", 3])).toEqual(
    expectedResults
  );
  expect(gameBoard1.shipCords).toEqual(expectedResults2);
});

test("test for Gameboard's receiveAttack fn", () => {
  const gameBoard1 = Gameboard();
  gameBoard1.placeShipOnBoard(["a", 1], ["a", 2], ["a", 3]);
  const expectedResults = { attacked: true, cord: ["a", 1], occupied: true };
  const expectedResults2 = [{ attacked: true, cord: ["a", 1], occupied: true }];

  expect(gameBoard1.receiveAttack(["a", 1])).toEqual(expectedResults);

  expect(gameBoard1.cordsBeenHit).toEqual(expectedResults2);
});
