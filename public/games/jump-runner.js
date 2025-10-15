import { Scene, Sprite } from "../engine.js";

export default function JumpRunner(updateScore, soundOn) {
  const scene = new Scene();
  const player = new Sprite(150, 440, 20, "#ff6600");
  const groundY = 460;
  let gravity = 600;
  let score = 0;
  let jumping = false;

  const jumpSound = new Audio("./assets/jump.wav");
  const scoreSound = new Audio("./assets/score.wav");

  document.onkeydown = e => {
    if (e.code === "Space" && !jumping) {
      player.vy = -350;
      jumping = true;
      if (soundOn) jumpSound.play();
    }
  };

  player.update = dt => {
    player.vy += gravity * dt;
    player.y += player.vy * dt;
    if (player.y >= groundY) {
      player.y = groundY;
      player.vy = 0;
      jumping = false;
    }
  };

  // obstacle
  const obstacle = new Sprite(950, 460, 25, "#fff");
  obstacle.vx = -200;

  obstacle.update = dt => {
    obstacle.x += obstacle.vx * dt;
    if (obstacle.x < -25) {
      obstacle.x = 950;
      score++;
      updateScore(score);
      if (soundOn) scoreSound.play();
    }
    if (Math.abs(obstacle.x - player.x) < 30 && Math.abs(obstacle.y - player.y) < 30) {
      score = 0;
      updateScore(0);
    }
  };

  scene.add(player);
  scene.add(obstacle);
  return scene;
}
