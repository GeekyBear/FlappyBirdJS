var context = document.getElementById("gameCanvas")
var ctx = context.getContext("2d")
var WIDTH = 300;
var HEIGHT = 530;
var CANVAS_WIDTH = 300;
var CANVAS_HEIGHT = 530;

context.width = WIDTH;
context.height = HEIGHT;

// Variables
var FPS = 60;
var gravity = 1.5
var score = 0

var player = {
	x: 100,
	y: 150,
	w:50,
	h:50
}

var pipes = new Array()
pipes[0] = {
	x: context.width,
	y: 0
}

// Sound effects
var sfxScore = new Audio()
sfxScore.src = "sounds/score.wav"

// Images
var bird = new Image()
bird.src = "images/bird.png"

var floor = new Image()
floor.src = "images/floor.png"

var background = new Image()
background.src = "images/background.png"

var northPipe = new Image()
northPipe.src = "images/northPipe.png"

var southPipe = new Image()
southPipe.src = "images/southPipe.png"

// Control
function keyDown() {
	player.y -= 25
}

function resize() {
	CANVAS_HEIGHT = window.innerHeight;
	CANVAS_WIDTH = window.innerWidth;

	context.width = WIDTH;
	context.height = HEIGHT;

	context.style.height = "" + CANVAS_HEIGHT + "px"
}

setInterval (loop, 1000/FPS)

function loop() {
	resize()
	ctx.clearRect(0,0,context.width,context.height)

	// Background
	ctx.drawImage(background,0,0)
	ctx.drawImage(floor, 0,context.height - floor.height)

	// Player
	ctx.drawImage(bird, player.x, player.y)	

	// Pipes
	for (var i = 0; i < pipes.length; i++) {
		var offset = northPipe.height + 80
		ctx.drawImage(northPipe,pipes[i].x, pipes[i].y)
		ctx.drawImage(southPipe,pipes[i].x, pipes[i].y + offset)
		pipes[i].x--;	

		if(pipes[i].y + northPipe.height > 80){
			pipes[i].y = 0
		}

		if(pipes[i].x == 150){
			pipes.push({
				x: context.width,
				y: Math.floor(Math.random()*northPipe.height) - northPipe.height
			})
		}

		// Collisions
		if(player.x + bird.width >= pipes[i].x &&
			player.x <= pipes[i].x + northPipe.width &&
			(player.y <= pipes[i].y + northPipe.height ||
				player.y + bird.height >= pipes[i].y + offset) ||
				player.y + bird.height >= context.height - floor.height){
			location.reload()
		}

		if(pipes[i].x == 50){
			score++
			sfxScore.play()
		}
	}

	// Conditions
	player.y += gravity
	ctx.fillStyle = "rgba(0,0,0,1)"
	ctx.font = "25px Arial"
	ctx.fillText("Score: " + score, 10, context.height - 40)
}
//window.addEventListener("resize",resize)
window.addEventListener("keydown", keyDown)