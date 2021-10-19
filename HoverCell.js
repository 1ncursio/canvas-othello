import { CELL_SIZE, HOVER_CELL_COLOR } from "./config.js";

export default class HoverCell {
  constructor() {
    this.x = 640;
    this.y = 640;
    this.size = CELL_SIZE;
    this.color = HOVER_CELL_COLOR;
  }

  draw(context) {
    context.beginPath();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.size, this.size);
    context.closePath();
  }

  move(x, y) {
    this.x = parseInt(x / CELL_SIZE) * CELL_SIZE;
    this.y = parseInt(y / CELL_SIZE) * CELL_SIZE;
  }

  hide() {
    this.color = "rgba(0, 0, 0, 0)";
  }

  show() {
    this.color = HOVER_CELL_COLOR;
  }
}
