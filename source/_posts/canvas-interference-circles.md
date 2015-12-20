title: Canvas Interference Circles
date: 2015-11-17 08:06:49
tags: [canvas,demo]
---
HTML5 canvases have a fun global setting called globalCompositeOperation - it's determines how pixels on the canvas are rendered when they're overwritten by a new operation. In effect they're the same sort of thing as Photoshop's layer modes.

In this script white concentric circles are draw on top of each other when the canvas is set to 'difference' so a white + white = black, giving a stripe effect. Two of these circle effects are then rotated around each other giving rise to a cool psychadelic demo.
<!-- more -->
<canvas id="canvas" style="width: 100%; height: 600px;"></canvas>
<script src="/code/canvas-interference-circles/canvas-interference-circles.js"></script>
```javascript

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');

    width = canvas.width;
    height = canvas.height;

    midx = width / 2;
    midy = height / 2;

    w = 30;
    circles = 10;

    theta = 0;

    ctx.globalCompositeOperation = 'difference';
    ctx.fillStyle = 'white';

    var render = function(dt){

        requestAnimationFrame( render );

        ctx.clearRect(0,0,width,height);

        for (var x =0; x < circles; x++) {

            var offsetx = Math.sin(theta) * 200;
            var offsety = Math.cos(theta) * 200;

            ctx.beginPath();
            ctx.arc(midx-offsetx,midy-offsety,((x+1)*w),0,2*Math.PI);
            ctx.fill();

        }

        for (var x =0; x < circles; x++) {

            var offsetx = Math.sin(theta) * 200;
            var offsety = Math.cos(theta) * 100;

            ctx.beginPath();
            ctx.arc(midx+offsetx,midy+offsety,((x+1)*w),0,2*Math.PI);
            ctx.fill();

        }

        theta += 0.025;

    }

    render();
```