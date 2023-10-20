let map = [];
let mapHeight = 30;
let mapLength = 100;

for (let i = 0; i < mapHeight; i++) {
    map[i] = [];
    for (let j = 0; j < mapLength; j++) {
      map[i][j] = "#";
    }
}

map[10][10] = "P"

let rowDisplayValue = ""

for (let i = 0; i < mapHeight; i++) {
    for (let j = 0;j < mapLength; j++) {
        rowDisplayValue = rowDisplayValue + map[i][j]
    }
    document.getElementById("r" + i).textContent= rowDisplayValue;
    document.getElementById("r" + i).style.fontFamily = "Courier";
    rowDisplayValue = ""
}
