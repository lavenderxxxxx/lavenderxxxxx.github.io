


var canvas = document.getElementsByTagName("canvas").item(0);
var context = canvas.getContext("2d");

canvas.width =500; //document.body.getBoundingClientRect().width;//window.innerWidth;
canvas.height = 500; //document.body.getBoundingClientRect().height;//window.innerHeight;

context.globalCompositeOperation = 'lighter';

var particles = {},
	particleIndex = 0,
	settings = {
		density: 20,
		parMin:20,
		parMax: 100,		
		startingX: canvas.width / 2,
		startingY: canvas.height / 4,
		gravity: 0,
		maxAlpha :100,
		hsl_color_h :[5,45,136,217]
	};


window.onload = function() {
	"use strict";
	setInterval(function() {
	//context.fillRect(0, 0, canvas.width, canvas.height);
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	// Draw the particles
	for (var i = 0; i < settings.density; i++) {
		if (Math.random() > 0.97) {
		// Introducing a random chance of creating a particle
		// corresponding to an chance of 1 per second,
		// per "density" value
		new Particle();
		}
	}

	for (var i in particles) {
		
	  particles[i].draw();
	}
	
//numDisplay.innerHTML = particleIndex;
	
}, 30);
};

// Set up a function to create multiple particles
function Particle() {
	"use strict";
	// Establish starting positions and velocities
	this.x =Math.random() *canvas.width; //settings.startingX;
	this.y = Math.random() *canvas.height;//settings.startingY;
	
	this.hoverAlpha = 1;
	
	// Determine original X-axis speed based on setting limitation
	
	this.size =  randomVal(settings.parMin,settings.parMax);
	
	
	this.h = settings.hsl_color_h[randomVal(-1,settings.hsl_color_h.length)];  //randomVal(0, 360);
	this.s = 90;
	this.l = 50;
	this.a =( settings.parMax-this.size)/(settings.parMax-settings.parMin)*settings.maxAlpha;
	
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
	
	// If Particle is old, it goes in the chamber for renewal
	if (this.life >= this.maxLife) {
	  delete particles[this.id];
	}
	var trans =1;
	if(this.life<this.maxLife/4)
	{
		trans=this.life/(this.maxLife/4);
	}
	if(this.life>this.maxLife*3/4){
		trans=(this.maxLife-this.life)/(this.maxLife/4);
	}
	
	
	var hsl = 'hsla(' +this.h  + ', ' + this.s + '%,  ' +this.l + '%,'+this.a*trans*this.hoverAlpha + '%)';
	// Create the shapes
	context.clearRect(settings.leftWall, settings.groundLevel, canvas.width, canvas.height);
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
	

