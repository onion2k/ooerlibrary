
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
    camera.position.x = 0;
    camera.position.y = 20;
    camera.position.z = -20;
    camera.lookAt(new THREE.Vector3(0,0,0))
    cameraPivot.add(camera);
    scene.add(cameraPivot);

    var light = new THREE.PointLight( 0xffffff, 1, 1000 );
    light.position.set( 0, 40, -40 );
    scene.add( light );

    cubes = [];
    velocity = 0.025;
    counter = 0;
    cubeCount = 20;

    hub = new THREE.Object3D();

    rings = [];
    for (var r = 0; r < cubeCount; r++) {
        rings.push(new THREE.Object3D());
        hub.add(rings[r]);
    }

    scene.add(hub)

    var geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
    var m = new THREE.MeshPhongMaterial( { color: 0x00ff00, specular: 0xffffff, shininess: 20 } );

    var xspacing = ((2*Math.PI)/(cubeCount));
    var yspacing = ((2*Math.PI)/cubeCount);
    var r = 20.0;

    for (var x=0; x < (cubeCount/2); x++) {

        for (var y=0; y < cubeCount; y++) {

            tr = r;
            
            tx = xspacing*x;
            ty = yspacing*y;

            var c = new THREE.Mesh( geometry, m );
            rings[y].add(c);

            c.scale.x = c.scale.y = 2;
            c.scale.z = 4;

            c.rotation.x = tx;
            c.rotation.y = ty;

            c.translateZ(tr);

            cubes.push(c);

        }

    }




    render = function() {


        for (var r = 0; r < cubeCount; r++) {
            if (r%2===0) {
                rings[r].rotation.x += -0.01;
            } else {
                rings[r].rotation.x += 0.005;
            }
        }

        hub.rotation.y += 0.01;
        hub.rotation.z += 0.01;

        requestAnimationFrame( render );
        renderer.render( scene, camera );

    }

    render();

