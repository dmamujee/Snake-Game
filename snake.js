var initialfps = 10

function Snake() {
	this.x = 0;
	this.y = 0;
	this.xspeed = 0;
	this.yspeed = 0;
	this.total = 0;
	this.tail = [];
	this.increase = 2;
	this.moveQueue = [];
	this.highScore = 0;
	// this.highScore = getCookie("highScore");
	// console.log("Intial High Score: " + this.highScore);
	if (this.highScore === "") this.highScore = 0;
	this.fps = initialfps;
	this.increaseDiff = 0.05;

	this.update = function() {

		for (var i = this.tail.length; i < this.total; i++){
			if (this.tail.length === 0){
				this.tail[i] = createVector(this.x,this.y);
			} else{
				this.tail[i] = this.tail[this.tail.length-1];
			}
		}

		for  (var i = this.tail.length-1; i > 0; i--){
			this.tail[i] = this.tail[i-1];
		}
		if (this.total !== 0) this.tail[0] = createVector(this.x,this.y);

		this.move();

		this.x = this.x + this.xspeed*scl;
		this.y = this.y + this.yspeed*scl;

		this.x = constrain(this.x, 0, width - scl);
   		this.y = constrain(this.y, 0, height - scl);
	}

	this.show = function() {
		fill(255);
		for (var i = 0; i < this.tail.length; i++) {
	    	rect(this.tail[i].x, this.tail[i].y, scl, scl);
	    }
		rect(this.x, this.y, scl, scl);

	}

	this.move = function(x,y) {
		if (this.moveQueue.length !== 0){
			var move = this.moveQueue.pop();
			this.xspeed = move.x;
			this.yspeed = move.y;
		} 
	}

	this.eat = function(pos){
		var d = dist(this.x, this.y, pos.x, pos.y);
		if (d < 1) {
			this.total = this.total + this.increase;
			this.update_score();
			this.increaseSpeed(this.increaseDiff*this.increase);

			console.log("fps: " + this.fps);
			console.log("frameRate(): " + frameRate());
			return true;
		}
		else return false;
	}

	//Parameter increase should be the percentage increase of speed desired
	this.increaseSpeed = function(increase){
		console.log("increase: " + increase);
		if (increase < 0) return;
		this.fps = this.fps + increase;
		frameRate(this.fps);
	}

	this.dying = function() {
		window.alert("Game Over! Score: " + this.total*10);
		this.x = 0;
		this.y = 0;
		this.xspeed = 0;
		this.yspeed = 0;
		this.total = 0;
		this.tail = [];
		this.fps = initialfps;
		this.moveQueue = [];
		this.update_score();
		this.increaseSpeed(0);
		this.foodLocation();

	}

	this.update_score = function(){
		var output = document.getElementById('score');
		var message = "Score:  " + this.total*10 ;
		output.innerHTML = message;

		if (this.total*10 > this.highScore){
			this.highScore = this.total*10;
			// setCookie("highScore", this.highscore, 30);
			// console.log("High Score: " + getCookie("highScore"));
		}
		document.getElementById('highscore').innerHTML = 'High Score: ' + this.highScore;
	}

	this.death = function() {
		// If there is no tail, check that the snake doesn't hit the edge
		if (this.total == 0){
			if (this.xspeed > 0){
				var d = dist(this.x, this.y, 0, this.y);
				if (d === width-scl){
					this.dying();
				}
			} else if (this.xspeed < 0){
				var d = dist(this.x, this.y, 0, this.y);
				if (d === 0){
					this.dying();
				}
			} else if (this.yspeed > 0){
				var d = dist(this.x, this.y, this.x, 0);
				if (d === height-scl){
					this.dying();
				}
			} else if (this.yspeed < 0){
				var d = dist(this.x, this.y, this.x, 0);
				if (d === 0){
					this.dying();
				}
			}

		} else {
			// Check that the head never touches part of the tail
			for (var i = 0; i < this.tail.length; i++) {
				var pos = this.tail[i];
				var d = dist(this.x, this.y, pos.x, pos.y);
				if (d < 1) {
					this.dying();
				}			
			}
		}
	}

	this.foodLocation = function(){
		var cols = floor(width/scl);
	  	var rows = floor(height/scl);
	  	var temp = true;
	  	while (temp){
	  		food = createVector(floor(random(cols)), floor(random(rows)));
		  	food.mult(scl);
		  	temp = false;
		  	if (food.x === this.x && food.y === this.y) continue;
		  	for (var i = 0; i < this.tail.length; i++){
		  		if (food.x === this.tail[i].x && food.y === this.tail[i].y){
		  			temp = true;
		  			break;
		  		}

		  	}
	  	}
	}

	//Cookies code from: http://www.w3schools.com/js/js_cookies.asp
	this.setCookie = function(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	this.getCookie = function(cname) {
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

}
