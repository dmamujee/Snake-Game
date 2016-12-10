var snake;
var scl = 20;
var food;

function setup() {
	createCanvas(640,640);
	snake = new Snake();
	frameRate(10);
	foodLocation()
}

function foodLocation() {
  	var cols = floor(width/scl);
  	var rows = floor(height/scl);
  	food = createVector(floor(random(cols)), floor(random(rows)));
  	food.mult(scl);
}

function draw() {
	background(51);

	if ( snake.eat(food) ){
		foodLocation();
	}
	snake.death();
	snake.update();
	snake.show();

	fill(255,0,100);
	rect(food.x, food.y,scl,scl);
}

function keyPressed() {
  if (keyCode === UP_ARROW && snake.yspeed === 0) {
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW && snake.yspeed === 0) {
    snake.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW && snake.xspeed === 0) {
    snake.dir(1, 0);
  } else if (keyCode === LEFT_ARROW && snake.xspeed === 0) {
    snake.dir(-1, 0);
  }
}