//player animation
let birdSprite = -1;
const BIRDLSIDES =115;
const BIRDRSIDES =118;
const BIRD_W=136, BIRD_H=92, BIRD_SPRITES=5;
//classes
class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}
class Player {
	constructor(x, y, rad, speed){
		this.p1 = new Point(x, y);
		this.rad = rad;
		this.speed = speed;
	}

	drawNormal(){
		let x = this.p1.x;
		let y= this.p1.y;
		var birdFront = new Image();
		birdFront.src = "backbirb.png"
		ctx.drawImage(birdFront, 0,0,BIRD_W,BIRD_H,x,y, BIRD_W,BIRD_H );
	}

	drawDown(){
		var birdDown = new Image();
		birdDown.src = "birbfront.png"
		birdSprite = (birdSprite + 1) % BIRD_SPRITES;
		ctx.drawImage(birdDown, birdSprite*BIRD_W,0,BIRD_W,BIRD_H, this.p1.x,this.p1.y,BIRD_W,BIRD_H );
	}

	drawUp() {
		var birdUp = new Image();
		birdUp.src = "backbirb.png"
		birdSprite = (birdSprite + 1) % BIRD_SPRITES;
		ctx.drawImage(birdUp, BIRD_W*birdSprite,0,BIRD_W,BIRD_H,this.p1.x,this.p1.y,BIRD_W,BIRD_H );
	}

	drawRight(){
		var birdRight = new Image();
		birdRight.src = "right.png"
		birdSprite = (birdSprite + 1) % BIRD_SPRITES;
		ctx.drawImage(birdRight, BIRDRSIDES*birdSprite,0,BIRD_W,BIRD_H,this.p1.x,this.p1.y,BIRD_W,BIRD_H );
	}
	drawLeft(){
		var birdLeft = new Image();
		birdLeft.src = "left.png"
		birdSprite = (birdSprite + 1) % BIRD_SPRITES;
		ctx.drawImage(birdLeft, BIRDLSIDES*birdSprite,0,BIRD_W,BIRD_H,this.p1.x,this.p1.y,BIRD_W,BIRD_H );
	}

	freeze(){
		frozen = true
		player.speed = 0;
		canvas.addEventListener('keydown', function(e) {
			e.preventDefault();

			if (e.keyCode === 40) { // DOWN
				down = false;
			}
			if (e.keyCode === 38) { // UP
				up = false;
			}
			if (e.keyCode === 37) { // LEFT
				left = false;
			}
			if (e.keyCode === 39) { // RIGHT
				right = false;
			}

		});
		setTimeout(function(){
			frozen = false;
			player.speed = 10;
			canvas.addEventListener('keydown', function(e) {
				e.preventDefault();

				if (e.keyCode === 40) { // DOWN
					down = true;
				}
				if (e.keyCode === 38) { // UP
					up = true;
				}
				if (e.keyCode === 37) { // LEFT
					left = true;
				}
				if (e.keyCode === 39) { // RIGHT
					right = true;
				}
			});
		},1000);

	}
	drawConfused(){
		var confused = new Image();
		confused.src = "confusedbirb.png"
		birdSprite = (birdSprite + 1) % 5;
		ctx.drawImage(confused ,BIRD_W*birdSprite,0,BIRD_W,BIRD_H,this.p1.x,this.p1.y,BIRD_W,BIRD_H );
	}
}
