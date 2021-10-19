import { CELL_COUNT, CELL_SIZE, GRID_COLOR } from "./config.js";

export default class Grid {
  constructor() {
    this.size = CELL_SIZE;
    this.count = CELL_COUNT;
    this.color = GRID_COLOR;
  }

  draw(context) {
    context.strokeStyle = this.color;
    context.lineWidth = 1;

    const CANVAS_SIZE = this.size * this.count;

    for (let i = 1; i < CANVAS_SIZE; i++) {
      // vertical lines
      context.beginPath();
      context.moveTo(i * this.size, 0);
      context.lineTo(i * this.size, CANVAS_SIZE);

      // horizontal lines
      context.moveTo(0, i * this.size);
      context.lineTo(CANVAS_SIZE, i * this.size);

      context.stroke();
      context.closePath();
    }
  }
}
