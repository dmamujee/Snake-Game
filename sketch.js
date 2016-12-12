var snake;
var scl = 20;
var food;
var godMode = false;
var fps = 10;

function setup() {
	createCanvas(640,640);
	snake = new Snake();
	frameRate(fps);
	foodLocation()
}

function foodLocation() {
  	var cols = floor(width/scl);
  	var rows = floor(height/scl);
  	var temp = true;
  	while (temp){
  		food = createVector(floor(random(cols)), floor(random(rows)));
	  	food.mult(scl);
	  	temp = false;
	  	if (food.x === snake.x && food.y === snake.y) continue;
	  	for (var i = 0; i < snake.tail.length; i++){
	  		if (food.x === snake.tail[i].x && food.y === snake.tail[i].y){
	  			console.log("Food on Snake!");
	  			temp = true;
	  			break;
	  		}

	  	}
  	}
}

function draw() {
	background(51);

	if ( snake.eat(food) ){
		foodLocation();
	}
	if (!godMode) snake.death();
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