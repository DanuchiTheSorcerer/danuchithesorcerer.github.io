let map = [];
let mapHeight = Math.floor(window.innerHeight * 4 / 22);
let mapLength = Math.floor(window.innerWidth * 44 / 112);
let shouldMoveRight = false;
let shouldMoveLeft = false;
let shouldMoveUp = false;
let shouldMoveDown = false;
let nonAirTileDrawn = false
let console = "" 
let canMoveUp = true
let canMoveDown = true
let canMoveLeft = true
let canMoveRight = true



let walls = []


function wallCreator(x1, y1, x2, y2) {
  //When using this function, make sure that x2 is larger than x1, even if your coordinate x
  //and y's dont acutally match up. It will still work.
  for (let i = x1;i < x2 + 1;i++) {
    for (let j = y1;j < y2 + 1; j++) {
      walls.push(new Wall(i, j))
    }
  }
}

class Wall {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

wallCreator(5, 5, 10, 10)

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
    for (let i = 0;i < walls.length;i++) {
      if (this.x - 1 == walls[i].x && this.y == walls[i].y) {
        canMoveLeft = false
      }
    }
    if (canMoveLeft && shouldMoveLeft) {
      this.x -= 1
    }
    for (let i = 0;i < walls.length;i++) {
      //check if player can move right
      if (this.x + 1 == walls[i].x && this.y == walls[i].y) {
        canMoveRight = false
      }
    }
    if (canMoveRight && shouldMoveRight) {
      this.x += 1
    }
    for (let i = 0;i < walls.length;i++) {
      if (this.y + 1 == walls[i].y && this.x == walls[i].x) {
        canMoveDown = false
      }
    }
    if (canMoveDown && shouldMoveDown) {
      this.y += 1
    }
    for (let i = 0;i < walls.length;i++) {
      if (this.y - 1 == walls[i].y && this.x == walls[i].x) {
        canMoveUp = false
      }
    }
    if (canMoveUp && shouldMoveUp) {
      this.y -= 1
    }
    canMoveDown = true
    canMoveUp = true
    canMoveRight = true
    canMoveLeft = true
    //clamp player movment inside of the box of 0's
    if (player.x > mapLength - 2) {player.x = mapLength - 2} else if (player.x < 1) {player.x = 1}
    if (player.y > mapHeight - 2) {player.y = mapHeight - 2} else if (player.y < 1) {player.y = 1}
  }
}

const player = new Player(1,1, prompt("Enter Player Name"), 100, 100)


//Initiates the default map with sizes indicated by mapHeight and mapLength
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
        for (let k = 0;k < walls.length;k++) {
          if (!nonAirTileDrawn && (i == 0 || j == 0 || i == mapHeight - 1 || j == mapLength - 1)) {
            rowDisplayValue = rowDisplayValue + "0"
            nonAirTileDrawn = true
          } else if (!nonAirTileDrawn && i == player.y && j == player.x) {
            rowDisplayValue = rowDisplayValue + "P"
            nonAirTileDrawn = true
          } else if (!nonAirTileDrawn && walls[k].x == j && walls[k].y == i) {
            rowDisplayValue = rowDisplayValue + "#"
            nonAirTileDrawn = true
          }
          //draw dashes if the 
          
        }
        if (!nonAirTileDrawn) {
          rowDisplayValue = rowDisplayValue + map[i][j]
        } else {
          nonAirTileDrawn = false
        }
      }
      document.getElementById("r" + i).textContent = rowDisplayValue;
      document.getElementById("r" + i).style.fontFamily = "SquareFont";
      document.getElementById("r" + i).style.fontSize = "2.5px";
      rowDisplayValue = ""
  }
  //
  console = ""
  console = console + "\r\n x:" + player.x + " y:" + player.y
  console = console + "\r\n Player Health " + player.health + "/" + player.maxHealth
  document.getElementById("console").textContent = console
  for (let i = 0; i < keyboardHandler.pressedKeys.length; i++) {console = console + keyboardHandler.pressedKeys[i]}
  requestAnimationFrame(drawMap)
}

