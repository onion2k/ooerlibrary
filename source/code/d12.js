	
	var dice;
	var el = document.getElementById('webglCanvas');
	var renderer = new THREE.WebGLRenderer({antialias:true});

	renderer.shadowMapEnabled = true;
	renderer.setSize( el.offsetWidth, el.offsetHeight );
	el.appendChild( renderer.domElement );

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, el.offsetWidth / el.offsetHeight, 0.1, 1000 );
	camera.position.z = 1;
	camera.position.y = 2;
	camera.lookAt(new THREE.Vector3(0,0,0))

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    var planeMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = -4;
    plane.position.z = 0;
    // add the plane to the scene
    scene.add(plane);

	var light = new THREE.SpotLight( 0xffffff );
	light.position.set( 3, 5, 5 );
	scene.add( light );

	var light2 = new THREE.PointLight( 0xffffff, 1, 5 );
	light2.position.set( -2, 3, 2 );
	scene.add( light2 );

	var loader = new THREE.ColladaLoader();
		loader.options.convertUpAxis = true;
		loader.load( '/code/d12.dae', function ( collada ) {

			dice = collada.scene;
			dice.updateMatrix();
			scene.add(dice);

			render();

		} );

	render = function() {

		dice.rotation.z -= 0.01;
		dice.rotation.x += 0.01;

		requestAnimationFrame( render );
		renderer.render( scene, camera );
	}
