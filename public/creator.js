const canvas = document.getElementById("editorCanvas");
const ctx = canvas.getContext("2d");
window.objects = [];

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!window.objects) return;
  window.objects.forEach(o => {
    ctx.fillStyle = o.color || "white";
    if (o.type === "floor" || o.type === "road") {
      ctx.fillRect(o.x, o.y, o.w, o.h);
    } else {
      ctx.beginPath();
      ctx.arc(o.x, o.y, 20, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}
