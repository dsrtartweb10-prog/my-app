export class DSRTGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.scene = null;
    this.lastTime = 0;
    this.deltaTime = 0;
    requestAnimationFrame(this.loop.bind(this));
  }

  setScene(scene) {
    this.scene = scene;
  }

  loop(time) {
    this.deltaTime = (time - this.lastTime) / 1000;
    this.lastTime = time;
    if (this.scene?.update) this.scene.update(this.deltaTime);
    if (this.scene?.render) this.scene.render(this.ctx);
    requestAnimationFrame(this.loop.bind(this));
  }
}

export class Scene {
  constructor() {
    this.objects = [];
  }
  add(obj) { this.objects.push(obj); }
  update(dt) { this.objects.forEach(o => o.update?.(dt)); }
  render(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.objects.forEach(o => o.render?.(ctx));
  }
}

export class Sprite {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.vx = 0;
    this.vy = 0;
  }
  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }
  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
            }
