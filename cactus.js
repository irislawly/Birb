const cact = "cactus.png"
//	<script src="cactus.js"></script


class Cactus {
	constructor(file, x1, y1, rad, dx){
		this.img = new Image();
		this.img.src = file;
		this.p1 = new Point(x1, y1);
		this.rad = rad;
		this.dx = dx;
    this.needleX = this.p1.x ;
    this.needleY = this.p1.y + 20;
    needles

	}

	draw(){
		ctx.drawImage(this.img, this.p1.x, this.p1.y);
	}


	updateNeedle() {
    this.needleX += this.dx;
    this.needleY += this.dx;

	}

  drawNeedle(){
    ctx.strokeStyle = "556B2F";
    ctx.beginPath();
    ctx.lineTo(this.needleX, this.needleY);
    ctx.lineTo(this.needleX+ 100, this.needleY);
    ctx.stroke();
  }



}
function drawCacti() {



	for(cactus of cacti){
		//	ctx.save();
		cactus.draw();
    cactus.drawNeedle()
		//	ctx.restore()
	}
}
