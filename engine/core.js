// engine/core.js
export class Game {
  constructor(canvas) {
    if (typeof canvas === "string") canvas = document.getElementById(canvas);
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.scene = null;
    this.lastTime = 0;
    this.dt = 0;
    this.running = false;
    this.input = new Input();
  }

  start() {
    this.running = true;
    this.lastTime = performance.now();
    requestAnimationFrame(this._loop.bind(this));
  }

  stop() {
    this.running = false;
  }

  _loop(now) {
    if (!this.running) return;
    this.dt = (now - this.lastTime) / 1000;
    this.lastTime = now;

    if (this.scene?.update) this.scene.update(this.dt, this);
    if (this.scene?.lateUpdate) this.scene.lateUpdate(this.dt, this);

    // render
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.scene?.render) this.scene.render(this.ctx, this);
    requestAnimationFrame(this._loop.bind(this));
  }

  setScene(scene) {
    this.scene = scene;
  }
}

export class Scene {
  constructor(name = "scene") {
    this.name = name;
    this.entities = [];
    this.systems = [];
  }
  add(entity) { this.entities.push(entity); return entity; }
  remove(entity) { this.entities = this.entities.filter(e => e !== entity); }
  update(dt, game) {
    for (const sys of this.systems) sys.update?.(dt, this, game);
    for (const e of this.entities) e.update?.(dt, this, game);
  }
  render(ctx) {
    for (const e of this.entities) e.render?.(ctx);
  }
}

export class Entity {
  constructor(opts = {}) {
    this.x = opts.x || 0;
    this.y = opts.y || 0;
    this.vx = opts.vx || 0;
    this.vy = opts.vy || 0;
    this.w = opts.w || 32;
    this.h = opts.h || 32;
    this.color = opts.color || "#fff";
    this.meta = opts.meta || {};
  }
  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }
  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.w/2, this.y - this.h/2, this.w, this.h);
  }
}

export class Sprite extends Entity {
  constructor(opts={}) {
    super(opts);
    this.radius = opts.radius ?? Math.min(this.w, this.h) / 2;
    this.drawMode = opts.drawMode || "circle"; // circle | rect | image
    this.image = opts.image || null;
  }
  render(ctx) {
    if (this.drawMode === "image" && this.image) {
      ctx.drawImage(this.image, this.x - this.w/2, this.y - this.h/2, this.w, this.h);
      return;
    }
    if (this.drawMode === "circle") {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      ctx.fill();
    } else {
      super.render(ctx);
    }
  }
}

class Input {
  constructor() {
    this.keys = {};
    this.mouse = { x:0, y:0, down:false };
    window.addEventListener("keydown", (e) => this.keys[e.code] = true);
    window.addEventListener("keyup", (e) => this.keys[e.code] = false);
    window.addEventListener("mousemove", (e) => {
      const rect = document.querySelector("canvas")?.getBoundingClientRect();
      if (rect) {
        this.mouse.x = (e.clientX - rect.left) * (e.target.width / rect.width);
        this.mouse.y = (e.clientY - rect.top) * (e.target.height / rect.height);
      } else {
        this.mouse.x = e.clientX; this.mouse.y = e.clientY;
      }
    });
    window.addEventListener("mousedown", () => this.mouse.down = true);
    window.addEventListener("mouseup", () => this.mouse.down = false);
  }
  isKey(code){ return !!this.keys[code]; }
}

export { Input };
