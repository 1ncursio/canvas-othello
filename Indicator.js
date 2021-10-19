import { CELL_SIZE } from "./config.js";

export default class Indicator {
  constructor(index) {
    this.color = "red";
    this.radius = 10;
    this.size = CELL_SIZE;
    this.index = index;
  }

  draw(context) {
    const y = parseInt(this.index / 8) * this.size + parseInt(this.size / 2);
    const x = (this.index % 8) * this.size + parseInt(this.size / 2);

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
