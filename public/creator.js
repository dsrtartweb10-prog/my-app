const canvas = document.getElementById("editorCanvas");
const ctx = canvas.getContext("2d");
let objects = [];

const toolboxBtns = document.querySelectorAll(".add-object");

toolboxBtns.forEach(btn => {
  btn.onclick = () => {
    const type = btn.dataset.type;
    const obj = { id: Date.now(), type, x: 100, y: 100, color: randomColor() };
    objects.push(obj);
    draw();
  };
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  objects.forEach(o => {
    ctx.fillStyle = o.color;
    ctx.beginPath();
    ctx.arc(o.x, o.y, 20, 0, Math.PI * 2);
    ctx.fill();
  });
}

// drag and drop
let dragging = null;
canvas.onmousedown = e => {
  const x = e.offsetX, y = e.offsetY;
  dragging = objects.find(o => Math.hypot(o.x - x, o.y - y) < 20);
};
canvas.onmousemove = e => {
  if (dragging) {
    dragging.x = e.offsetX;
    dragging.y = e.offsetY;
    draw();
  }
};
canvas.onmouseup = () => dragging = null;

document.getElementById("saveGame").onclick = () => {
  const name = document.getElementById("gameName").value || "untitled";
  const code = document.getElementById("codeEditor").value;
  const data = { name, objects, code };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${name}.json`;
  a.click();
  alert("✅ Game tersimpan sebagai file JSON");
};

document.getElementById("testGame").onclick = () => {
  const code = document.getElementById("codeEditor").value;
  try {
    new Function(code)();
    alert("✅ Script berhasil dijalankan!");
  } catch (err) {
    alert("❌ Error script: " + err.message);
  }
};

document.getElementById("exportGame").onclick = () => {
  alert("📦 Fitur export ZIP akan diaktifkan (v4.1)");
};

function randomColor() {
  return `hsl(${Math.random() * 360}, 80%, 60%)`;
                         }
