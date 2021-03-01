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
let moveButton1;
let moveButton2;
let moveButton3;
let halfHeight;
let halfWidth;
let enemyWidth;
let allyWidth;
let gameState = "menu";
let battleState = "turn";
let turnState;
let turnOrder;
let startButton;
let turnRep = 0;
let exper;
let currentMove;
let moveNum;
let currentTarget;
let oldX;
let currentDamage;

function setup() {
  createCanvas(windowWidth, windowHeight);
  halfHeight = height/2;
  halfWidth = width/2;
  enemyWidth = width*(2/3);
  allyWidth = width/3;
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  

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
    exper.display();
    if (battleState === "turn") {
      moveButtonDisplay();
    }
  }

  if (gameState === "win") {
    displayWin();
  }
}
  

class Sprite {
  constructor(health, team, color, sizeX, sizeY, x, y, agility, isAlive){
    this.health = health;
    this.team = team;
    this.color = color;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.x = x;
    this.y = y;
    this.agility = agility;
    this.isAlive = isAlive;
  }

  display() {
    if (this.isAlive) {
      fill(this.color);
      
      rect(this.x, this.y, this.sizeX, this.sizeY);

      fill("black");

      text(this.health, this.x, this.y - 75);
    }
  }

  mouseOver() {
    return mouseX > this.x - this.sizeX/2 && mouseX < this.x + this.sizeX/2 && 
      mouseY > this.y - this.sizeY/2 && mouseY < this.y + this.sizeY/2;
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
  textSize(50);
  text("Cubrawl", width/2, height/3);

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
  if (gameState === "win" || gameState === "battle") {
    if (key === "b") {
      resetBattle();
    }
  }
}

function mousePressed() {
  if (gameState === "menu") {
    //start button to character select
    if (startButton.mouseOver()) {
      gameState = "allySelect";
      chr1Red = new Button("Fire/Magic", 20, "white", "red", 150, 150, width/3, height/3);
      chr2Blue = new Button("Ice/Physical", 20, "white", "blue", 150, 150, width/3, height*(2/3));
      chr3Yellow = new Button("Elec/Physical", 20, "white", "yellow", 150, 150, width*(2/3), height/3);
      chr4Green = new Button("Wind/Magic", 20, "white", "green", 150, 150, width*(2/3), height*(2/3));
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
        startBattle();
      }
    }
  }

  if (gameState === "battle") {
    if (battleState === "turn") {
      if (moveButton1.mouseOver()) {
        currentMove = moveButton1.txt;
        moveNum = 1;
        battleState = "target";
      }
      if (moveButton2.mouseOver()) {
        currentMove = moveButton2.txt;
        moveNum = 2;
        battleState = "target";
      }
      if (turnState === "player") {
        if (moveButton3.mouseOver()) {
          currentMove = moveButton3.txt;
          moveNum = 3;
          battleState = "target";
        }
      } 
    }
    if (battleState === "target") {
      if (enemy1.mouseOver()) {
        if (enemy1.isAlive) {
          currentTarget = "enemy1";
          battleState = "damage";
          executeMove();
        }
      }
    }
    if (numberOfEnemies >= 2) {
      if (enemy2.mouseOver()) {
        if (enemy2.isAlive) {
          currentTarget = "enemy2";
          battleState = "damage";
          executeMove();
        }
      }
    }
    if (numberOfEnemies === 3) {
      if (enemy3.mouseOver()) {
        if (enemy3.isAlive) {
          currentTarget = "enemy3";
          battleState = "damage";
          executeMove();
        }
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
  player = new Sprite(200, "ally", "white", 100, 100, allyWidth, halfHeight, 10, true);

  if (chr1Red.buttonColor === "black") {
    ally1 = new Sprite(200, "ally", "red", 100, 100, allyWidth, height/4, 7, true);
  }
  if (chr2Blue.buttonColor === "black") {
    ally1 = new Sprite(250, "ally", "blue", 100, 100, allyWidth, height/4, 8, true);
  }

  if (chr3Yellow.buttonColor === "black") {
    ally2 = new Sprite(300, "ally", "yellow", 100, 100, allyWidth, height*0.75, 5, true);
  }
  if (chr4Green.buttonColor === "black") {
    ally2 = new Sprite(200, "ally", "green", 100, 100, allyWidth, height*0.75, 10, true);
  }

  //enemies
  if (numberOfEnemies === 1) {
    enemy1 = new Sprite(200, "enemy", "purple", 100, 100, enemyWidth, halfHeight, 7, true);
  }
  if (numberOfEnemies === 2) {
    enemy1 = new Sprite(200, "enemy", "purple", 100, 100, enemyWidth, height/3, 7, true);
    enemy2 = new Sprite(200, "enemy", "purple", 100, 100, enemyWidth, height*(2/3), 6, true);
  }
  if (numberOfEnemies === 3) {
    enemy1 = new Sprite(200, "enemy", "purple", 100, 100, enemyWidth, height/4, 7, true);
    enemy2 = new Sprite(200, "enemy", "purple", 100, 100, enemyWidth, halfHeight, 6, true);
    enemy3 = new Sprite(200, "enemy", "purple", 100, 100, enemyWidth, height*0.75, 5, true);
  }
}

function determineTurnOrder() {
  turnOrder = [];
  for (let i=10; i > 0; i--) {
    if (player.agility === i) {
      turnOrder.push("player");
    }
    if (ally1.agility === i) {
      turnOrder.push("ally1");
    }
    if (ally2.agility === i) {
      turnOrder.push("ally2");
    }
    if (enemy1.agility === i) {
      turnOrder.push("enemy1");
    }
    if (numberOfEnemies === 2) {
      if (enemy2.agility === i) {
        turnOrder.push("enemy2");
      }
    }
    if (numberOfEnemies === 3) {
      if (enemy3.agility === i) {
        turnOrder.push("enemy3");
      }
    }
  }
}

function resetBattle() {
  gameState = "menu";
  turnRep = 0;
}

function startBattle() {
  numberOfEnemies = randomEncounter();
  makeSprites();
  determineTurnOrder();
  gameState = "battle";
  battleState = "turn";
  turnState = whoseTurn();
  exper = new Button (turnState, 15, "white", "black", 100, 50, halfWidth, height-30);
  moveButtons();
}

function whoseTurn() {
  if (turnRep >= turnOrder.length) {
    turnRep = 0;
  }
  return turnOrder[turnRep];
}

function moveButtons() {
  let mveBtnTxt1;
  let mveBtnTxt2;
  let mveBtnTxt3;
  if (turnState === "player") {
    if (ally1.color === "red") {
      mveBtnTxt1 = "Bufula";
    }
    if (ally1.color === "blue") {
      mveBtnTxt1 = "Agilao";
    }
    if (ally2.color === "yellow") {
      mveBtnTxt2 = "Garula";
    }
    if (ally2.color === "green") {
      mveBtnTxt2 = "Zionga";
    }
    mveBtnTxt3 = "Cleave";
  }

  if (turnState === "ally1") {
    if (ally1.color === "red") {
      mveBtnTxt1 = "Agilao";
      mveBtnTxt2 = "Diarama";
    }
    if (ally1.color === "blue") {
      mveBtnTxt1 = "Bufula";
      mveBtnTxt2 = "Cleave";
    }
  }

  if (turnState === "ally2") {
    if (ally2.color === "yellow") {
      mveBtnTxt1 = "Zionga";
      mveBtnTxt2 = "Lunge";
    }
    if (ally2.color === "green") {
      mveBtnTxt1 = "Garula";
      mveBtnTxt2 = "Diarama";
    }
  }
  if (turnState === "enemy1" || turnState === "enemy2" || turnState === "enemy3") {
    enemyTurn();
  }
  if (turnState === "ally1" || turnState === "ally2" || turnState === "player") {
    if (turnState !== "player") {
      moveButton1 = new Button(mveBtnTxt1, 20, "white", "black", 100, 50, 50, halfHeight-25);
      moveButton2 = new Button(mveBtnTxt2, 20, "white", "black", 100, 50, 50, halfHeight+25);
    }
    else {
      moveButton1 = new Button(mveBtnTxt1, 20, "white", "black", 100, 50, 50, halfHeight-50);
      moveButton2 = new Button(mveBtnTxt2, 20, "white", "black", 100, 50, 50, halfHeight);
      moveButton3 = new Button(mveBtnTxt3, 20, "white", "black", 100, 50, 50, halfHeight+50);
    }
  }
}

function moveButtonDisplay() {
  moveButton1.display();
  moveButton2.display();
  if (turnState === "player") {
    moveButton3.display();
  }
}

function executeMove() {
  //deal damage
  currentDamage = Math.floor(random(55, 65));
  if (currentTarget === "enemy1") {
    enemy1.health -= currentDamage;
  }
  if (currentTarget === "enemy2") {
    enemy2.health -= currentDamage;
  }
  if (currentTarget === "enemy3") {
    enemy3.health -= currentDamage;
  }

  if (currentTarget === "player") {
    player.health -= currentDamage;
  }
  if (currentTarget === "ally1") {
    ally1.health -= currentDamage;
  }
  if (currentTarget === "ally2") {
    ally2.health -= currentDamage;
  }

  if (enemy1.health <= 0) {
    enemy1.isAlive = false;
  }
  if (numberOfEnemies >= 2) {
    if (enemy2.health <= 0) {
      enemy2.isAlive = false;
    }
  }
  if (numberOfEnemies === 3) {
    if (enemy3.health <= 0) {
      enemy3.isAlive = false;
    }
  }

  if (player.health <= 0) {
    player.isAlive = false;
  }
  if (ally1.health <= 0) {
    ally1.isAlive = false;
  }
  if (ally2.health <= 0) {
    ally2.isAlive = false;
  }
  

  if (numberOfEnemies === 1) {
    if (!enemy1.isAlive) {
      gameState = "win";
    }
  }
  if (numberOfEnemies === 2) {
    if (!enemy1.isAlive && !enemy2.isAlive) {
      gameState = "win";
    }
  }
  if (numberOfEnemies === 3) {
    if (!enemy1.isAlive && !enemy2.isAlive && !enemy3.isAlive) {
      gameState = "win";
    }
  }

  if (!player.isAlive && !ally1.isAlive && !ally2.isAlive) {
    resetBattle();
  }

  //next turn
  turnRep += 1;
  turnState = whoseTurn();
  exper.txt = turnState;
  battleState = "turn";
  moveButtons();
}

function displayWin() {
  textSize(50);
  text("You Win!", halfWidth, height/3);

  textSize(25);
  text("Press B to go back to menu.", halfWidth, height-50);
}

function enemyTurn() {
  let randomTarget = Math.floor(random(0, 100));
  if (randomTarget <= 33) {
    currentTarget = "ally1";
  }
  else if (randomTarget <= 67) {
    currentTarget = "player";
  }
  else {
    currentTarget = "ally2";
  }
  battleState = "damage";
  executeMove();
}