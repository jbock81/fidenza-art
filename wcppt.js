var sww = 600;
var shh = 720;
var layerCnt = 5;
var stepsLayer = 50;
var pp = [[-200, -150], [200, -100], [0, -300], [-100, 200], [200, 350]];

let increment = 0.05; // Spatial noise increment
let alpha = 255;

// Noise offsets
let xoff = 0.0;
let yoff = 0.0;
let zoff = 0.0;

// Resolution: nominal dot size
let res = 5;
let rows, cols;

let imgMask;

function preload() {
    imgMask = loadImage('assets/mapmask.png');
}

function setup() {
    // noLoop();
    // createCanvas(windowWidth, windowHeight)
    createCanvas(ww, hh);
    noStroke();

}

/*
fill(209, 49, 89, 10)
fill(238, 255, 0, 10)
*/

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
        myLayers[fcn] = new Array(stepsLayer).fill().map((x, i) => deform(poly(random(200, 300), noise(i) * 20), 8, 0.5));
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

    noStroke();
    let borderColor = color(191, 185, 185);
    fill(borderColor);
    rect(0, 0, 12, hh);
    rect(0, 0, ww, 12);
    rect(0, hh-12, ww, hh);
    rect(ww-12, 0, ww, hh);
    // saveCanvas();
    frameRate(0.1);
}

function rep(fn, d, n) {
    let res = d
    for (let i = 0; i < n; i++) res = fn(res)
    return res
}

function deform(poly, n, variance) {
    if (n == 0) return poly
    let res = []
    for (let i = 0; i < poly.length - 1; i++) {
        let curr = poly[i].slice()
        let next = poly[i + 1].slice()
        let len = Math.sqrt(Math.pow(curr[0] - next[0], 2),
            Math.pow(curr[1] - next[1], 2))
        let mid = [(curr[0] + next[0]) / 2, (curr[1] + next[1]) / 2];
        mid[0] = randomGaussian(mid[0], variance * len)
        mid[1] = randomGaussian(mid[1], variance * len)
        let inner = deform([curr, mid, next], n - 1,
            variance)
        res = res.concat(inner)
    }
    return res
}

function poly(radius, n) {
    let res = []
    radius = radius || 30.0
    n = n || 6
    let angle = (Math.PI * 2) / n
    for (let i = 0; i < n; i++) {
        res.push([Math.sin(i * angle) * radius,
        Math.cos(i * angle) * radius])
    }
    return res
}

function drawPoly(poly) {
    beginShape()
    for (let pt of poly) vertex(pt[0], pt[1])
    endShape(CLOSE)
}

function windowResized() {
    hh = window.innerHeight;
    ww = window.innerWidth; //hh*ratio;
    resizeCanvas(ww, hh);
    rows = hh / res;
    cols = ww / res;
  }
  
  const defaultSize = 1000;
  const ratio = 0.83;
  let hh = window.innerHeight;
  let ww = window.innerWidth; //hh*ratio;