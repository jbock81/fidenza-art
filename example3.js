function setup() {
	createCanvas(400, 400);
	background(220);
}

function draw() {
	var xColor = map(mouseX, 0, 400, 0, 255);
	var yColor = map(mouseY, 0, 400, 0, 255);
	fill(200, xColor, yColor);
	ellipse(mouseX, mouseY, 50, 50);
}