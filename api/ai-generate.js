{
  "objects": [
    {"type": "ball", "x": 100, "y": 100, "color": "red"},
    {"type": "floor", "x": 0, "y": 520, "w": 960, "h": 20, "color": "gray"}
  ],
  "code": "function update(){ ball.y += velocityY; if(ball.y+20>floor.y){velocityY*=-0.8; ball.y=floor.y-20;} }"
}
