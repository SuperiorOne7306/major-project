// Major Project
// Michael Blushke
// Started Feb 10, 2021 - Finished ____________
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let numberOfEnemies;
let player;
let ally1;
let ally2;
let enemy1;
let enemy2;
let enemy3;
let chr1Red;
let chr2Blue;
let chr3Yellow;
let chr4Green;
let chrGoButton;
let halfHeight;
let halfWidth;
let enemyWidth;
let allyWidth;
let gameState = "menu";
let battleState = "turn";
let turnOrder = [];
let startButton;

function setup() {
  createCanvas(windowWidth, windowHeight);
  halfHeight = height/2;
  halfWidth = width/2;
  enemyWidth = width*(2/3);
  allyWidth = width/3;
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  numberOfEnemies = randomEncounter();
  //makeSprites();

  //make new buttons
  startButton = new Button("START", 25, "white", "black", width/5, height/10, width/2, height/1.5);
}

function draw() {
  background(220);
  if (gameState === "menu") {
    menuDisplay();
  }

  if (gameState === "allySelect") {
    chrSelDisplay();
  }
  
  if (gameState === "battle") {
    displaySquares();
  }
 
}

class Sprite {
  constructor(health, team, color, sizeX, sizeY, x, y, agility){
    this.health = health;
    this.team = team;
    this.color = color;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.x = x;
    this.y = y;
    this.agility = agility;
  }

  display() {
    if (this.health > 0) {
      fill(this.color);
      
      rect(this.x, this.y, this.sizeX, this.sizeY);
    }
  }
}

class Button {
  constructor(txt, txtSize, buttonColor, txtColor, buttonWidth, buttonHeight, buttonX, buttonY){
    this.txt = txt;
    this.txtSize = txtSize;
    this.buttonColor = buttonColor;
    this.txtColor = txtColor;
    this.buttonWidth = buttonWidth;
    this.buttonHeight = buttonHeight;
    this.buttonX = buttonX;
    this.buttonY = buttonY;
  }

  display() {
    fill(this.buttonColor);
    rect(this.buttonX, this.buttonY, this.buttonWidth, this.buttonHeight);
    textSize(this.txtSize);
    fill(this.txtColor);
    text(this.txt, this.buttonX, this.buttonY);
  }

  mouseOver() {
    return mouseX > this.buttonX - this.buttonWidth/2 && mouseX < this.buttonX + this.buttonWidth/2 && 
      mouseY > this.buttonY - this.buttonHeight/2 && mouseY < this.buttonY + this.buttonHeight/2;
  }
}

function menuDisplay() {
  //title
  fill("black");
  textSize(25);
  text("*Title Here*", width/2, height/3);

  //display start button
  startButton.display();
}

function chrSelDisplay() {
  chr1Red.display();
  chr2Blue.display();
  chr3Yellow.display();
  chr4Green.display();
  chrGoButton.display();
}

function keyPressed() {
  if (gameState === "battle") {
    if (key === "q") {
      enemy1.health -= 20;
    }
    if (numberOfEnemies >= 2) {
      if (key === "w") {
        enemy2.health -= 20;
      }
    }
    if (numberOfEnemies === 3) {
      if (key === "e") {
        enemy3.health -= 20;
      }
    }
    if (key === "a") {
      player.health -= 20;
    }
    if (key === "s") {
      ally1.health -= 20;
    }
    if (key === "d") {
      ally2.health -= 20;
    }
    if (key === "b") {
      gameState = "menu";
      resetBattle();
    }
    console.log(player.health);
    console.log(enemy1.health);
    console.log(enemy2.health);
    console.log(enemy3.health);
  }
}

function mousePressed() {
  if (gameState === "menu") {
    //start button to character select
    if (startButton.mouseOver()) {
      gameState = "allySelect";
      chr1Red = new Button("Ann: Fire/Magic", 20, "white", "red", 150, 150, width/3, height/3);
      chr2Blue = new Button("Yusuke: Ice/Physical", 20, "white", "blue", 150, 150, width/3, height*(2/3));
      chr3Yellow = new Button("Ryuji: Elec/Physical", 20, "white", "yellow", 150, 150, width*(2/3), height/3);
      chr4Green = new Button("Mona: Wind/Magic", 20, "white", "green", 150, 150, width*(2/3), height*(2/3));
      chrGoButton = new Button("GO", 25, "white", "black", width/7, height/10, width/2, height*(1/4));
    }
  }

  //character select options/buttons
  if (gameState === "allySelect") {
    if (chr1Red.mouseOver()) {
      chr1Red.buttonColor = "black";
      if (chr2Blue.buttonColor === "black") {
        chr2Blue.buttonColor = "white";
      }
    }
    if (chr2Blue.mouseOver()) {
      chr2Blue.buttonColor = "black";
      if (chr1Red.buttonColor === "black") {
        chr1Red.buttonColor = "white";
      }
    }
    if (chr3Yellow.mouseOver()) {
      chr3Yellow.buttonColor = "black";
      if (chr4Green.buttonColor === "black") {
        chr4Green.buttonColor = "white";
      }
    }
    if (chr4Green.mouseOver()) {
      chr4Green.buttonColor = "black";
      if (chr3Yellow.buttonColor === "black") {
        chr3Yellow.buttonColor = "white";
      }
    }
    if (chrGoButton.mouseOver()) {
      if ((chr1Red.buttonColor === "black" || chr2Blue.buttonColor === "black") && 
      (chr3Yellow.buttonColor === "black" || chr4Green.buttonColor === "black")) {
        makeSprites();
        gameState = "battle";
      }
    }
  }
}

function displaySquares() {
  //show player/allies
  player.display();
  ally1.display();
  ally2.display();

  //show 1 enemy
  if (numberOfEnemies === 1) {
    enemy1.display();
  }
  //show 2 enemies
  else if (numberOfEnemies === 2) {
    enemy1.display();
    enemy2.display();
  }
  //show 3 enemies
  else if (numberOfEnemies === 3) {
    enemy1.display();
    enemy2.display();
    enemy3.display();
  }
}

function randomEncounter() {
  let enemies;
  let choice = random(0, 100);
  if (choice >= 0 && choice < 25) {
    enemies = 1;
  }
  else if (choice >= 25 && choice < 75) {
    enemies = 2;
  }
  else if (choice >= 75 && choice <= 100) {
    enemies = 3;
  }
  return enemies;
}

function makeSprites() {
  //allies
  player = new Sprite(200, "ally", "white", 100, 100, allyWidth, halfHeight, 10);

  if (chr1Red.buttonColor === "black") {
    ally1 = new Sprite(200, "ally", "red", 100, 100, allyWidth, height/4, 7);
  }
  if (chr2Blue.buttonColor === "black") {
    ally1 = new Sprite(250, "ally", "blue", 100, 100, allyWidth, height/4, 8);
  }

  if (chr3Yellow.buttonColor === "black") {
    ally2 = new Sprite(300, "ally", "yellow", 100, 100, allyWidth, height*0.75, 5);
  }
  if (chr4Green.buttonColor === "black") {
    ally2 = new Sprite(200, "ally", "green", 100, 100, allyWidth, height*0.75, 10);
  }

  //enemies
  if (numberOfEnemies === 1) {
    enemy1 = new Sprite(200, "enemy", "purple", 100, 100, enemyWidth, halfHeight, 7);
  }
  if (numberOfEnemies === 2) {
    enemy1 = new Sprite(200, "enemy", "purple", 100, 100, enemyWidth, height/3, 7);
    enemy2 = new Sprite(200, "enemy", "purple", 100, 100, enemyWidth, height*(2/3), 6);
  }
  if (numberOfEnemies === 3) {
    enemy1 = new Sprite(200, "enemy", "purple", 100, 100, enemyWidth, height/4, 7);
    enemy2 = new Sprite(200, "enemy", "purple", 100, 100, enemyWidth, halfHeight, 6);
    enemy3 = new Sprite(200, "enemy", "purple", 100, 100, enemyWidth, height*0.75, 5);
  }
}

function determineTurnOrder() {

}

function resetBattle() {
  numberOfEnemies = randomEncounter();
  makeSprites();
}