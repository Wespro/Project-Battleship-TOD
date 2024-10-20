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

test.only("test for gameBoard", () => {
  const gameBoard1 = gameBoard();
  expect(gameBoard1.board.length).toBe(100);
});
