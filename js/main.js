let mapHeight = 73;  //36
let mapLength = 226;  //112
let nonAirTileDrawn = false
let console = "" 
let chat1 = ""
let chat2 = ""
let chat3 = ""

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
  constructor(x, y) {
    this.x = x
    this.y = y
    this.canMoveDown = true
    this.canMoveUp = true
    this.canMoveLeft = true
    this.canMoveRight = true
    this.shouldMoveDown = false
    this.shouldMoveUp = false
    this.shouldMoveRight = false
    this.shouldMoveLeft = false
    this.movementCooldown = 0
    this.abilityCooldown = 0
  }
  turn() {
    this.movementHanlder()
    //due to corner collisions being hard,collision handler also moves if needed and no collisions detected
    this.collissionHandler()
    
    this.canMoveDown = true
    this.canMoveUp = true
    this.canMoveRight = true
    this.canMoveLeft = true
    

    this.abilityHandler()
  }
  collissionHandler() {
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
  }
}

class Player extends Entity {
  constructor(x, y, name) {
    super(x, y)
    this.name = name
    this.lanterFuel = 2000
    this.health = 30
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
      this.movementCooldown = Math.floor(10 * Math.pow(0.95, this.lanterFuel))
    } else {
      this.movementCooldown -= 1
    }
  }
  abilityHandler() {
    if (this.x < 7 && this.x > 2 && this.y < 7 && this.y > 2) {
      this.lanterFuel += .01
      this.health += 0.01
    } else {
      this.lanterFuel -= .01
    }
    if (this.lanterFuel < 3.5) {
      this.lanterFuel = 4
      this.health -= 1
    } else if (this.lanterFuel > 2000) {
      this.lanterFuel = 2000
    }
    if (this.health < 0) {
      this.health = 0
    } else if (this.health > 30) {
      this.health = 30
    }
  }
}

const player = new Player(2,2, prompt("Enter Player Name"))

//Update function (updates every frame)
function drawMap() {
  //handle key input as player movement
  
  //update the player position
  player.turn()
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
        } else if (!nonAirTileDrawn && walls[i][j] && Math.sqrt(Math.pow(i - player.y,2)+  Math.pow(j - player.x,2)) <= player.lanterFuel) {
          rowDisplayValue = rowDisplayValue + "#"
          nonAirTileDrawn = true
        } else if (!nonAirTileDrawn && i < 7 && i > 2 && j < 7 && j > 2) {
          rowDisplayValue = rowDisplayValue + "C"
          nonAirTileDrawn = true
        } else if (!nonAirTileDrawn && i > 38 && i < 43 && j > 110 && j < 115) {
          rowDisplayValue = rowDisplayValue + "C"
          nonAirTileDrawn = true
        }
        //draw dashes if the 
        if (!nonAirTileDrawn && Math.sqrt(Math.pow(i - player.y,2)+  Math.pow(j - player.x,2)) >= player.lanterFuel) {
          rowDisplayValue = rowDisplayValue + "o"
        } else if (!nonAirTileDrawn && Math.sqrt(Math.pow(i - player.y,2)+  Math.pow(j - player.x,2)) <= player.lanterFuel) {
          rowDisplayValue = rowDisplayValue + "."
        } else {
          nonAirTileDrawn = false
        }
      }
      document.getElementById("r" + i).textContent = rowDisplayValue;
      document.getElementById("r" + i).style.fontFamily = "SquareFont";
      document.getElementById("r" + i).style.fontSize = "6px";
      rowDisplayValue = ""
  }

  
  //console update
  console = ""
  console = console + "Health: " + Math.floor(player.health)
  document.getElementById("console").textContent = console
  for (let i = 0; i < keyboardHandler.pressedKeys.length; i++) {console = console + keyboardHandler.pressedKeys[i]}
  document.getElementById("chat1").textContent = chat1
  document.getElementById("chat2").textContent = chat2
  document.getElementById("chat3").textContent = chat3
  requestAnimationFrame(drawMap)
}


function chatMessageAdder(message) {
  chat3 = chat2
  chat2 = chat1
  chat1 = message
}

//------------------LEVEL EDITOR---------------------//
// NOTE
// BECAUSE I AM LAZY AND ASCCI CHARACTERS DONT REALLY GIVE ANY RESOLUTION, THESE PARAMETERS DO NOT
//SCALE WITH BIGGER OR SMALLER RESOLUTIONS. THIS IS CODED ON A TINY CHROMEBOOK SCREEN, SO YOU LIKELY
//ONLY HAVE TO ZOOM IN. FOR SCREENS SOMEHOW SMALLER THAN A CHROMEBOOK SCREEN, JUST GET A BIGGER MONITOR



//RANDOM GENERATED MAP LETS GOOOOO, this probably wont work
class mazeCell {
  constructor() {
    this.up = false
    this.down = false
    this.right = false
    this.left = false
  }
}

function randomGeneration() {

  for (let i = 1;i < 25;i++) {
    wallEditor(i * 9, 1, i * 9, 71, true)
  }

  for (let i = 1; i < 8; i++) {
    wallEditor(1, i * 9, 224, i * 9, true)
  }

  wallEditor(0, 0, 0, 72, true)
  wallEditor(225, 0, 225, 72, true)
  wallEditor(0, 0, 225, 0, true)
  wallEditor(0, 72, 225, 72, true)
  var randomMaze = []
  for (let i = 0;i < 26;i++) {
    randomMaze[i] = []
    for (let j = 0;j < 8;j++) {
      randomMaze[i][j] = new mazeCell()
    }
  }
  //generate path starting at 0 , 0
  generatePath(0,0,randomMaze)
  //now clear the walls where there arent connections
  for (let i = 0;i < 26;i++) {
    for (let j = 0;j < 8;j++) {
      if (randomMaze[i][j].right) {
        wallEditor(9 + 9 * i, 1 + 9 * j, 9 + 9 * i, 8 + 9 * j)
      }
      if (randomMaze[i][j].down) {
        wallEditor(1 + 9 * i, 9 + 9 * j, 8 + 9 * i, 9 + 9 * j)
      }
    }
  }
  chatMessageAdder("Maze Randomly Generated!")
}

function generatePath(x,y,randomMaze) {
  var freeCells = []
  if (x + 1 >= 0 && x + 1 <= 24) {
    if (!randomMaze[x + 1][y].up && !randomMaze[x + 1][y].right && !randomMaze[x + 1][y].down && !randomMaze[x + 1][y].left) {
      freeCells.push({xVar:1,yVar:0})
    }
  }
  if (x - 1 >=0 && x - 1 <= 24) {
    if (!randomMaze[x - 1][y].up && !randomMaze[x - 1][y].right && !randomMaze[x - 1][y].down && !randomMaze[x - 1][y].left) {
      freeCells.push({xVar:-1,yVar:0})
    }
  }
  if (y + 1 >= 0 && y + 1 <= 7) {
    if (!randomMaze[x][y + 1].up && !randomMaze[x][y + 1].right && !randomMaze[x][y + 1].down && !randomMaze[x][y + 1].left) {
      freeCells.push({xVar:0,yVar:1})
    }
  }
  if (y - 1 >= 0 && y - 1 <= 7) {
    if (!randomMaze[x][y - 1].up && !randomMaze[x][y - 1].right && !randomMaze[x][y - 1].down && !randomMaze[x][y - 1].left) {
      freeCells.push({xVar:0,yVar:-1})
    }
  }
  if (freeCells.length == 0) {
    freeCells = []
    //alert("Dead end")
    let huntedCell = findAvailibleHuntCell(randomMaze)
    //alert(huntedCell.x + " " + huntedCell.y)
    
    if (huntedCell !== "finished") {
      //alert("failed")
      generatePath(huntedCell.x,huntedCell.y,randomMaze)
    }
  } else {
    let randomlySelectedSquare = freeCells[Math.floor(Math.random() * freeCells.length)]
    freeCells = []
    if (randomlySelectedSquare.xVar == 1) {
      randomMaze[x][y].right = true
      randomMaze[x + randomlySelectedSquare.xVar][y + randomlySelectedSquare.yVar].left = true
    } else if (randomlySelectedSquare.xVar == -1) {
      randomMaze[x][y].left = true
      randomMaze[x + randomlySelectedSquare.xVar][y + randomlySelectedSquare.yVar].right = true
    } else if (randomlySelectedSquare.yVar == 1) {
      randomMaze[x][y].down = true
      randomMaze[x + randomlySelectedSquare.xVar][y + randomlySelectedSquare.yVar].up = true
    } else if (randomlySelectedSquare.yVar == -1) {
      randomMaze[x][y].up = true
      randomMaze[x + randomlySelectedSquare.xVar][y + randomlySelectedSquare.yVar].down = true
    }
    //alert((x + randomlySelectedSquare.xVar) + " " + (y + randomlySelectedSquare.yVar))
    generatePath(x + randomlySelectedSquare.xVar,y + randomlySelectedSquare.yVar,randomMaze)
  }
}

function findAvailibleHuntCell(randomMaze) {
  for (let i = 0;i < 26;i++) {
    for (let j = 0;j < 8;j++) {
      //alert(i + " " + j)
      if (i + 1 >= 0 && i + 1 <= 24) {
        if (!randomMaze[i + 1][j].up && !randomMaze[i + 1][j].right && !randomMaze[i + 1][j].down && !randomMaze[i + 1][j].left) {
          return {x:i,y:j}
        }
      }
      if (i - 1 >= 0 && i - 1 <= 24) {
        if (!randomMaze[i - 1][j].up && !randomMaze[i - 1][j].right && !randomMaze[i - 1][j].down && !randomMaze[i - 1][j].left) {
          return {x:i,y:j}
        }
      }
      if (j - 1 >= 0 && j - 1 <= 7) {
        if (!randomMaze[i][j - 1].up && !randomMaze[i][j - 1].right && !randomMaze[i][j - 1].down && !randomMaze[i][j - 1].left) {
          return {x:i,y:j}
        }
      }
      if (j + 1 >= 0 && j + 1 <=7) {
        if (!randomMaze[i][j + 1].up && !randomMaze[i][j + 1].right && !randomMaze[i][j + 1].down && !randomMaze[i][j + 1].left) {
          return {x:i,y:j}
        }
      }
    }
  }
  //alert("finishing")
  return "finished"
}