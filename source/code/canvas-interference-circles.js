
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
