import { BLACK_DISC_COLOR, WHITE_DISC_COLOR, CELL_SIZE } from "./config.js";

export default class Disc {
  constructor(isBlack, index) {
    this.radius = CELL_SIZE * 0.5;
    this.isBlack = isBlack;
    this.color = isBlack ? BLACK_DISC_COLOR : WHITE_DISC_COLOR;
    this.index = index;
  }

  draw(context) {
    const y = parseInt(this.index / 8) * this.radius * 2 + this.radius;
    const x = (this.index % 8) * this.radius * 2 + this.radius;

    context.beginPath();
    context.arc(x, y, this.radius, 0, Math.PI * 2, false);
    context.strokeStyle = "grey";
    context.lineWidth = 2;
    context.fillStyle = this.color;
    context.fill();
    context.stroke();
    context.closePath();
  }
}
