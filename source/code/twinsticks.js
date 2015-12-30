

	function Controller(type) {

		this.type = type;
		this.center = { x:0, y:0 };
		this.touch =  { x:0, y:0 };
		this.active = false;
		this.finger = false;

		this.color = ["rgba(0,255,0,0.3)", "rgba(0,255,0,0.8)"];

		this.move = function() {

		}

	}


















      var handlePanStart_player = function(event){

        f = controllers[0];
        f.active = true;
        f.finger  = true;

        f.center.x = event.pointers[0].offsetX;
        f.center.y = event.pointers[0].offsetY;

        f.touch.x = event.pointers[0].offsetX;
        f.touch.y = event.pointers[0].offsetY;

      }

      var handlePanEnd_player = function(event){

        f = controllers[0];
        f.active = false;

      }

      var handlePanMove_player = function(event){

        f = controllers[0];
        f.finger  = true;
        f.touch.x = event.pointers[0].offsetX;
        f.touch.y = event.pointers[0].offsetY;

        if (event.distance > 95) {
          f.finger = false;
        }

      }







      var handlePanStart_weapon = function(event){

        f = controllers[1];

        f.active = true;
        f.finger = true;

        f.center.x = event.pointers[0].offsetX + x/2;
        f.center.y = event.pointers[0].offsetY;

        f.touch.x = event.pointers[0].offsetX + x/2;
        f.touch.y = event.pointers[0].offsetY;

      }

      var handlePanEnd_weapon = function(event){

        f = controllers[1];
        f.active = false;

      }

      var handlePanMove_weapon = function(event){

        f = controllers[1];
        f.finger  = true;
        f.touch.x = event.pointers[0].offsetX + x/2;
        f.touch.y = event.pointers[0].offsetY;

        var direction = [event.deltaX/10, event.deltaY/-10];

        if (event.distance > 15 && event.distance < 95) {
          var active = true;
        }

        if (event.distance > 95) {
          f.finger = false;
        }

      }






















	var game = document.getElementById('game');

	var x = game.clientWidth;
	var y = game.clientHeight;
	var time;

	var controllerDIV = document.getElementById("controller");
	controllerDIV.width = x;
	controllerDIV.height = y;

	var context = controllerDIV.getContext('2d');

	var controllers = [new Controller('player'), new Controller('weapon')]




      var mcl = new Hammer.Manager(document.getElementById('inputLeft'), {});

      mcl.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );

      mcl.on("panstart", handlePanStart_player);
      mcl.on("panend",   handlePanEnd_player);
      mcl.on("panmove",  handlePanMove_player);



      var mcr = new Hammer.Manager(document.getElementById('inputRight'), {});

      mcr.add( new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );

      mcr.on("panstart", handlePanStart_weapon);
      mcr.on("panend",   handlePanEnd_weapon);
      mcr.on("panmove",  handlePanMove_weapon);



      animate();

      function animate() {

        requestAnimationFrame(animate);

        context.clearRect(0, 0, x, y);

        controllers.forEach(function (f, index) {

          if (f.active === true) {

            context.beginPath();
            context.arc(f.center.x, f.center.y, 100, 0, 2 * Math.PI, false);
            context.fillStyle = f.color[0];
            context.fill();
            context.lineWidth = 2;
            context.strokeStyle = '#FFFFFF';
            context.stroke();

            if (f.finger === true) {

              context.beginPath();
              context.arc(f.touch.x, f.touch.y, 10, 0, 2 * Math.PI, false);
              context.fillStyle = f.color[1];
              context.fill();

            }

          } 

        });

      }

