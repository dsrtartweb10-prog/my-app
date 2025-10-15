import { Scene, Sprite } from "../engine.js";

export default function BounceBall(updateScore, soundOn) {
  const scene = new Scene();
  const ball = new Sprite(200, 200, 25, "#00ffff");
  ball.vx = 180;
  ball.vy = 130;
  let score = 0;

  const bounceSound = new Audio("./assets/bounce.wav");

  ball.update = function(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    if (this.x < 25 || this.x > 935) {
      this.vx *= -1;
      score++;
      updateScore(score);
      if (soundOn) bounceSound.play();
    }
    if (this.y < 25 || this.y > 515) {
      this.vy *= -1;
      score++;
      updateScore(score);
      if (soundOn) bounceSound.play();
    }
  };

  scene.add(ball);
  return scene;
}
