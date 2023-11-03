let map = [];
let mapHeight = 70;
let mapLength = 305;
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
for (let i = 0;i < mapHeight;i++) {
  walls[i]=[]
  for (let j = 0;j < mapLength;j++) {
    walls[i][j] = false
  }
}




function wallEditor(x1,y1,x2,y2,bool) {
  for (let i = y1;i < y2 + 1;i++) {
    for (let j = x1;j < x2 + 1;j++) {
      walls[i][j] = bool
    }
  }
}

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
  move() {
    if (walls[this.y][this.x - 1]) {
      canMoveLeft = false
    }
    if (canMoveLeft && shouldMoveLeft) {
      this.x -= 1
    }
    if (walls[this.y][this.x + 1]) {
      canMoveRight = false
    }
    if (canMoveRight && shouldMoveRight) {
      this.x += 1
    }
    if (walls[this.y+1][this.x]) {
      canMoveDown = false
    }
    if (canMoveDown && shouldMoveDown) {
      this.y += 1
    }
    if (walls[this.y - 1][this.x]) {
      canMoveUp = false
    }
    if (canMoveUp && shouldMoveUp) {
      this.y -= 1
    }
    canMoveDown = true
    canMoveUp = true
    canMoveRight = true
    canMoveLeft = true
    //clamp player movment inside of the box of 0's
    if (this.x > mapLength - 2) {this.x = mapLength - 2} else if (this.x < 1) {this.x = 1}
    if (this.y > mapHeight - 2) {this.y = mapHeight - 2} else if (this.y < 1) {this.y = 1}
  }
}

class Monster extends Entity {
  constructor(x, y, health, maxHealth, type) {
    super(x, y, health, maxHealth)
    this.type = type
  }
}

const zombie1 = new Monster(300,30,100,100,"zombie")

class Player extends Entity {
  constructor(x, y, name, health, maxHealth) {
    super(x, y, health, maxHealth)
    this.name = name
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
  zombie1.move()
  //update the grid
  let rowDisplayValue = "" 
  for (let i = 0; i < mapHeight; i++) {
      for (let j = 0;j < mapLength; j++) {
        if (!nonAirTileDrawn && (i == 0 || j == 0 || i == mapHeight - 1 || j == mapLength - 1)) {
          rowDisplayValue = rowDisplayValue + "0"
          nonAirTileDrawn = true
        } else if (!nonAirTileDrawn && i == player.y && j == player.x) {
          rowDisplayValue = rowDisplayValue + "P"
          nonAirTileDrawn = true
        } else if (!nonAirTileDrawn && walls[i][j]) {
          rowDisplayValue = rowDisplayValue + "#"
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

//------------------LEVEL EDITOR---------------------//
// NOTE
// BECAUSE I AM LAZY AND ASCCI CHARACTERS DONT REALLY GIVE ANY RESOLUTION, THESE PARAMETERS DO NOT
//SCALE WITH BIGGER OR SMALLER RESOLUTIONS. THIS IS CODED ON A TINY CHROMEBOOK SCREEN, SO YOU LIKELY
//ONLY HAVE TO ZOOM IN. FOR SCREENS SOMEHOW SMALLER THAN A CHROMEBOOK SCREEN, JUST GET A BIGGER MONITOR


wallEditor(100,1,100,68,true)
wallEditor(100,30,100,40,false)
wallEditor(20,1,20,20,true)