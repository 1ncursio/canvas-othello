import HoverCell from "./HoverCell.js";
import Grid from "./Grid.js";
import Disc from "./Disc.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 640;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const grid = new Grid(CANVAS_WIDTH, CANVAS_HEIGHT, "rgba(255, 255, 255, 0.5)");
const hoverCell = new HoverCell(640, 640, 80, 80, "rgba(0, 0, 0, 0.3)");
const disc = new Disc(40, 40, 40, "rgba(0,0,0,1)");
disc.draw(ctx);

grid.draw(ctx);
hoverCell.draw(ctx);

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

      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      hoverCell.update(ctx, { x, y });
      grid.update(ctx);
    }, 20);
  }
});

canvas.addEventListener("mouseleave", (e) => {
  hoverCell.color = "rgba(0, 0, 0, 0)";
});

canvas.addEventListener("mouseenter", (e) => {
  hoverCell.color = "rgba(0, 0, 0, 0.3)";
});

canvas.addEventListener("mousedown", (e) => {
  if (!timer) {
    timer = setTimeout(() => {
      console.log("ㅇㅅㅇ");
      timer = null;
      const { left, top } = canvas.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      const index = parseInt(x / 80) + parseInt(y / 80) * 8;
      console.log({ index });
      console.log({ x: parseInt(x / 80), y: parseInt(y / 80) });
    }, 20);
  }
});
