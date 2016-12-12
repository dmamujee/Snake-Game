function Snake() {
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
	this.yspeed = 0;
	this.total = 0;
	this.tail = [];
	this.increase = 2;
	this.moveQueue = [];

	this.update = function() {
		if(this.total === this.tail.length){
			for  (var i = 0; i < this.tail.length-1; i++){
				this.tail[i] = this.tail[i+1];
			}
			this.tail[this.total-1] = createVector(this.x,this.y);
		} else{
			for (var i = this.tail.length; i < this.total; i++){
				this.tail[i] = createVector(this.x,this.y);
			}
		}

		this.x = this.x + this.xspeed*scl;
		this.y = this.y + this.yspeed*scl;

		this.x = constrain(this.x, 0, width - scl);
   		this.y = constrain(this.y, 0, height - scl);
	}

	this.show = function() {
		this.display_score();
		fill(255);
		for (var i = 0; i < this.tail.length; i++) {
	    	rect(this.tail[i].x, this.tail[i].y, scl, scl);
	    }
		rect(this.x, this.y, scl, scl);

	}

	this.dir = function(x,y) {
		this.xspeed = x;
		this.yspeed = y;
	}

	this.eat = function(pos){
		var d = dist(this.x, this.y, pos.x, pos.y);
		if (d < 1) {
			this.total = this.total + this.increase;
			return true;
		}
		else return false;
	}

	this.dying = function() {
		// window.alert("Game Over! Score: " + this.total*10);
		this.x = 0;
		this.y = 0;
		this.xspeed = 1;
		this.yspeed = 0;
		this.total = 0;
		this.tail = [];

	}

	this.display_score = function(){
		var results_box = document.getElementById('output');
		var message = "Score:  " + this.total*10;
		results_box.innerHTML = message;
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
}