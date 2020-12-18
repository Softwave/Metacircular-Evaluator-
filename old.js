var r, g, b;
function setup() {
  createCanvas(windowWidth, windowHeight);

  //drums = EDrums('x*o*x*o-');
  //follow = Follow(drums);

  drums = EDrums("x*o*x*o-");

  bass = Mono("bass").note.seq([0, 7], 1 / 8);

  Gibber.scale.root.seq(["d4", "f4", "g4", "a4", "d4", "f4", "c4", "d4"], 1);

  follow = Follow(Gibber.Master, 1024);
  background(100, 0, 200);
  noFill();
  stroke(255, 0, 170);
}

function draw() {
  var x = mouseX / windowWidth,
    y = mouseY / windowHeight,
    ww2 = windowWidth / 2,
    wh2 = windowHeight / 2,
    value = follow.getValue(),
    radius = (ww2 > wh2 ? wh2 : ww2) * value;

  //bass.resonance = (1 - x) * 5
  //bass.cutoff = (1 - y) / 2

  //sampler.fx[0].feedback = x < .99 ? x : .99

  strokeWeight(value * 50);
  background(100, 0, 200, 10);
  ellipse(ww2, wh2, radius, radius);
}
