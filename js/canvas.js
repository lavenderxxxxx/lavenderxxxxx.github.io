


var canvas = document.getElementsByTagName("canvas").item(0);
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;//document.body.getBoundingClientRect().width;
canvas.height =window.innerHeight;// document.body.getBoundingClientRect().height;

context.globalCompositeOperation = 'lighter';
var particles = {},
	particleIndex = 0,
	settings = {
		density: 30,
		maxCounts:500,
		currentCounts:0,
		parSizeMin:20,
		parSizeMax: 100,		
		startingX: canvas.width / 2,
		startingY: canvas.height / 4,
		gravity: 0,
		maxAlpha :100,
		hsl_color_h :[5,43,100,201,272]
	};
settings.maxCounts = Math.floor(canvas.width*canvas.height/(1920*890)*settings.maxCounts);
window.onload = function() {
	"use strict";
	setInterval(function() {
	//context.fillRect(0, 0, canvas.width, canvas.height);
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	// Draw the particles
	for (var i = 0; i < settings.density; i++) {
		if (Math.random() > 0.97&&settings.currentCounts<settings.maxCounts) {
		// Introducing a random chance of creating a particle
		// corresponding to an chance of 1 per second,
		// per "density" value
		new Particle();
		settings.currentCounts++;
		}
	}

	for (var i in particles) {
	  particles[i].draw();
	}
	
//numDisplay.innerHTML = particleIndex;
	
}, 100/3);
};

// Set up a function to create multiple particles
function Particle() {
	"use strict";
	// Establish starting positions and velocities
	this.x =Math.random() *canvas.width; //settings.startingX;
	this.y = Math.random() *canvas.height;//settings.startingY;
	
	// Determine original X-axis speed based on setting limitation
	
	this.size =  randomVal(settings.parSizeMin,settings.parSizeMax);
	
	
	this.h = settings.hsl_color_h[randomVal(-1,settings.hsl_color_h.length)];  //randomVal(0, 360);
	this.s = 100;
	this.l = 50;
	this.a =( settings.parSizeMax-this.size)/(settings.parSizeMax-settings.parSizeMin)*settings.maxAlpha/100;
	
	this.vx =Math.random() * 2 - 1;
	this.vy =Math.random() * 2 - 1;
	// Add new particle to the index
	// Object used as it's simpler to manage that an array
	particleIndex ++;
	particles[particleIndex] = this;
	this.id = particleIndex;
	this.life = 0;
	this.maxLife = 1000;
}


// Some prototype methods for the particle's "draw" function
Particle.prototype.draw = function() {
	"use strict";
	this.x += this.vx;
	this.y += this.vy;
	
	// Adjust for gravity
	this.vy += settings.gravity;
	
	// Age the particle
	this.life++;
	var trans =1;
	// If Particle is old, it goes in the chamber for renewal
	if (this.life >= this.maxLife) {
	  delete particles[this.id];
	  settings.currentCounts--;
	}

	
	// Determine whether to bounce the particle off a wall
	
	
	if(this.life<this.maxLife/4)
	{
		trans=this.life/(this.maxLife/4);
	}
	if(this.life>this.maxLife*3/4){
		trans=(this.maxLife-this.life)/(this.maxLife/4);
	}
	
			
	var hsl = 'hsla(' +this.h  + ', ' + this.s + '%,  ' +this.l + '%,'+this.a*trans + ')';
	// Create the shapes
	context.beginPath();
	
	context.fillStyle=hsl;//this.drawColor;
	// Draws a circle of radius 20 at the coordinates 100,100 on the canvas
	context.arc(this.x, this.y,this.size, 0, Math.PI*2, true); 
	context.closePath();
	context.fill();	
};

function randomVal(min, max) {
	"use strict";
  return Math.floor(Math.random() * (max - min) + 1) + min;
}
	

