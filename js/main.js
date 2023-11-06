let map = [];
let mapHeight = 70;
let mapLength = 305;
let nonAirTileDrawn = false
let console = "" 




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
    this.canMoveDown = true
    this.canMoveUp = true
    this.canMoveLeft = true
    this.canMoveRight = true
    this.shouldMoveDown = false
    this.shouldMoveUp = false
    this.shouldMoveRight = false
    this.shouldMoveLeft = false
    this.movementCooldown = 0
  }
  move() {
    this.movementHanlder()

    if (walls[this.y][this.x - 1]) {
      this.canMoveLeft = false
    }
    if (this.canMoveLeft && this.shouldMoveLeft) {
      this.x -= 1
    }
    if (walls[this.y][this.x + 1]) {
      this.canMoveRight = false
    }
    if (this.canMoveRight && this.shouldMoveRight) {
      this.x += 1
    }
    if (walls[this.y+1][this.x]) {
      this.canMoveDown = false
    }
    if (this.canMoveDown && this.shouldMoveDown) {
      this.y += 1
    }
    if (walls[this.y - 1][this.x]) {
      this.canMoveUp = false
    }
    if (this.canMoveUp && this.shouldMoveUp) {
      this.y -= 1
    }
    this.canMoveDown = true
    this.canMoveUp = true
    this.canMoveRight = true
    this.canMoveLeft = true
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
  movementHanlder() {
    this.canMoveUp = true
    this.canMoveDown = true
    this.canMoveLeft = true
    this.canMoveRight = true
    this.shouldMoveRight = false;
    this.shouldMoveLeft = false;
    this.shouldMoveUp = false;
    this.shouldMoveDown = false;
    if (this.movementCooldown == 0) {
      if (this.x < player.x) {
        this.shouldMoveRight = true
      }
      if (this.x > player.x) {
        this.shouldMoveLeft = true
      }
      if (this.y > player.y) {
        this.shouldMoveUp = true
      }
      if (this.y < player.y) {
        this.shouldMoveDown = true
      }
      this.movementCooldown = 2
    } else {
      this.movementCooldown -= 1
    }
  }
}

const zombie1 = new Monster(300,30,100,100,"zombie")

class Player extends Entity {
  constructor(x, y, name, health, maxHealth) {
    super(x, y, health, maxHealth)
    this.name = name
  }
  movementHanlder() {
    this.canMoveUp = true
    this.canMoveDown = true
    this.canMoveLeft = true
    this.canMoveRight = true
    this.shouldMoveRight = false;
    this.shouldMoveLeft = false;
    this.shouldMoveUp = false;
    this.shouldMoveDown = false;
    if (keyboardHandler.getKeys("KeyA")) {
      this.shouldMoveLeft = true;
    } else {
      this.shouldMoveLeft = false;
    }
    if (keyboardHandler.getKeys("KeyD")) {
      this.shouldMoveRight = true;
    } else {
      this.shouldMoveRight = false;
    }
    if (keyboardHandler.getKeys("KeyS")) {
      this.shouldMoveDown = true;
    } else {
      this.shouldMoveDown = false;
    }
    if (keyboardHandler.getKeys("KeyW")) {
      this.shouldMoveUp = true;
    } else {
      this.shouldMoveUp = false;
    }
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
        } else if (!nonAirTileDrawn && i == zombie1.y && j == zombie1.x) {
          rowDisplayValue = rowDisplayValue + "Z"
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

  //deal damage and heal
  
  //console update
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