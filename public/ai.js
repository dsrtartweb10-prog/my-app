const promptInput = document.getElementById("prompt");
const generateBtn = document.getElementById("generateBtn");
const voiceBtn = document.getElementById("voiceBtn");
const aiStatus = document.getElementById("ai-status");

async function aiGenerateGame(prompt) {
  aiStatus.textContent = "🧠 AI sedang berpikir...";
  
  // contoh integrasi API lokal (nantinya bisa dihubungkan ke OpenAI/Replicate)
  const response = await fetch("/api/ai-generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();
  aiStatus.textContent = "✅ Game berhasil dibuat!";
  window.objects = data.objects;
  window.aiCode = data.code;
  draw();
}

// tombol generate
generateBtn.onclick = () => {
  const text = promptInput.value.trim();
  if (!text) return alert("Tulis dulu ide game-nya!");
  aiGenerateGame(text);
};

// voice input
voiceBtn.onclick = () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "id-ID";
  recognition.start();
  recognition.onresult = e => {
    promptInput.value = e.results[0][0].transcript;
    aiGenerateGame(promptInput.value);
  };
};
