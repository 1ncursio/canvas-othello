export default class HoverCell {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(context) {
    context.beginPath();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.closePath();
  }

  update(context, { x, y }) {
    this.x = parseInt(x / 80) * 80;
    this.y = parseInt(y / 80) * 80;
    this.draw(context);
  }
}
