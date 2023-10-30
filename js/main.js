let map = [];
let mapHeight = Math.floor(window.innerHeight / 22);
let mapLength = Math.floor(window.innerWidth * 11 / 112);
let shouldMoveRight = false;
let shouldMoveLeft = false;
let shouldMoveUp = false;
let shouldMoveDown = false;
let nonAirTileDrawn = false
let console = "" 



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
  constructor(x, y, health, maxHealth) {
    this.x = x
    this.y = y
    this.health = health
    this.maxHealth = maxHealth
  }
}

class Player extends Entity {
  constructor(x, y, name, health, maxHealth) {
    super(x, y, health, maxHealth)
    this.name = name
  }
  move() {
    if (shouldMoveRight) {
      player.x += 0.25
    }
    if (shouldMoveLeft) {
      player.x -= 0.25
    }
    if (shouldMoveDown) {
      player.y += 0.25
    }
    if (shouldMoveUp) {
      player.y -= 0.25
    }
    if (player.x > mapLength - 2) {player.x = mapLength - 2} else if (player.x < 1) {player.x = 1}
    if (player.y > mapHeight - 2) {player.y = mapHeight - 2} else if (player.y < 1) {player.y = 1}
  }
}

const player = new Player(1,1, prompt("Enter Player Name"), 100, 100)


//Initiates the default map with sizes indicated by mapHeight and mapLength
//Initiates random "bushes" as b characters
for (let i = 0; i < mapHeight; i++) {
    map[i] = [];
    for (let j = 0; j < mapLength; j++) {
      map[i][j] = "-";
    }
}

//Update function (updates every frame)
function drawMap() {
  //handle key input as player movement
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

  //update the player position
  player.move()

  //update the grid
  let rowDisplayValue = "" 
  for (let i = 0; i < mapHeight; i++) {
      for (let j = 0;j < mapLength; j++) {
        if (i == 0 || j == 0 || i == mapHeight - 1 || j == mapLength - 1) {
          rowDisplayValue = rowDisplayValue + "0"
          nonAirTileDrawn = true
        } else if (i == Math.floor(player.y) && j == Math.floor(player.x)) {
          rowDisplayValue = rowDisplayValue + "P"
          nonAirTileDrawn = true
        }
        //draw dashes if the 
        if (!nonAirTileDrawn) {
          rowDisplayValue = rowDisplayValue + map[i][j]
        } else {
          nonAirTileDrawn = false
        }
      }
      document.getElementById("r" + i).textContent = rowDisplayValue;
      document.getElementById("r" + i).style.fontFamily = "SquareFont";
      document.getElementById("r" + i).style.fontSize = "10px";
      rowDisplayValue = ""
  }
  //
  console = ""
  console = console + "\r\n x:" + Math.floor(player.x) + " y:" + Math.floor(player.y)
  console = console + "\r\n Player Health " + player.health + "/" + player.maxHealth
  document.getElementById("console").textContent = console
  for (let i = 0; i < keyboardHandler.pressedKeys.length; i++) {console = console + keyboardHandler.pressedKeys[i]}
  requestAnimationFrame(drawMap)
}

