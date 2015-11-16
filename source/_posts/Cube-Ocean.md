title: Cube Ocean
tags: [webgl,three.js,demo]
layout: webgl
date: 2015-11-15 14:11:06
---
An ocean of cubes cycling up and down to a sin wave.

Cube Ocean demonstrates creating and reusing a geometry in THREE.js. With THREE.js you have a few options to create geometries, either building them individually, cloning them from objects, or creating and copying them. What you shoud use depends entirely on the use case for what you're writing.

In this example a simple BoxGeometry is stored in a variable and used as the geometry for creating an array of 400 cubes that move cyclically up and down following a sinusoidal curve in two dimensions - creating a simple "ocean wave" effect.
<!-- more -->
<div id="webglCanvas" style="width: 100%; height: 600px;"></div>
<script src="/code/cube-ocean/cube-ocean.js"></script>
```javascript

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

        }

        cameraPivot.rotation.y += 0.005;

        requestAnimationFrame( render );
        renderer.render( scene, camera );

    }

    render();


```