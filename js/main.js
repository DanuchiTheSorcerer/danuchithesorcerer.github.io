let map = [];
let mapHeight = 30;
let mapLength = 180;
let shouldMoveRight = false;
let shouldMoveLeft = false;
let shouldMoveUp = false;
let shouldMoveDown = false;
let nonAirTileDrawn = false

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

class Entity {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class Player extends Entity {
  constructor(x, y, name) {
    super(x, y)
    this.name = name
  }
}

const player = new Player(4,2, prompt("Enter Player Name"))


//Initiates the default map with sizes indicated by mapHeight and mapLength
//Initiates random "bushes" as b characters
for (let i = 0; i < mapHeight; i++) {
    map[i] = [];
    for (let j = 0; j < mapLength; j++) {
      if (Math.floor(Math.random() * 30)) {
      map[i][j] = "-";
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

  //keyboardHandler.pressedKeys = []

  if (shouldMoveRight) {
    player.x += 0.5
  }
  if (shouldMoveLeft) {
    player.x -= 0.5
  }
  if (shouldMoveDown) {
    player.y += 0.25
  }
  if (shouldMoveUp) {
    player.y -= 0.25
  }

  let rowDisplayValue = ""

  for (let i = 0; i < mapHeight; i++) {
      for (let j = 0;j < mapLength; j++) {
        for (let k = 0;k<3;k++) {
          if (i == Math.floor(player.y - 1 + k) && j == Math.floor(player.x - 1)) {
            rowDisplayValue = rowDisplayValue + "P"
            nonAirTileDrawn = true
          } else if (i == Math.floor(player.y - 1 + k) && j == Math.floor(player.x)) {
            rowDisplayValue = rowDisplayValue + "P"
            nonAirTileDrawn = true
          } else if (i == Math.floor(player.y - 1 + k) && j == Math.floor(player.x + 1)) {
            rowDisplayValue = rowDisplayValue + "P"
            nonAirTileDrawn = true
          } else if (i == Math.floor(player.y - 1 + k) && j == Math.floor(player.x + 2)) {
            rowDisplayValue = rowDisplayValue + "P"
            nonAirTileDrawn = true
          } else if (i == Math.floor(player.y - 1 + k) && j == Math.floor(player.x - 2)) {
            rowDisplayValue = rowDisplayValue + "P"
            nonAirTileDrawn = true
          }
        }
        //draw 
        if (!nonAirTileDrawn) {
          rowDisplayValue = rowDisplayValue + map[i][j]
        } else {
          nonAirTileDrawn = false
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
  tempVar = tempVar + " x:" + player.x + " y:" + player.y
  document.getElementById("console").textContent = tempVar
  requestAnimationFrame(drawMap)
}

