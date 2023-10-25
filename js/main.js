let map = [];
let mapHeight = 30;
let mapLength = 180;
let playerX = 0;
let playerY = 0;
let shouldMoveRight = false;
let shouldMoveLeft = false;
let shouldMoveUp = false;
let shouldMoveDown = false;

class KeyboardHandler {
  pressedKeys = []
  constructor() {
    window.addEventListener("keydown", event => this.pressedKeys.push(event.code))
    window.addEventListener("keyup", event => this.pressedKeys.splice(this.pressedKeys.indexOf(event.code), 1))
  }
  getKeys(param) {
    return this.pressedKeys.indexOf(param) != -1;
  }
}

const keyboardHandler = new KeyboardHandler()


//Initiates the default map with sizes indicated by mapHeight and mapLength
//Initiates random "bushes" as b characters
for (let i = 0; i < mapHeight; i++) {
    map[i] = [];
    for (let j = 0; j < mapLength; j++) {
      if (Math.floor(Math.random() * 30)) {
      map[i][j] = "#";
      } else {
      map[i][j] = "b"
      }
    }
}

//DRAW THE MAP
function drawMap() {
  if (keyboardHandler.getKeys("KeyA")) {
    shouldMoveLeft = true;
  } else {
    shouldMoveLeft = false;
  }
  if (keyboardHandler.getKeys("KeyD")) {
    shouldMoveRight = true;
  } else {
    shouldMoveRight = false;
  }
  if (keyboardHandler.getKeys("KeyS")) {
    shouldMoveDown = true;
  } else {
    shouldMoveDown = false;
  }
  if (keyboardHandler.getKeys("KeyW")) {
    shouldMoveUp = true;
  } else {
    shouldMoveUp = false;
  }

  if (shouldMoveRight) {
    playerX += 1
  }
  if (shouldMoveLeft) {
    playerX -= 1
  }
  if (shouldMoveDown) {
    playerY += 1
  }
  if (shouldMoveUp) {
    playerY -= 1
  }

  let rowDisplayValue = ""

  for (let i = 0; i < mapHeight; i++) {
      for (let j = 0;j < mapLength; j++) {
          
          if (i == playerY && j == playerX) {
            rowDisplayValue = rowDisplayValue + "P"
          } else {
            rowDisplayValue = rowDisplayValue + map[i][j]
          }
      }
      document.getElementById("r" + i).textContent = rowDisplayValue;
      document.getElementById("r" + i).style.fontFamily = "Courier";
      document.getElementById("r" + i).style.fontSize = "10px";
      rowDisplayValue = ""
  }

  let tempVar = ""
  tempVar = ""
  for (let i = 0; i < keyboardHandler.pressedKeys.length; i++) {tempVar = tempVar + keyboardHandler.pressedKeys[i]}
  document.getElementById("console").textContent = tempVar
  requestAnimationFrame(drawMap)
}

