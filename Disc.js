export default class Disc {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    context.strokeStyle = "grey";
    context.lineWidth = 3;
    context.fillStyle = this.color;
    context.fill();
    context.stroke();
    context.closePath();
  }

  update(context) {}
}
