// Major Project
// Michael Blushke
// Started Feb 10, 2021 - Finished ____________
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let whiteHealth = 200;
let redHealth = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  halfHeight = height/2;
  halfWidth = width/2;
  rectMode(CENTER);
}

function draw() {
  background(220);
  
  displaySquares();
}

function keyPressed() {
  if (key === "q") {
    redHealth -= 20;
  }
  if (key === "a") {
    whiteHealth -= 20;
  }
  console.log(whiteHealth);
  console.log(redHealth);
}

function displaySquares() {
  if (whiteHealth > 0) {
    fill("white");
    rect(width/3, halfHeight, 100, 100);
  }
  if (redHealth > 0) {
    fill("red");
    rect(width/1.5, halfHeight, 100, 100);
  }
}

function randomEncounter() {
  let numberOfEnemies;
  let choice = random(0, 100);
  if (choice >= 0 && choice < 50) {
    numberOfEnemies = 1;
  }
  else if (choice >= 50 && choice < 75) {
    numberOfEnemies = 2;
  }
  else if (choice >= 75 && choice <= 100) {
    numberOfEnemies = 3;
  }
}