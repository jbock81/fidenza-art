const ratio = 0.5;
let ww = window.innerWidth;
let hh = window.innerHeight; // ww * ratio;
var layerCnt = 5;
var stepsLayer = 50;
var pp = [[-400, -150], [400, -100], [0, -300], [-200, 200], [400, 350]];


let pattern;
let imgMask;

function preload() {
    imgMask = loadImage('assets/oceaniamask.png');
}

function setup() {
  createCanvas(ww, hh);
  background(40);
  noStroke();
  pattern = createGraphics(ww, hh);
  pattern.background(255);
  pattern = pattern.get(); // convert to image
  pattern.mask(imgMask);
}

function draw() {
  var fill_colors = new Array(layerCnt);
  for (var fcn = 0; fcn < layerCnt; fcn++) {
      fill_colors[fcn] = new Object;
      fill_colors[fcn].rr = random(1, 255);
      fill_colors[fcn].gg = random(1, 255);
      fill_colors[fcn].bb = random(1, 255);
  }

  var layerLen = 0;
  var myLayers = new Array(layerCnt);
  for (fcn = 0; fcn < layerCnt; fcn++) {
      myLayers[fcn] = new Array(stepsLayer).fill().map((x, i) => deform(poly(random(500, 600), noise(i) * 30), 8, 0.5));
      layerLen += stepsLayer;
  }

  push();
  // translate(width / 2, height / 2)
  translate(ww / 2, hh / 2);
  background(250, 225, 195);
  let std = random(10, 30); //20  
  for (let i = 0; i < layerLen; i++) {
      var idxLayer = Math.floor(i / 5) % layerCnt;
      fill(fill_colors[idxLayer].rr, fill_colors[idxLayer].gg, fill_colors[idxLayer].bb, 10);
      push();
      translate(randomGaussian(0, std) + pp[idxLayer][0], randomGaussian(0, std) + pp[idxLayer][1]);
      drawPoly(myLayers[idxLayer][i % stepsLayer]);
      pop();
  }
  pop();
  //imageMode(CENTER);
  image(pattern, 0, 0);
  frameRate(0.1);
}

function rep(fn, d, n) {
  let res = d;
  for (let i = 0; i < n; i++) res = fn(res);
  return res;
}

function deform(poly, n, variance) {
  if (n == 0) return poly;
  let res = [];
  for (let i = 0; i < poly.length - 1; i++) {
      let curr = poly[i].slice();
      let next = poly[i + 1].slice();
      let len = Math.sqrt(Math.pow(curr[0] - next[0], 2), Math.pow(curr[1] - next[1], 2));
      let mid = [(curr[0] + next[0]) / 2, (curr[1] + next[1]) / 2];
      mid[0] = randomGaussian(mid[0], variance * len);
      mid[1] = randomGaussian(mid[1], variance * len);
      let inner = deform([curr, mid, next], n - 1, variance);
      res = res.concat(inner);
  }
  return res;
}

function poly(radius, n) {
  let res = [];
  radius = radius || 30.0;
  n = n || 6;
  let angle = (Math.PI * 2) / n;
  for (let i = 0; i < n; i++) {
      res.push([Math.sin(i * angle) * radius, Math.cos(i * angle) * radius]);
  }
  return res;
}

function drawPoly(poly) {
  beginShape();
  for (let pt of poly) vertex(pt[0], pt[1]);
  endShape(CLOSE);
}

function windowResized() {
  hh = window.innerHeight;
  ww = window.innerWidth;
  resizeCanvas(ww, hh);
  setup();
}