const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const promptInput = document.getElementById("prompt");
const generateBtn = document.getElementById("generateBtn");
const scoreText = document.getElementById("score");
const installBtn = document.getElementById("installBtn");

let objects = [];
let customCode = "";
let score = 0;

generateBtn.onclick = async () => {
  const prompt = promptInput.value;
  if (!prompt) return alert("Masukkan perintah dulu!");

  const res = await fetch("/api/ai-generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();
  objects = data.objects;
  customCode = data.code;

  alert("✅ AI berhasil membuat dunia!");
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let obj of objects) {
    ctx.fillStyle = obj.color;
    if (obj.type === "ball") ctx.beginPath(), ctx.arc(obj.x, obj.y, 20, 0, Math.PI * 2), ctx.fill();
    if (obj.type === "floor") ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
    if (obj.type === "cube") ctx.fillRect(obj.x, obj.y, 40, 40);
  }
}

function update() {
  try {
    if (customCode) eval(customCode);
  } catch (err) {
    console.error("⚠️ Error di kode AI:", err);
  }
}

function loop() {
  draw();
  update();
  requestAnimationFrame(loop);
}

loop();

// Simulasi install tombol
installBtn.onclick = () => {
  alert("📲 Menginstal DSRT Arcade App ke perangkat...");
};
