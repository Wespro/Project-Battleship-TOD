import { Ship, Gameboard, Player } from "../index.js";
import randomGametemplates from "./randomGametemplates.js";
export default (function player1() {
  const play = document.querySelector(".play");
  const shuffle = document.querySelector(".shuffle");
  const reset = document.querySelector(".reset");

  const player1 = Player("Player");

  const footer = document.querySelector("footer");
  const yourBoardCont = document.querySelector(".yourBoardCont");

  const startTheBoard = () => {
    const youBoard = document.createElement("div");
    const youBoardHeader = document.createElement("h2");
    youBoard.classList.add("youBoard");
    youBoardHeader.classList.add("youBoardHeader");
    youBoardHeader.textContent = "Your Board";
    const fragment = document.createDocumentFragment();

    for (let i = 1; i < 11; i++) {
      const coulmn = document.createElement("div");
      coulmn.classList.add(`${i}`, "coulmn");

      fragment.append(coulmn);
    }
    youBoard.append(fragment);
    yourBoardCont.append(youBoard, youBoardHeader);

    const coulmns = document.querySelectorAll(".coulmn");
    const rowletters = "abcdefghij";
    const rowsArr = rowletters.split("");

    coulmns.forEach((col, index) => {
      for (let i = 1; i < 11; i++) {
        const cell = document.createElement("div");
        cell.classList.add(`${rowsArr[index]}${i}`, "cell", "player1");
        col.append(cell);
      }
    });

    play.style.display = "none";
    shuffle.style.display = "inline";
    reset.style.display = "inline";
    footer.style.alignItems = "start";
    displayRowsNames();
    displayColmunsNames();
  };
  const displayRowsNames = () => {
    const a1 = document.querySelectorAll(".a1");
    const b1 = document.querySelectorAll(".b1");
    const c1 = document.querySelectorAll(".c1");
    const d1 = document.querySelectorAll(".d1");
    const e1 = document.querySelectorAll(".e1");
    const f1 = document.querySelectorAll(".f1");
    const g1 = document.querySelectorAll(".g1");
    const h1 = document.querySelectorAll(".h1");
    const i1 = document.querySelectorAll(".i1");
    const j1 = document.querySelectorAll(".j1");

    a1.forEach((node) => {
      const a = document.createElement("span");
      const one = document.createElement("span");

      a.classList.add("a");
      one.classList.add("one");
      a.textContent = "A";
      one.textContent = "1";
      node.append(a, one);
    });
    b1.forEach((node) => {
      const b = document.createElement("span");
      b.classList.add("b");
      b.textContent = "B";
      node.append(b);
    });

    c1.forEach((node) => {
      const c = document.createElement("span");
      c.classList.add("c");
      c.textContent = "C";

      node.append(c);
    });
    d1.forEach((node) => {
      const d = document.createElement("span");
      d.classList.add("d");
      d.textContent = "D";

      node.append(d);
    });
    e1.forEach((node) => {
      const e = document.createElement("span");
      e.classList.add("e");
      e.textContent = "E";

      node.append(e);
    });
    f1.forEach((node) => {
      const f = document.createElement("span");
      f.classList.add("f");
      f.textContent = "F";

      node.append(f);
    });
    g1.forEach((node) => {
      const g = document.createElement("span");
      g.classList.add("g");
      g.textContent = "G";

      node.append(g);
    });
    h1.forEach((node) => {
      const h = document.createElement("span");
      h.classList.add("h");
      h.textContent = "H";

      node.append(h);
    });
    i1.forEach((node) => {
      const i = document.createElement("span");
      i.classList.add("i");
      i.textContent = "I";

      node.append(i);
    });
    j1.forEach((node) => {
      const j = document.createElement("span");
      j.classList.add("j");
      j.textContent = "J";

      node.append(j);
    });
  };
  const displayColmunsNames = () => {
    const a2 = document.querySelectorAll(".a2");
    const a3 = document.querySelectorAll(".a3");
    const a4 = document.querySelectorAll(".a4");
    const a5 = document.querySelectorAll(".a5");
    const a6 = document.querySelectorAll(".a6");
    const a7 = document.querySelectorAll(".a7");
    const a8 = document.querySelectorAll(".a8");
    const a9 = document.querySelectorAll(".a9");
    const a10 = document.querySelectorAll(".a10");

    a2.forEach((node) => {
      const tow = document.createElement("span");
      tow.classList.add("tow");
      tow.textContent = "2";

      node.append(tow);
    });
    a3.forEach((node) => {
      const three = document.createElement("span");
      three.classList.add("three");
      three.textContent = "3";

      node.append(three);
    });
    a4.forEach((node) => {
      const four = document.createElement("span");
      four.classList.add("four");
      four.textContent = "4";

      node.append(four);
    });
    a5.forEach((node) => {
      const five = document.createElement("span");
      five.classList.add("five");
      five.textContent = "5";

      node.append(five);
    });
    a6.forEach((node) => {
      const six = document.createElement("span");
      six.classList.add("six");
      six.textContent = "6";

      node.append(six);
    });
    a7.forEach((node) => {
      const seven = document.createElement("span");
      seven.classList.add("seven");
      seven.textContent = "7";

      node.append(seven);
    });
    a8.forEach((node) => {
      const eight = document.createElement("span");
      eight.classList.add("eight");
      eight.textContent = "8";

      node.append(eight);
    });
    a9.forEach((node) => {
      const nine = document.createElement("span");
      nine.classList.add("nine");
      nine.textContent = "9";

      node.append(nine);
    });
    a10.forEach((node) => {
      const ten = document.createElement("span");
      ten.classList.add("ten");
      ten.textContent = "10";

      node.append(ten);
    });
  };

  const resetBoard = () => {
    yourBoardCont.replaceChildren();
  };

  return {
    player1,
    startTheBoard,
    resetBoard,
  };
})();
