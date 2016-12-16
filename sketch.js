var snake;
var scl = 20;
var food;
var godMode = false;

function setup() {
	createCanvas(640,640);
	snake = new Snake();
	snake.update_score();
	frameRate(snake.fps);
	snake.foodLocation()
}

function draw() {
	background(51);

	if ( snake.eat(food) ){
		snake.foodLocation();
	}
	if (!godMode) snake.death();
	snake.update();
	snake.show();

	fill(255,0,100);
	rect(food.x, food.y,scl,scl);
}

function keyPressed() {
	var vector;
	if (keyCode === UP_ARROW && snake.yspeed === 0) {
    	vector = createVector(0, -1);
  	} else if (keyCode === DOWN_ARROW && snake.yspeed === 0) {
    	vector = createVector(0, 1);
  	} else if (keyCode === RIGHT_ARROW && snake.xspeed === 0) {
    	vector = createVector(1, 0);
  	} else if (keyCode === LEFT_ARROW && snake.xspeed === 0) {
    	vector = createVector(-1, 0);
  	} else{
  		return;
  	}

  	snake.moveQueue.push(vector);
}
