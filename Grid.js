export default class Grid {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  draw(context) {
    context.strokeStyle = this.color;
    context.lineWidth = 1;

    for (let i = 80; i < 640; i += 80) {
      // vertical lines
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, 640);

      // horizontal lines
      context.moveTo(0, i);
      context.lineTo(640, i);

      context.stroke();
    }
  }

  update(context) {
    this.draw(context);
  }
}
