import { ship } from "./index";
test("test for hit fucntion", () => {
  const ship1 = ship(3);
  ship1.hit();
  expect(ship1.numHits).toBe(1);
});
