import { CELL_SIZE, CELL_COUNT, CANVAS_SIZE } from "./config.js";
import HoverCell from "./HoverCell.js";
import Grid from "./Grid.js";
import Disc from "./Disc.js";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const blackDiscs = [];
const whiteDiscs = [];
const grid = new Grid();
const hoverCell = new HoverCell();

blackDiscs.push(new Disc(true, 27));
blackDiscs.push(new Disc(true, 36));
whiteDiscs.push(new Disc(false, 28));
whiteDiscs.push(new Disc(false, 35));

/* 이벤트 핸들러 */

let timer = null;
canvas.addEventListener("mousemove", (e) => {
  if (!timer) {
    timer = setTimeout(() => {
      console.log("ㅇㅅㅇ");
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
      console.log({ index });
      console.log({ x: parseInt(x / CELL_SIZE), y: parseInt(y / CELL_SIZE) });
    }, 20);
  }
});

function render() {
  const renderId = window.requestAnimationFrame(render);
  context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  grid.draw(context);
  hoverCell.draw(context);
  blackDiscs.forEach((v) => v.draw(context));
  whiteDiscs.forEach((v) => v.draw(context));
}

window.requestAnimationFrame(render);
