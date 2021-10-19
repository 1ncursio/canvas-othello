import { CANVAS_SIZE, CELL_COUNT, CELL_SIZE } from "./config.js";
import Disc from "./Disc.js";
import Grid from "./Grid.js";
import HoverCell from "./HoverCell.js";
import Indicator from "./Indicator.js";
import State from "./State.js";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let state = new State();
const indicators = Array.from(
  { length: CELL_COUNT ** 2 },
  (_, i) => new Indicator(i)
);
const discs = Array.from({ length: CELL_COUNT ** 2 }, (_, i) => new Disc(i));
const grid = new Grid();
const hoverCell = new HoverCell();

/* 이벤트 핸들러 */

let timer = null;
canvas.addEventListener("mousemove", (e) => {
  if (!timer) {
    timer = setTimeout(() => {
      timer = null;
      const { left, top } = canvas.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      hoverCell.move(x, y);
    }, 20);
  }
});

canvas.addEventListener("mouseleave", (e) => {
  hoverCell.hide();
});

canvas.addEventListener("mouseenter", (e) => {
  hoverCell.show();
});

canvas.addEventListener("mousedown", (e) => {
  if (!timer) {
    timer = setTimeout(() => {
      console.log("ㅇㅅㅇ");
      timer = null;
      const { left, top } = canvas.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const index =
        parseInt(x / CELL_SIZE) + parseInt(y / CELL_SIZE) * CELL_COUNT;
      //   console.log({ index });
      //   console.log({ x: parseInt(x / CELL_SIZE), y: parseInt(y / CELL_SIZE) });
      const isLegalAction = state.isLegalActionXy(
        parseInt(x / CELL_SIZE),
        parseInt(y / CELL_SIZE)
      );

      const isFirstPlayer = state.isFirstPlayer();

      if (isLegalAction && isFirstPlayer) {
        state = state.next(index);
        randomAIAction();
        console.log("AI 대기중...");
      }
    }, 20);
  }
});

const randomAIAction = () =>
  setTimeout(() => {
    state = state.next(randomAction(state));
    console.log("AI 수 선택 완료");
  }, 3000);

let time = 0;
function render() {
  time += 1;

  const renderId = window.requestAnimationFrame(render);
  context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  grid.draw(context);
  hoverCell.draw(context);

  const isFirstPlayer = state.isFirstPlayer();
  state.blackPieces.forEach((v, i) => {
    if (v === 1) {
      discs[i].setIsblack(isFirstPlayer).draw(context);
    }
  });
  state.whitePieces.forEach((v, i) => {
    if (v === 1) {
      discs[i].setIsblack(!isFirstPlayer).draw(context);
    }
  });
  if (isFirstPlayer) {
    state.legalActions().forEach((v) => indicators[v].draw(context));
  } else {
    state.legalActions().forEach((v) => indicators[v].draw(context));
  }
}

window.requestAnimationFrame(render);

function randomAction(state) {
  const legalActions = state.legalActions();
  return legalActions[getRandomIntInclusive(0, legalActions.length - 1)];
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}
