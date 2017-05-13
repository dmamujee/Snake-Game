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

	if (!godMode) snake.death();
	snake.update();

  if ( snake.eat(food) ){
    snake.foodLocation();
  }

  fill(255,0,100);
  rect(food.x, food.y,scl,scl);

	snake.show();
	
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


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
