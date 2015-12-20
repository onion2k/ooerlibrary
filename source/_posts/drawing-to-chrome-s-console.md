title: "Drawing To Chrome's Console"
date: 2015-11-18 07:47:29
tags: [javascript, chrome]
---
In Chrome (and other browser's) you can style a console.log message by using a sprintf annotation - %c at the beginning of the log message and a second argument of a CSS style, eg;
```javascript
console.log("%cThis message will appear in blue.", "color:blue");
```
Using this idea and a canvas tag to read the colours of pixels in an image, we can use Chrome's console as a target to draw on.
<!-- more --> 
```javascript

    var img = document.createElement('img');
    img.src = 'vangogh.jpg';
    img.onload = function(){

        var s = "";
        var cols = [];

        var c = document.createElement('canvas');
        c.width  = img.width+2;
        c.height = img.height+2;

        var ctx = c.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,120,40);

        ctx.drawImage(img,1,1);

        for (var y = 0; y < img.height+2; y++) {
            if (y > 0) { s += '\n'; }
            for (var x = 0; x < img.width+2; x++) {
                s += '%c  ';
                var col = ctx.getImageData(x, y, 1, 1).data;
                var hex = "#" + ("000000" + toHex(col[0], col[1], col[2])).slice(-6);
                cols.push('background-color:'+hex+';');
            }
        }

        cols.unshift(s);

        console.log.apply(console, cols);

    }

    var toHex = function(r, g, b) {
        return ((r << 16) | (g << 8) | b).toString(16);
    }

```