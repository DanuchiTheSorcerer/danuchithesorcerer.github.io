let map = [];
let mapHeight = Math.floor(window.innerHeight / 22);
let mapLength = Math.floor(window.innerWidth * 9/56);
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
      player.y += 0.125
    }
    if (shouldMoveUp) {
      player.y -= 0.125
    }
    if (player.x > mapLength - 1) {player.x = mapLength - 1} else if (player.x < 0) {player.x = 0}
    if (player.y > mapHeight - 1) {player.y = mapHeight - 1} else if (player.y < 0) {player.y = 0}
  }
}

const player = new Player(1,1, prompt("Enter Player Name"), 100, 100)


//Initiates the default map with sizes indicated by mapHeight and mapLength
//Initiates random "bushes" as b characters
for (let i = 0; i < mapHeight; i++) {
    map[i] = [];
    for (let j = 0; j < mapLength; j++) {
      if (Math.floor(Math.random() * 100 && map[i][j] == undefined)) {
        map[i][j] = "-";
      } else {
        map[i][j] = "b"
        //map[i + 1][j] = "b"
        //map[i - 1][j] = "b"
        //map[i][j] = "b"
        map[i][j + 1] = "b"
        map[i][j - 1] = "b"
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

  player.move()

  let rowDisplayValue = ""

  for (let i = 0; i < mapHeight; i++) {
      for (let j = 0;j < mapLength; j++) {
        if (i == Math.floor(player.y) && j == Math.floor(player.x)) {
          if (map[i][j] == "b") {
            rowDisplayValue = rowDisplayValue + "p"
          } else {
            rowDisplayValue = rowDisplayValue + "P"
          }
          nonAirTileDrawn = true
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
  console = ""
  console = console + "\r\n x:" + Math.floor(player.x) + " y:" + Math.floor(player.y)
  console = console + "\r\n Player Health " + player.health + "/" + player.maxHealth
  document.getElementById("console").textContent = console
  for (let i = 0; i < keyboardHandler.pressedKeys.length; i++) {console = console + keyboardHandler.pressedKeys[i]}
  requestAnimationFrame(drawMap)
}

