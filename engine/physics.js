// engine/physics.js
export const Physics = {
  gravity: 800, // px/s^2

  applyGravity(entity, dt) {
    if (entity.ignoreGravity) return;
    entity.vy += Physics.gravity * dt;
  },

  aabbCollision(a, b) {
    return !(a.x + a.w/2 < b.x - b.w/2 ||
             a.x - a.w/2 > b.x + b.w/2 ||
             a.y + a.h/2 < b.y - b.h/2 ||
             a.y - a.h/2 > b.y + b.h/2);
  },

  circleCollision(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const r = (a.radius ?? 0) + (b.radius ?? 0);
    return dx*dx + dy*dy <= r*r;
  },

  resolveAABB(a, b) {
    // simple separation by pushing a outside b along smallest axis
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const px = (a.w/2 + b.w/2) - Math.abs(dx);
    const py = (a.h/2 + b.h/2) - Math.abs(dy);
    if (px <= 0 || py <= 0) return;
    if (px < py) {
      a.x += dx < 0 ? -px : px;
      a.vx *= -0.6;
    } else {
      a.y += dy < 0 ? -py : py;
      a.vy *= -0.6;
    }
  }
};
