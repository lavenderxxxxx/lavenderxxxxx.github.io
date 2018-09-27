var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// Create gradient
var grd = ctx.createLinearGradient(0, 0, 200, 0);
grd.addColorStop(0, 'hsl(0, 100%, 50%)');
grd.addColorStop(1, 'hsl(122, 100%, 50%)');

// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(10, 10, 150, 80);