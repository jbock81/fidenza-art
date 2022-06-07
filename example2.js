var balls = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 100; i++){
    balls.push({
      positionX: 0, positionY: 0, 
      vectorX: random(5), vectorY: random(5),
      color: {
        red: random(255), 
        green: random(255), 
        blue: random(255)
      }
    });
  }
}

function draw() {
  background(220);
  noStroke(); // 輪郭線は無し
  
  for (let i = 0; i < 100; i++){
    let ball = balls[i];
    ball.positionX = ball.positionX + ball.vectorX; // X位置にX移動量を加算
    ball.positionY = ball.positionY + ball.vectorY; // Y位置にY移動量を加算
    if(ball.positionX < 0 || ball.positionX > 400) {
      // 画面外に行く場合、移動量をマイナスにする
      ball.vectorX = ball.vectorX * -1;
    }
    if(ball.positionY < 0 || ball.positionY > 400) {
      // 画面外に行く場合、移動量をマイナスにする
      ball.vectorY = ball.vectorY * -1; 
    }
    fill(ball.color.red, ball.color.green, ball.color.blue);
    ellipse(ball.positionX, ball.positionY, 50, 50);
  }
}