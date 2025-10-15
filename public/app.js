import { DSRTGame } from "./engine.js";

const user = localStorage.getItem("user") || prompt("Masukkan nama pemain:");
localStorage.setItem("user", user);
document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("user");
  location.reload();
};

const game = new DSRTGame("gameCanvas");
const scoreDisplay = document.getElementById("scoreValue");
let currentScore = 0;
let soundOn = true;

async function fetchLeaderboard() {
  const res = await fetch("/api/leaderboard");
  const data = await res.json();
  const list = document.getElementById("leaderList");
  list.innerHTML = "";
  data.forEach((row, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${row.user} — ${row.score}`;
    list.appendChild(li);
  });
}

async function postScore(score) {
  await fetch("/api/leaderboard", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, score })
  });
  fetchLeaderboard();
}

async function loadGameList() {
  const games = ["bounce-ball", "jump-runner"];
  const nav = document.getElementById("gameList");
  nav.innerHTML = "";
  games.forEach(g => {
    const btn = document.createElement("button");
    btn.textContent = g;
    btn.onclick = () => loadGame(g);
    nav.appendChild(btn);
  });
}

async function loadGame(name) {
  const mod = await import(`./games/${name}.js`);
  const scene = mod.default(score => {
    currentScore = score;
    scoreDisplay.textContent = score;
    if (score % 5 === 0) postScore(score);
  }, soundOn);
  game.setScene(scene);
}

loadGameList();
loadGame("bounce-ball");
fetchLeaderboard();

// install as PWA
let deferredPrompt;
window.addEventListener("beforeinstallprompt", e => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById("installApp").style.display = "block";
});

document.getElementById("installApp").onclick = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "accepted") console.log("✅ App installed");
    deferredPrompt = null;
  }
};

// register SW
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
    }
