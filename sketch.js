let cNum = 20;
let gap = 10;
let cSize = 10;
let angle = 0;
var mic;
let x, y;
let timer = 0;
function setup() {
  getAudioContext(this.Gibber.context).suspend();
  createCanvas(windowWidth, windowHeight);

  drums = EDrums("x*o*x*o-");
  bass = Mono("bass").note.seq([0, 7], 1 / 16);

  Gibber.scale.root.seq(["d4", "f4", "g4", "a4", "d4", "f4", "c4", "d4"], 1);

  follow = Follow(Gibber.Master, 1024);
  angleMode(degrees);
}

function draw() {
  let value = follow.getValue();
  background(20);

  push();
  translate(width / 2, height / 2);
  noFill();
  rotate(angle);
  strokeWeight(1);
  angle = angle + 0.001;
  let rad = frameCount % 25;
  for (let i = 0; i < cNum; i++) {
    stroke(i * 10);
    //ellipse(0, 0, i * cNum + rad + value, i * cNum + rad + value);
    arc(
      0,
      0,
      cSize + 30 * i + value * rad,
      i * cNum + rad,
      angle * i,
      360 - i / 2
    );
  }
  pop();

  push();
  translate(width / 2, height / 2);
  let ww2 = windowWidth / 2;
  let wh2 = windowHeight / 2;
  let radius = (ww2 > wh2 ? wh2 : ww2) * value;
  ellipse(0, 0, radius, radius);
  pop();

  doNoise();

  push();
  noStroke();
  fill(255);
  translate(width / 2, height - 20);
  textFont("Helvetica");
  textSize(20);
  textAlign(CENTER, CENTER);
  text("BY LAMBDA CALCULUS", 0, 0);
  pop();
  push();
  noStroke();
  fill(255);
  translate(width / 2, height - 40);
  textFont("Helvetica");
  textSize(20);
  textAlign(CENTER, CENTER);
  text("Metacircular Evaluator", 0, 0);
  pop();

  // Udpate Music
  (x = mouseX / windowWidth), (y = mouseY / windowHeight);
  bass.resonance = (1 - x) * 8;
  bass.cutoff = (1 - y) / 2;

  // Timers
  if (frameCount % 60 == 0 && timer < 120) {
    timer++;
  }
  //if (timer < 60) {
  //  bass.note.seq([0, 7], 1 / 4);
  //}
  //if (timer < 90 && timer > 60) {
  //  bass.note.seq([0, 7], 1 / 8);
  //}
  //if (timer > 60 && timer < 120) {
  //  bass.note.seq([0, 7], 1 / 16);
  //}
  //if (timer === 120) {
  //  timer = 0;
  //}
}

function mousePressed() {
  getAudioContext(this.Gibber.context).resume();
}

function doNoise() {
  stroke("white");
  strokeWeight(1);
  for (let i = 0; i < 100; i++) {
    point(random(width), random(height));
  }
}
