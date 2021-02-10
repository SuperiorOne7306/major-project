// Major Project
// Michael Blushke
// Started Feb 10, 2021 - Finished ____________
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  halfHeight = height/2;
  halfWidth = width/2;
  rectMode(CENTER);
}

function draw() {
  background(220);
  
  fill("white")
  rect(width/3, halfHeight, 100, 100);
  fill("red");
  rect(width/1.5, halfHeight, 100, 100);
}
