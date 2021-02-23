// Major Project
// Michael Blushke
// Started Feb 10, 2021 - Finished ____________
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let numberOfEnemies;
let player;
let enemy1;
let enemy2;
let enemy3;
let halfHeight;
let halfWidth;
let enemyWidth;
let allyWidth;
let gameState = "menu";
let buttonWidth;
let buttonHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  halfHeight = height/2;
  halfWidth = width/2;
  enemyWidth = width*(2/3);
  allyWidth = width/3;
  buttonWidth = width/5;
  buttonHeight = height/10;
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  numberOfEnemies = randomEncounter();
  makeSprites();
}

function draw() {
  background(220);
  if (gameState === "menu") {
    menuDisplay();
  }
  
  if (gameState === "battle") {
    displaySquares();
  }
 
}

class Sprite {
  constructor(health, team, sizeX, sizeY, x, y){
    this.health = health;
    this.team = team;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.x = x;
    this.y = y;
  }

  display() {
    if (this.health > 0) {
      if (this.team === "ally") {
        fill("white");
      }
      if (this.team === "enemy"){
        fill("red");
      }
      
      rect(this.x, this.y, this.sizeX, this.sizeY);
    }
  }
}

function menuDisplay() {
  //title
  fill("black");
  textSize(25);
  text("*Title Here*", width/2, height/3);

  //display start button
  fill("white");
  rect(width/2, height/1.5, buttonWidth, buttonHeight);
  textSize(25);
  fill("black");
  text("START", width/2, height/1.5);
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
    if (key === "b") {
      gameState = "menu";
    }
    console.log(player.health);
    console.log(enemy1.health);
    console.log(enemy2.health);
    console.log(enemy3.health);
  }
}

function mousePressed() {
  if (gameState === "menu") {
    if (mouseX > width/2 - buttonWidth/2 && mouseX < width/2 + buttonWidth/2 && 
        mouseY > height/1.5 - buttonHeight/2 && mouseY < height/1.5 + buttonHeight/2) {
      gameState = "battle";
    }
  }
  
}

function displaySquares() {
  //show player
  player.display();

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
  player = new Sprite(200, "ally", 100, 100, allyWidth, halfHeight);

  if (numberOfEnemies === 1) {
    enemy1 = new Sprite(200, "enemy", 100, 100, enemyWidth, halfHeight);
  }
  if (numberOfEnemies === 2) {
    enemy1 = new Sprite(200, "enemy", 100, 100, enemyWidth, height/3);
    enemy2 = new Sprite(200, "enemy", 100, 100, enemyWidth, height*(2/3));
  }
  if (numberOfEnemies === 3) {
    enemy1 = new Sprite(200, "enemy", 100, 100, enemyWidth, height/4);
    enemy2 = new Sprite(200, "enemy", 100, 100, enemyWidth, halfHeight);
    enemy3 = new Sprite(200, "enemy", 100, 100, enemyWidth, height*0.75);
  }
}