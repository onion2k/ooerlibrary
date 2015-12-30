
    var el = document.getElementById('webglCanvas');
    var renderer = new THREE.WebGLRenderer({antialias:true});
    var counter = 0;
    var rads = Math.PI/180;

    renderer.setSize( el.offsetWidth, el.offsetHeight );
    el.appendChild( renderer.domElement );

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 100, el.offsetWidth / el.offsetHeight, 0.1, 1000 );
    var cameraPivot = new THREE.Object3D();
    camera.position.x = 0;
    camera.position.y = 30;
    camera.position.z = -100;
    camera.lookAt(new THREE.Vector3(0,0,0))
    cameraPivot.add(camera);
    scene.add(cameraPivot);

    var light = new THREE.AmbientLight( 0x222222 );
    scene.add( light );

/*
    var light = new THREE.PointLight( 0xffffff, 1, 1000 );
    light.position.set( 0, 0, -100 );
    scene.add( light );

    var light = new THREE.PointLight( 0xffffff, 1, 1000 );
    light.position.set( 100, 200, -100 );
    scene.add( light );
*/
    cubes = [];

    var bauble = new THREE.SphereGeometry( 2, 16 );
    var bauble1 = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xff8888, shininess: 30 } );

    var light1 = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff, shininess: 50, emissive: 0xff0000 } );
    var light2 = new THREE.MeshPhongMaterial( { color: 0x00ff00, specular: 0xffffff, shininess: 50, emissive: 0x00ff00 } );

    var Tree = function(){

        this.count = 120;
        this.scale = 1;
        this.vertical = 150;
        this.horizontal = 100;
        this.twists = 4;

        this.branches = 4;
        this.distance = 0.5;
        this.offset = 1;
        this.speed = 1;
        this.baublesOnOff = true;
        this.lightsOnOff = true;

        this.treeGeometry = new THREE.BoxGeometry( 5, 5, 5 );
        this.treeMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00, specular: 0xffffff, shininess: 10 } );

        this.baseGeometry = new THREE.CylinderGeometry( 25, 20, 40, 32 );
        this.baseMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xff0000, shininess: 50 } );

        this.starGeometry = new THREE.SphereGeometry( 3, 16);
        this.starMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xffffff, shininess: 50 } );

        this.build = function() {

            scene.remove(this.tree);
            scene.remove(this.base);
            scene.remove(this.star);
            scene.remove(this.baubles);
            scene.remove(this.lights);

            this.tree = new THREE.Object3D();
            this.baubles = new THREE.Object3D();
            this.lights = new THREE.Object3D();

            this.base = new THREE.Mesh(this.baseGeometry, this.baseMaterial);
            this.base.position.y = -1 * this.vertical / 2 - 20;

            this.star = new THREE.Mesh(this.starGeometry, this.starMaterial);
            this.star.position.y = this.vertical / 2 - 5;

            this.treeMesh = new THREE.Geometry();

            for (var branch = 0; branch < this.branches; branch++) {

                this.branch(
                    this.count, 
                    this.treeGeometry, 
                    this.treeMaterial, 
                    this.twists,
                    (this.vertical / this.count), 
                    (this.horizontal / this.branches), 
                    this.distance * (branch+1),
                    (2 * Math.PI / this.branches) * branch,
                    (this.baublesOnOff && branch > this.branches - 4 ? true : false),
                    (this.lightsOnOff && branch === this.branches - 1 ? true : false)
                );
            }

            this.tree.add(this.base);
            this.tree.add(this.star);
            this.tree.add(new THREE.Mesh(this.treeMesh, this.treeMaterial));
            scene.add(this.tree);
            scene.add(this.baubles);
            scene.add(this.lights);

        }

        this.branch = function(count, geometry, material, twists, vertical, horizontal, distance, offset, baubles, lights) {

            for (var x=0; x < count; x++) {

                var s = (1-(x/count)) * this.scale;

                var c = new THREE.Mesh( geometry, material );

                c.rotation.y = ((twists*360/count) * x * rads) + offset;
                c.position.y = (-(count/2) * vertical) + x * vertical;

                c.translateX(horizontal * (1-(x/count)) * distance);

                c.scale.x = c.scale.y = c.scale.z = s;

                c.updateMatrix();

                this.treeMesh.merge(c.geometry, c.matrix);


                if (x < count*0.9 && x % 10 === 0 && baubles == true) {

                    var b = new THREE.Mesh(bauble, bauble1);

                    b.rotation.y = ((twists*360/count) * x * rads) + offset;
                    b.position.y = (-(count/2) * vertical) + x * vertical - 3;

                    b.translateX(horizontal * (1-(x/count)) * distance);

                    this.baubles.add(b);

                }

                if (x < count*0.9 && x % 7 === 0 && lights == true) {

                    if (x % 2 === 0) {
                        var m = light1;
                        var col = 0xff0000;
                    } else {
                        var m = light2;
                        var col = 0x00ff00;
                    }

                    var l = new THREE.Mesh(bauble, m);

                    l.scale.x = l.scale.y = l.scale.z = 0.5;

                    l.rotation.y = ((twists*360/count) * x * rads) + offset;
                    l.position.y = (-(count/2) * vertical) + x * vertical - 2;

                    l.translateX(horizontal * (1-(x/count)) * distance);

                    this.lights.add(l);

                    var light = new THREE.PointLight( col, 1, 60 );
                    light.position.x = l.position.x;
                    light.position.y = l.position.y;
                    light.position.z = l.position.z;

                    this.lights.add(light);

                }

            }

        }

    }


    var gui = new dat.GUI({ autoPlace: false });
    var tree = new Tree();
    tree.build();
    
    var branchesController = gui.add(tree, 'branches', 1, 20).step(1);
    var countController = gui.add(tree, 'count', 10, 200).step(10);
    var scaleController = gui.add(tree, 'scale', 0, 2).step(0.1);
    var twistsController = gui.add(tree, 'twists', 0, 24).step(1);
    var distanceController = gui.add(tree, 'distance', 0, 1);
    var hSpaceController = gui.add(tree, 'horizontal', 50, 200).step(5);
    var vSpaceController = gui.add(tree, 'vertical', 50, 200).step(5);
    var speedController = gui.add(tree, 'speed', -5, 5).step(1);
    var baublesController = gui.add(tree, 'baublesOnOff');
    var lightsController = gui.add(tree, 'lightsOnOff');

    branchesController.onChange(function(value) {
      tree.build();
    });

    countController.onChange(function(value) {
      tree.build();
    });

    scaleController.onChange(function(value) {
      tree.build();
    });

    twistsController.onChange(function(value) {
      tree.build();
    });

    distanceController.onChange(function(value) {
      tree.build();
    });

    hSpaceController.onChange(function(value) {
      tree.build();
    });

    vSpaceController.onChange(function(value) {
      tree.build();
    });

    speedController.onChange(function(value) {
      tree.build();
    });

    baublesController.onChange(function(value) {
      tree.build();
    });

    lightsController.onChange(function(value) {
      tree.build();
    });

    var webglCanvas = document.getElementById('webglCanvas');
    webglCanvas.appendChild(gui.domElement);

    render = function() {

        counter++;

        cameraPivot.rotation.y += (tree.speed / 100);

        requestAnimationFrame( render );
        renderer.render( scene, camera );

    }

    render();

