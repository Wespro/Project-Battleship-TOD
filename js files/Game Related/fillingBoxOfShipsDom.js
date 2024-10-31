export default function (PlayerNum) {
  const shipsLevel1 = document.querySelector(
    `.BoxOfShipsPlayer${PlayerNum} > .shipsLevel1Cont > .shipsLevel1`
  );
  const shipsLevel2 = document.querySelector(
    `.BoxOfShipsPlayer${PlayerNum} > .shipsLevel2Cont  > .shipsLevel2`
  );
  const shipsLevel3 = document.querySelector(
    `.BoxOfShipsPlayer${PlayerNum} > .shipsLevel3Cont > .shipsLevel3`
  );
  const shipsLevel4 = document.querySelector(
    `.BoxOfShipsPlayer${PlayerNum} > .shipsLevel4Cont > .shipsLevel4`
  );
  //reset box
  for (let i = 1; i < 5; i++) {
    document
      .querySelector(
        `.BoxOfShipsPlayer${PlayerNum} > .shipsLevel${i}Cont > .shipsLevel${i}`
      )
      .replaceChildren();
  }

  for (let i = 1; i < 5; i++) {
    const ship = document.createElement("div");

    ship.classList.add("boxCell", "ship", `player${PlayerNum}`);
    ship.draggable = true;
    shipsLevel1.append(ship);
  }
  for (let i = 1; i < 4; i++) {
    const ship = document.createElement("div");
    ship.draggable = true;
    ship.classList.add("ship", `player${PlayerNum}`);
    shipsLevel2.append(ship);
    for (let i = 1; i < 3; i++) {
      const cellShip = document.createElement("div");
      cellShip.classList.add("boxCell");
      ship.append(cellShip);
    }
  }
  for (let i = 1; i < 3; i++) {
    const ship = document.createElement("div");
    ship.draggable = true;
    ship.classList.add("ship", `player${PlayerNum}`);
    shipsLevel3.append(ship);
    for (let i = 1; i < 4; i++) {
      const cellShip = document.createElement("div");
      cellShip.classList.add("boxCell");
      ship.append(cellShip);
    }
  }
  for (let i = 1; i < 2; i++) {
    const ship = document.createElement("div");
    ship.draggable = true;
    ship.classList.add("ship", `player${PlayerNum}`);
    shipsLevel4.append(ship);
    for (let i = 1; i < 5; i++) {
      const cellShip = document.createElement("div");
      cellShip.classList.add("boxCell");
      ship.append(cellShip);
    }
  }
}
