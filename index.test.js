import { ship } from "./index";
test("test for hit fn", () => {
  const ship1 = ship(3);
  ship1.hit();
  expect(ship1.numHits).toBe(1);
});
test.only("test for isSunk fn", () => {
  const ship1 = ship(3);
  ship1.hit();
  ship1.hit();
  ship1.hit();
  ship1.hit();
  expect(ship1.isSunk()).toBe(true);
});
