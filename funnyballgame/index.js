let levels = ["Easy 1", "Easy 2", "Easy 3", "Easy 4", "Easy 5", "Easy 6"];
let levelsShorthand = ["e1", "e2", "e3", "e4", "e5", "e6"];
let level = "e1";
let finish = false;
let oldState;
let playerSize = 20;
let speed = 5;
let mouseX = 0;
let mouseY = 0;
let clickX = 0;
let clickY = 0;
let playerX = 0;
let playerY = 0;
let state = 0;
let hitFlags = [];
let arrowRight = new Image();
arrowRight.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'%3E%3Cpath fill='%23ffffff' d='m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z'/%3E%3C/svg%3E";
let arrowLeft = new Image();
arrowLeft.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24' transform='rotate(180)'%3E%3Cpath fill='%23ffffff' d='m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z'/%3E%3C/svg%3E";
let arrowUp = new Image();
arrowUp.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24' transform='rotate(270)'%3E%3Cpath fill='%23ffffff' d='m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z'/%3E%3C/svg%3E";
let arrowDown = new Image();
arrowDown.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24' transform='rotate(90)'%3E%3Cpath fill='%23ffffff' d='m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z'/%3E%3C/svg%3E";
let restartBtn = new Image();
restartBtn.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'%3E%3Cpath fill='%23ffffff' d='M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z'/%3E%3C/svg%3E";
let home = new Image();
home.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'%3E%3Cpath fill='%23ffffff' d='M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z'/%3E%3C/svg%3E";

// state: 0 = main page, 1 = levels page, -1 = level
var frameTime = 0,
  lastLoop = new Date(),
  thisLoop;
let currentTime,
  firstTime = new Date();
var filterStrength = 20;
let keyUp,
  keyDown,
  keyLeft,
  keyRight,
  restart = false;
let curLevel;
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "#111111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    stateHandler();
    if (state == -1) {
      drawLevel(ctx);
      handleInput(canvas);
      drawPlayer(ctx);
      timer(ctx);
      controls(ctx);
    }
    if (state == 0) {
      loadMainPage(ctx);
    }
    if (state == 1) {
      loadLevelsPage(ctx);
    }

    var thisFrameTime = (thisLoop = new Date()) - lastLoop;
    frameTime += (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;
    if (restart) {
      restart = false;
    }
  }
  setInterval(draw, 1000 / 30);

  setInterval(function () {
    // console.log((1000 / frameTime).toFixed(1) + " fps");
  }, 1000);
});
function drawPlayer(ctx) {
  ctx.beginPath();
  ctx.arc(playerX, playerY, playerSize, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
function timer(ctx) {
  if (!finish) {
    if (restart) {
      time = 0;
    }
    time = Math.round(time + 1000 / 30);
  }
  ctx.fillStyle = "#00000088";
  ctx.font = "bold 30px Arial";
  ctx.fillRect(5, 5, ctx.measureText(time / 1000).width + 10, 30);
  ctx.fillStyle = "white";
  ctx.fillText(time / 1000, 10, 30);
}
async function drawLevel(ctx) {
  if (!curLevel || !(curLevel["levelName"] == level)) {
    await downloadLevel();
    restart = true;
  }
  if (!(curLevel.then && typeof curLevel.then === "function")) {
    for (let i = 0; i < curLevel["levelData"]["rectangles"].length; i++) {
      ctx.fillStyle = "red";
      v1 = curLevel["levelData"]["rectangles"][i][0];
      v2 = curLevel["levelData"]["rectangles"][i][1];
      v3 = curLevel["levelData"]["rectangles"][i][2];
      v4 = curLevel["levelData"]["rectangles"][i][3];
      ctx.fillRect(v1, v2, v3, v4);
      if (RectCircleColliding({ x: playerX, y: playerY, r: playerSize }, { x: v1, y: v2, w: v3, h: v4 })) {
        restart = true;
      }
    }
    ctx.fillStyle = "blue";
    flag1 = curLevel["levelData"]["endFlag"][0];
    flag2 = curLevel["levelData"]["endFlag"][1];
    flag3 = curLevel["levelData"]["endFlag"][2];
    flag4 = curLevel["levelData"]["endFlag"][3];
    ctx.fillRect(flag1, flag2, flag3, flag4);
    if (RectCircleColliding({ x: playerX, y: playerY, r: playerSize }, { x: flag1, y: flag2, w: flag3, h: flag4 })) {
      finish = true;
    }
  }
  if (curLevel["levelData"]["teleportPortal"]) {
    for (let i = 0; i < curLevel["levelData"]["teleportPortal"].length; i++) {
      ctx.fillStyle = "green";
      v1 = curLevel["levelData"]["teleportPortal"][i][0][0];
      v2 = curLevel["levelData"]["teleportPortal"][i][0][1];
      v3 = curLevel["levelData"]["teleportPortal"][i][0][2];
      v4 = curLevel["levelData"]["teleportPortal"][i][0][3];
      ctx.fillRect(v1, v2, v3, v4);
      if (RectCircleColliding({ x: playerX, y: playerY, r: playerSize }, { x: v1, y: v2, w: v3, h: v4 })) {
        playerX = curLevel["levelData"]["teleportPortal"][0][2][0];
        playerY = curLevel["levelData"]["teleportPortal"][0][2][1];
      }
      v1 = curLevel["levelData"]["teleportPortal"][i][1][0];
      v2 = curLevel["levelData"]["teleportPortal"][i][1][1];
      v3 = curLevel["levelData"]["teleportPortal"][i][1][2];
      v4 = curLevel["levelData"]["teleportPortal"][i][1][3];
      ctx.fillRect(v1, v2, v3, v4);
      if (RectCircleColliding({ x: playerX, y: playerY, r: playerSize }, { x: v1, y: v2, w: v3, h: v4 })) {
        playerX = curLevel["levelData"]["teleportPortal"][0][2][0];
        playerY = curLevel["levelData"]["teleportPortal"][0][2][1];
      }
    }
  }
  for (let i = 0; i < curLevel["levelData"]["endFlag"].length; i++) {
    if (hitFlags.includes(i)) {
      ctx.fillStyle = "darkblue";
    } else {
      ctx.fillStyle = "blue";
    }
    flag1 = curLevel["levelData"]["endFlag"][i][0];
    flag2 = curLevel["levelData"]["endFlag"][i][1];
    flag3 = curLevel["levelData"]["endFlag"][i][2];
    flag4 = curLevel["levelData"]["endFlag"][i][3];
    ctx.fillRect(flag1, flag2, flag3, flag4);
    if (RectCircleColliding({ x: playerX, y: playerY, r: playerSize }, { x: flag1, y: flag2, w: flag3, h: flag4 }) && !hitFlags.includes(i)) {
      hitFlags.push(i);
      if (hitFlags.length == curLevel["levelData"]["endFlag"].length) {
        finish = true;
      }
    }
  }
}
document.addEventListener("keydown", (e) => {
  if (e.key == "w" || e.key == "ArrowUp") {
    keyUp = true;
  }
  if (e.key == "s" || e.key == "ArrowDown") {
    keyDown = true;
  }
  if (e.key == "a" || e.key == "ArrowLeft") {
    keyLeft = true;
  }
  if (e.key == "d" || e.key == "ArrowRight") {
    keyRight = true;
  }
  if (e.key == "r") {
    restart = true;
  }
});
document.addEventListener("keyup", (e) => {
  if (e.key == "w" || e.key == "ArrowUp") {
    keyUp = false;
  }
  if (e.key == "s" || e.key == "ArrowDown") {
    keyDown = false;
  }
  if (e.key == "a" || e.key == "ArrowLeft") {
    keyLeft = false;
  }
  if (e.key == "d" || e.key == "ArrowRight") {
    keyRight = false;
  }
});

function handleInput(canvas) {
  if (restart && curLevel) {
    playerX = curLevel["levelData"]["startPos"][0] ?? 0;
    playerY = curLevel["levelData"]["startPos"][1] ?? 0;
    hitFlags = [];
    finish = false;
  }
  if (!finish) {
    if (keyUp) {
      playerY = playerY -= speed;
    }
    if (keyDown) {
      playerY = playerY += speed;
    }
    if (keyLeft) {
      playerX = playerX -= speed;
    }
    if (keyRight) {
      playerX = playerX += speed;
    }
    if (playerY > canvas.height - playerSize) {
      playerY = canvas.height - playerSize;
    }
    if (playerY < playerSize) {
      playerY = playerSize;
    }
    if (playerX > canvas.width - playerSize) {
      playerX = canvas.width - playerSize;
    }
    if (playerX < playerSize) {
      playerX = playerSize;
    }
  }
}
async function downloadLevel() {
  let response = await fetch(`levels/${level}.json`);
  curLevel = await response.json();
}

function RectCircleColliding(circle, rect) {
  var distX = Math.abs(circle.x - rect.x - rect.w / 2);
  var distY = Math.abs(circle.y - rect.y - rect.h / 2);

  if (distX > rect.w / 2 + circle.r) {
    return false;
  }
  if (distY > rect.h / 2 + circle.r) {
    return false;
  }

  if (distX <= rect.w / 2) {
    return true;
  }
  if (distY <= rect.h / 2) {
    return true;
  }

  var dx = distX - rect.w / 2;
  var dy = distY - rect.h / 2;
  return dx * dx + dy * dy <= circle.r * circle.r;
}
function stateHandler() {
  if (!(state == oldState) && state == -1) {
    restart = true;
  }
  oldState = state;
}
function loadMainPage(ctx) {
  ctx.lineWidth = 5;
  ctx.fillStyle = "#101010";
  ctx.strokeStyle = "#7a7a7a";
  ctx.rect(150, 300, 300, 100);
  ctx.fill();
  ctx.stroke();
  ctx.font = "bold 50px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Levels", 220, 368);
  if (150 < clickX && clickX < 450 && 300 < clickY && clickY < 400) {
    state = 1;
  }
}

function loadLevelsPage(ctx) {
  ctx.lineWidth = 5;
  for (let i = 0; i < levels.length; i++) {
    ctx.fillStyle = "#101010";
    ctx.strokeStyle = "#7a7a7a";
    ctx.rect(50 + (i % 3) * 195, 50 + Math.floor(i / 3) * 150, 150, 100);
    ctx.fill();
    ctx.stroke();
    if (50 + (i % 3) * 195 < clickX && clickX < 200 + (i % 3) * 195 && 50 + Math.floor(i / 3) * 150 < clickY && clickY < 150 + Math.floor(i / 3) * 150) {
      state = -1;
      level = levelsShorthand[i];
    }
  }
  for (let i = 0; i < levels.length; i++) {
    ctx.font = "bold 40px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(levels[i], 60 + (i % 3) * 195, 115 + Math.floor(i / 3) * 150);
  }
}
document.addEventListener("mousedown", (e) => {
  clickX = e.clientX;
  clickY = e.clientY;
  if (580 < clickX && clickX < 640 && 0 < clickY && clickY < 60) {
    restart = true;
  }
  if (580 < clickX && clickX < 640 && 60 < clickY && clickY < 120) {
    state = 0;
  }
});
document.addEventListener("touchstart", (e) => {
  clickX = e.touches[0].clientX;
  clickY = e.touches[0].clientY;
  if (state == -1) {
    if (580 < clickX && clickX < 640 && 420 < clickY && clickY < 480) {
      keyRight = true;
    }
    if (480 < clickX && clickX < 540 && 420 < clickY && clickY < 480) {
      keyLeft = true;
    }
    if (530 < clickX && clickX < 590 && 370 < clickY && clickY < 430) {
      keyUp = true;
    }
    if (530 < clickX && clickX < 590 && 420 < clickY && clickY < 480) {
      keyDown = true;
    }
    if (580 < clickX && clickX < 640 && 0 < clickY && clickY < 60) {
      restart = true;
    }
    if (580 < clickX && clickX < 640 && 60 < clickY && clickY < 120) {
      state = 0;
    }
  }
});
document.addEventListener("touchend", (e) => {
  if (state == -1) {
    if (580 < clickX && clickX < 640 && 420 < clickY && clickY < 480) {
      keyRight = false;
    }
    if (480 < clickX && clickX < 540 && 420 < clickY && clickY < 480) {
      keyLeft = false;
    }
    if (530 < clickX && clickX < 590 && 370 < clickY && clickY < 430) {
      keyUp = false;
    }
    if (530 < clickX && clickX < 590 && 420 < clickY && clickY < 480) {
      keyDown = false;
    }
  }
});

function controls(ctx) {
  ctx.drawImage(arrowRight, 580, 420, 60, 60);
  ctx.drawImage(arrowLeft, 480, 420, 60, 60);
  ctx.drawImage(arrowUp, 530, 370, 60, 60);
  ctx.drawImage(arrowDown, 530, 420, 60, 60);
  ctx.drawImage(restartBtn, 580, 0, 60, 60);
  ctx.drawImage(home, 580, 60, 60, 60);
}
