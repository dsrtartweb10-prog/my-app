const promptInput = document.getElementById("prompt");
const generateBtn = document.getElementById("generateBtn");
const voiceBtn = document.getElementById("voiceBtn");
const aiStatus = document.getElementById("ai-status");

async function aiGenerateGame(prompt) {
  aiStatus.textContent = "🧠 AI sedang berpikir...";
  const res = await fetch("/api/ai-generate", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ prompt })
  });
  const data = await res.json();
  aiStatus.textContent = "✅ Game berhasil dibuat!";
  window.objects = data.objects;
  window.aiCode = data.code;
  draw();
}

generateBtn.onclick = () => {
  const text = promptInput.value.trim();
  if (!text) return alert("Tulis dulu ide game-nya!");
  aiGenerateGame(text);
};

voiceBtn.onclick = () => {
  const rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  rec.lang = "id-ID";
  rec.start();
  rec.onresult = e => {
    promptInput.value = e.results[0][0].transcript;
    aiGenerateGame(promptInput.value);
  };
};
