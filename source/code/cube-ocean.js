
    var el = document.getElementById('webglCanvas');
    var renderer = new THREE.WebGLRenderer({antialias:true});
    var counter = 0;
    var rads = Math.PI/180;
    var wavelength = 10;

    renderer.setSize( el.offsetWidth, el.offsetHeight );
    el.appendChild( renderer.domElement );

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 100, el.offsetWidth / el.offsetHeight, 0.1, 1000 );
    var cameraPivot = new THREE.Object3D();
    camera.position.x = 100;
    camera.position.y = 50;
    camera.position.z = -100;
    camera.lookAt(new THREE.Vector3(0,0,0))
    cameraPivot.add(camera);
    scene.add(cameraPivot);

    var light = new THREE.PointLight( 0xffffff, 1, 1000 );
    light.position.set( 0, 30, 15 );
    scene.add( light );

    cubes = [];

    var geometry = new THREE.BoxGeometry( 10, 10, 10 );
    var material = new THREE.MeshPhongMaterial( { color: 0x0000ff, specular: 0xffffff, shininess: 20 } );

    var spacing = 15.0;

    for (var x=0; x < 20; x++) {
        for (var z=0; z < 20; z++) {

            var c = new THREE.Mesh( geometry, material );
            c.position.x = (x*spacing) - (10*spacing);
            c.position.z = (z*spacing) - (10*spacing);
            c.position.y = 2 - (x/5);
            c.yv = x * 30;
            c.xv = z * 30;
            cubes.push(c);
            scene.add(c);

        }
    }


    render = function() {

        counter++;

        for (var x=0; x<400; x++) {

            cubes[x].position.y = (Math.sin((cubes[x].yv + counter) * rads) * wavelength) + (Math.sin((cubes[x].xv + counter) * rads) * wavelength);
            //cubes[x].rotation.y += 0.02;
            //cubes[x].rotation.z += 0.01;

        }

        cameraPivot.rotation.y += 0.005;

        requestAnimationFrame( render );
        renderer.render( scene, camera );

    }

    render();

