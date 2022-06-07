let sourceImage;
let maskImage;
const Y_AXIS = 1;
const X_AXIS = 2;

function setup() {
  createCanvas(500, 500); //size of canvas
 
  // create source
  sourceImage = createGraphics(500,500); //size of drawing
  let b1 = color(255);
  let b2 = color(0);
  let c1 = color(204, 102, 0);
  let c2 = color(0, 102, 153);
  setGradient(0, 0, 500, 500, c2, c1, X_AXIS);
  // sourceImage.fill(255,0,0);
  // sourceImage.translate(width/2,height/2);
  // sourceImage.rotate(radians(45));
  // sourceImage.rect(-10,-150,20,500);

 
  // create mask
  maskImage = createGraphics(500,500); //size of mask
  maskImage.ellipse(250, 250, 300);
 
  // apply mask
  ( masked = sourceImage.get()).mask(maskImage);
  // sourceImage.mask(maskImage);
}
function draw() {
  // show masked source
  image(masked, 0, 0);
}


function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      sourceImage.stroke(c);
      sourceImage.line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      sourceImage.stroke(c);
      sourceImage.line(i, y, i, y + h);
    }
  }
}
