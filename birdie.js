const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const FPS = 60;
let score = 0;

const leftBoundary = 0;
const topBoundary = 0;
const rightBoundary = canvas.width-100;
const bottomBoundary = canvas.height-100;
//player const
let down = false;
let up = false;
let right = false;
let left = false;
let frozen = false;
//player animation
let birdSprite = -1;
const BIRDLSIDES =115;
const BIRDRSIDES =118;
const BIRD_W=136, BIRD_H=92, BIRD_SPRITES=5;

//image variables
const cact = "graphics/cactus.png"
const wolfie = "graphics/wolfie.png"
const image_egg = "graphics/egg.png"


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
		birdFront.src = "graphics/birdback.png"
		ctx.drawImage(birdFront, 0,0,BIRD_W,BIRD_H,x,y, BIRD_W,BIRD_H );
	}

	drawDown(){
		var birdDown = new Image();
		birdDown.src = "graphics/birdfront.png"
		birdSprite = (birdSprite + 1) % BIRD_SPRITES;
		ctx.drawImage(birdDown, birdSprite*BIRD_W,0,BIRD_W,BIRD_H, this.p1.x,this.p1.y,BIRD_W,BIRD_H );
	}

	drawUp() {
		var birdUp = new Image();
		birdUp.src = "graphics/birdback.png"
		birdSprite = (birdSprite + 1) % BIRD_SPRITES;
		ctx.drawImage(birdUp, BIRD_W*birdSprite,0,BIRD_W,BIRD_H,this.p1.x,this.p1.y,BIRD_W,BIRD_H );
	}

	drawRight(){
		var birdRight = new Image();
		birdRight.src = "graphics/birdright.png"
		birdSprite = (birdSprite + 1) % BIRD_SPRITES;
		ctx.drawImage(birdRight, BIRDRSIDES*birdSprite,0,BIRD_W,BIRD_H,this.p1.x,this.p1.y,BIRD_W,BIRD_H );
	}
	drawLeft(){
		var birdLeft = new Image();
		birdLeft.src = "graphics/birdleft.png"
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
		confused.src = "graphics/birdstars.png"
		birdSprite = (birdSprite + 1) % 5;
		ctx.drawImage(confused ,BIRD_W*birdSprite,0,BIRD_W,BIRD_H,this.p1.x,this.p1.y,BIRD_W,BIRD_H );
	}
}

function movePlayer() {

	if (down && player.p1.y < bottomBoundary+40) {
		player.p1.y += player.speed;
		player.drawDown();
	}
	else if (up && player.p1.y  > topBoundary) {
		player.p1.y -= player.speed ;
		player.drawUp();
	}

	else if (right && player.p1.x < rightBoundary + 50) {
		player.p1.x += player.speed;
		player.drawRight();
	}
	else if (left && player.p1.x > leftBoundary-30) {
		player.p1.x -= player.speed;
		player.drawLeft();
	}
	else if(frozen){
		player.drawConfused();
	}
	else {
		player.drawNormal();
	}
}
class Egg{
	constructor(file, x, y, rad){
		this.img = new Image();
		this.img.src = file;
		this.p1 = new Point(x, y);
		this.rad = rad;
	}
	update(){
		this.p1.x = random(60,canvas.width-2*this.rad);
		this.p1.y = random(60,canvas.height-2*this.rad);
	}
	draw(){
		ctx.drawImage(this.img, this.p1.x, this.p1.y);
	}
}
class Wolf{
	constructor(file, x, y, dx, dy,rad){
		this.img = new Image();
		this.img.src = file;
		this.p1 = new Point(x, y);
		this.dx = dx;
		this.dy = dy;
		this.rad = rad;
	}
	update(){
		this.p1.x += this.dx;
		this.p1.y += this.dy;
		//changes the direction (velocity) when wolf reached a boundary
		if (this.p1.x  > rightBoundary +45){
			this.p1.x = rightBoundary;
			this.dx *= -1.0025;
		}
		if(this.p1.x < leftBoundary){
			this.p1.x = leftBoundary;
			this.dx *= -1.0025;
		}
		if(this.p1.y > bottomBoundary + 45 ){
			this.p1.y = bottomBoundary;
			this.dy *= -1.0025;
		}
		if(this.p1.y  < topBoundary){
			this.p1.y = topBoundary;
			this.dy *= -1.0025;
		}
	}
	draw(){
		ctx.drawImage(this.img, this.p1.x, this.p1.y);
	}
}
class Cactus {
	constructor(file, x1, y1, rad, x2, y2, x3, y3, dx, num){
		this.img = new Image();
		this.img.src = file;
		this.p1 = new Point(x1, y1);
		this.rad = rad;
		this.p2 = new Point(x2, y2);
		this.p3 = new Point(x3, y3);
		this.dx = dx;
		this.num = num;

	}

	draw(){
		ctx.drawImage(this.img, this.p1.x, this.p1.y);
	}
	updateNeedle() {
		this.p2.x += this.dx;
		this.p3.x += this.dx;
	}
	isVisible(maxX) {
		return this.p2.x < maxX || this.p3.x > maxX;
	}
	drawNeedle(ctx){
		ctx.beginPath();
		ctx.lineTo(this.p2.x, this.p2.y);
		ctx.lineTo(this.p3.x, this.p3.y);
		ctx.stroke();
		ctx.strokeStyle = "556B2F";
	}

}
function drawCacti() {

	for(cactus of cacti){
		//	ctx.save();
		cactus.draw();
		//	ctx.restore()
	}
}

//needle class and methods//

class Needle {
	constructor(x1, y1, x2, y2, dx) {
		this.p1 = new Point(x1, y1);
		this.p2 = new Point(x2, y2);
		this.dx = dx;
	}
	update() {
		this.p1.x += this.dx;
		this.p2.x += this.dx;
	}
	isVisible(maxX) {
		return this.p1.x < maxX || this.p2.x > maxX;
	}
	draw(ctx){
		ctx.strokeStyle = "556B2F";
		ctx.beginPath();
		ctx.lineTo(this.p1.x, this.p1.y);
		ctx.lineTo(this.p2.x, this.p2.y);
		ctx.stroke();
	}
}


////needle methods
let needles = [];
function shootingNeedle(){
	let ny1 = 130
	let ny2 = 370
	let nx1 = 50;
	let len = 7;
	let ndx = 2;

	let needle1 = new Needle(nx1, ny1, nx1 - len, ny1, 5);
	let needle2 = new Needle(nx1, ny2, nx1 - len, ny2, 10);
	needles.push(needle1);
	needles.push(needle2);
}

function updateNeedles() {
	for(let needle of needles){
		needle.update();
	}
	needles = needles.filter((needle) => needle.isVisible(canvas.width));
}
function drawNeedle() {
	for(let needle of needles){
		needle.draw(ctx);
	}
}


function startGame(){
	drawCacti();
	drawNeedle();
	updateNeedles();
	egg.draw();
	wolf.update();
	wolf.draw();
	checkEggCollision();
	checkWolfCollision();
	checkNeedlesCollision();
	checkCactusCollision();
	drawScoreBoard();
}

//OBJECT DECLARATIONS
let player = new Player(250, 450, 40, 10);
let egg = new Egg (image_egg, 50, 50, 25);
let wolf = new Wolf (wolfie, 300, 300, 6, -3, 30);
let x1 = 50;
var cacti = [];
let len = 7;
let cactus1 = new Cactus(cact, 3, 100, 20, x1, 120, x1-len, 120, 4 , 15);
let cactus2 = new Cactus(cact, 3, 350, 20, x1, 370,  x1-len, 370, 5 , 15);
cacti.push(cactus1);
cacti.push(cactus2);


//START INTERVAL
function gameMenu()
{
	var menu = new Image();
	menu.src = 'menu.png';
	menu.onload = function(){
		ctx.drawImage(menu, 0, 0);
	}
}
ctx.fillStyle= "black";
ctx.font = "italic bold 35pt Tahoma";
ctx.fillText("Click to start game!",200,300);
ctx.font = "italic bold 15pt Tahoma"
ctx.fillText("Get all eggs and don't get eaten!",250,340);

canvas.addEventListener("click", startAll)
gameMenu();

function startAll(){
	erase();
	erase = setInterval(erase, 1000/15);
	setInterval(shootingNeedle, 2500);
	start = setInterval(startGame, 1000/15);
	walking = setInterval(movePlayer, 1000/15);
	egg.update();
}

//COLLISIONS
function checkCactusCollision(){
	for(let i = 0; i < cacti.length; i++){
		let cat = cacti[i];
		let x = (player.p1.x + player.rad) - (cat.p1.x + cat.rad);
		let y = (player.p1.y + player.rad) - (cat.p1.y + cat.rad);
		let distance = Math.sqrt(x * x + y * y); //the distance between the 2 objects/circles
		let sumOfRadius =  cat.rad + player.rad; //the maximum distance with no collision
		if(distance < sumOfRadius){
			if (score >= 1 ){
				score--;
			}else if (score < 1){
				score;
			}
		}
	}
}

function checkNeedlesCollision(){
	for(let i = 0; i < needles.length; i++){
		let need = needles[i];
		let x = (player.p1.x + player.rad) - (0.75*need.p1.x); // 7 + 3.5
		let y = (player.p1.y + player.rad) -  (need.p1.y-4);
		let distance = Math.sqrt(x * x + y * y) //the distance between the 2 objects/circles
		let sumOfRadius =  0.5*(need.p1.x - need.p2.x) + player.rad; //the maximum distance with no collision
		if(distance < sumOfRadius){
			needles.splice(i , 1);
			i--;
			player.freeze();


		}
	}
}
//	console.log('needle array' + needle);
function checkWolfCollision(){
	let x = (player.p1.x + player.rad) - (wolf.p1.x + wolf.rad);
	let y = (player.p1.y + player.rad) - (wolf.p1.y + wolf.rad);
	let distance = Math.sqrt(x * x + y * y); //the distance between the 2 objects
	let sumOfRadius = wolf.rad + player.rad; //the maximum distance with no collision
	if(distance < sumOfRadius){
		endGameLose();
	}
}

function checkEggCollision(){
	let x = (player.p1.x + player.rad) - (egg.p1.x + egg.rad);
	let y = (player.p1.y + player.rad) - (egg.p1.y + egg.rad);
	let distance = Math.sqrt(x * x + y * y); //the distance between the 2 objects/circles
	let sumOfRadius = egg.rad + player.rad; //the maximum distance with no collision
	if(distance < sumOfRadius){
		score++
		if(score < 5){
			egg.update();
		}
		else if (score = 5){
			endGameWin();
		}
	}
}



//score conditions
function endGameWin(){
	clearInterval(walking);
	clearInterval(start);
	clearInterval(erase);
	ctx.clearRect(0, 0, canvas.height, canvas.width);
	ctx.font = '24px Arial';
	ctx.fillstyle = "blue";
	ctx.textAlign = 'center';
	ctx.fillText('You Win! All the eggs are safe!', canvas.width / 2, canvas.height / 2 );

}

function endGameLose(){
	clearInterval(walking);
	clearInterval(start);
	clearInterval(erase);
	ctx.clearRect(0, 0, canvas.height, canvas.width);
	ctx.font = '24px Arial';
	ctx.fillstyle = "blue";
	ctx.textAlign = 'center';
	ctx.fillText('Better luck next time! You found ' + score + ' eggs!' , canvas.width / 2, canvas.height / 2);

}

function drawScoreBoard(){
	ctx.fillStyle = '#000000';
	ctx.font = '24px Acme';
	ctx.textAlign = 'left';
	ctx.fillText('Egg counter: ' + score, 10, 24);
}

// EXTRA FUNCTIONS
function erase() {
	ctx.clearRect(0,0,canvas.height, canvas.width);
}


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

canvas.addEventListener('keyup', function(e) {
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

function random(min, max) {
	var num = Math.floor(Math.random() * (max - min + 1)) + min;
	return num;
}
