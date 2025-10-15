import express from "express";
import fs from "fs";
const app = express();
app.use(express.json());
app.use(express.static("public"));

// simulasi AI lokal
app.post("/api/ai-generate", (req, res) => {
  const prompt = req.body.prompt.toLowerCase();
  let result = { objects: [], code: "" };

  if (prompt.includes("bola")) {
    result.objects = [
      { type: "ball", x: 200, y: 100, color: "orange" },
      { type: "floor", x: 0, y: 520, w: 960, h: 20, color: "gray" }
    ];
    result.code = `
      let vy=2;
      function update(){
        ball.y += vy;
        if(ball.y+20>floor.y){vy*=-0.9; ball.y=floor.y-20;}
      }
    `;
  } else {
    result.objects = [{ type: "cube", x: 100, y: 100, color: "blue" }];
    result.code = "// default game logic";
  }

  res.json(result);
});

app.listen(3000, () => console.log("🌍 DSRT Engine v5 berjalan di http://localhost:3000"));
