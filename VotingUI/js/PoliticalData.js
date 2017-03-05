function Person(FirstName, LastName, DateOfBirth, Liberal_sc, Libertarian_sc, ProEU_sc, Bio, Beliefs, Party, Country) {
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.DateOfBirth = DateOfBirth;
    this.Liberal_sc = Liberal_sc;
    this.Libertarian_sc = Libertarian_sc;
    this.ProEU_sc = ProEU_sc;
    this.Bio = Bio;
    this.Beliefs = Beliefs;
    this.Party = Party;
    this.Country = Country;
}

var p1 = new Person("Emmanuel", "Macron", "", 80, 70, 80,"","","En Marche!","FR");
var p2 = new Person("Jean-Luc", "Mélenchon", "", 95, 10, 60,"","","La France Insoumise","FR");
var p3 = new Person("Marine", "Le Pen", "", 0, 10, 10,"","","La France Insoumise","FR");
var p4 = new Person("François", "Fillon", "", 10, 95, 40,"","","La France Insoumise","FR");
var Candidates = [p1, p2, p3, p4];
if (!Detector.webgl) Detector.addGetWebGLMessage();

var renderer, scene, camera, stats, rayCaster, mousePosition, domeEvents, crosshair;
var objects = [];
var textlabels = [];

var WIDTH = window.innerWidth/1.5,
    HEIGHT = window.innerHeight/1.5;
var dimension = 512;
var perspective = true;
init();
animate();

function init() {
    scene = new THREE.Scene();
    if(perspective)
    {
        camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 1, 3000 );
        camera.position.z = 1300;
        scene.fog = new THREE.Fog(0xeaeaea, 800, 2000);
    }
    else
    {
        camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, -2000, 2000);
        scene.fog = new THREE.Fog(0xeaeaea, 200, -600);
    }
    renderer = new THREE.WebGLRenderer({ antialias: true });
    domEvents   = new THREEx.DomEvents(camera, renderer.domElement);

    for (i = 0; i < Candidates.length; i++) {
        AddPoint(Candidates[i].FirstName + " " + Candidates[i].LastName, Candidates[i].Libertarian_sc, Candidates[i].Liberal_sc, Candidates[i].ProEU_sc, scene);
    }
    objects.name = 'MyObj_s';

    var geometryCube = cube(dimension);
    geometryCube.computeLineDistances();
    var object = new THREE.LineSegments(geometryCube, new THREE.LineBasicMaterial({ color: 0x002F55, linewidth: 1 }));
    objects.push(object);
    scene.add(object);

    var loader = new THREE.TextureLoader();
    loader.load('../img/chart/Back.png', function ( texture ) {
        var geometry = new THREE.PlaneGeometry( dimension, dimension );
        var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5, transparent: true});
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.z = dimension/2;
        scene.add(mesh);
    });
    loader.load('../img/chart/Front.png', function ( texture ) {
        var geometry = new THREE.PlaneGeometry( dimension, dimension );
        var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5, transparent: true});
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.z = -(dimension/2);
        mesh.rotation.y = Math.PI;
        scene.add(mesh);
    });
    loader.load('../img/chart/Bottom.png', function ( texture ) {
        var geometry = new THREE.PlaneGeometry( dimension, dimension );
        var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5, transparent: true});
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = -(dimension/2);
        mesh.rotation.x = Math.PI/2;
        scene.add(mesh);
    });
        loader.load('../img/chart/Top.png', function ( texture ) {
        var geometry = new THREE.PlaneGeometry( dimension, dimension );
        var material = new THREE.MeshBasicMaterial({map: texture, overdraw: 0.5, transparent: true});
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = dimension/2;
        mesh.rotation.x = Math.PI/2;
        mesh.rotation.y = Math.PI;
        mesh.rotation.z = Math.PI;
        scene.add(mesh);
    });

    renderer.setClearColor(0xeaeaea);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);

    var container = document.getElementById('container');
    container.appendChild(renderer.domElement);

    stats = new Stats();
    container.appendChild(stats.dom);

    //controls
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.update();

    window.addEventListener('resize', onWindowResize, false);
}
function createTextLabel() {
    var div = document.createElement('div');
    div.className = 'text-label';
    div.style.position = 'absolute';
    div.style.width = 100;
    div.style.height = 100;
    div.style.color = "#C73E12";
    div.innerHTML = "hi there!";
    div.style.top = -1000;
    div.style.left = -1000;
    
    var _this = this;
    
    return {
      element: div,
      parent: false,
      position: new THREE.Vector3(0,0,0),
      setHTML: function(html) {
        this.element.innerHTML = html;
      },
      setParent: function(threejsobj) {
        this.parent = threejsobj;
      },
      updatePosition: function() {
        if(parent) {
          this.position.copy(this.parent.position);
        }
        
        var coords2d = this.get2DCoords(this.position, _this.camera);
        this.element.style.left = coords2d.x+12 + 'px';
        this.element.style.top = coords2d.y+124 + 'px';
      },
      get2DCoords: function(position, camera) {
        var vector = position.project(camera);
        vector.x = (vector.x + 1)/2 * WIDTH;
        vector.y = -(vector.y - 1)/2 * HEIGHT;
        return vector;
      }
    };
}

function cube(size) {

    var h = size * 0.5;

    var geometry = new THREE.Geometry();

    geometry.vertices.push(
        new THREE.Vector3(-h, -h, -h),
        new THREE.Vector3(-h, h, -h),
        
        new THREE.Vector3(-h, h, -h),
        new THREE.Vector3(h, h, -h),

        new THREE.Vector3(h, h, -h),
        new THREE.Vector3(h, -h, -h),

        new THREE.Vector3(h, -h, -h),
        new THREE.Vector3(-h, -h, -h),


        new THREE.Vector3(-h, -h, h),
        new THREE.Vector3(-h, h, h),

        new THREE.Vector3(-h, h, h),
        new THREE.Vector3(h, h, h),

        new THREE.Vector3(h, h, h),
        new THREE.Vector3(h, -h, h),

        new THREE.Vector3(h, -h, h),
        new THREE.Vector3(-h, -h, h),

        new THREE.Vector3(-h, -h, -h),
        new THREE.Vector3(-h, -h, h),

        new THREE.Vector3(-h, h, -h),
        new THREE.Vector3(-h, h, h),

        new THREE.Vector3(h, h, -h),
        new THREE.Vector3(h, h, h),

        new THREE.Vector3(h, -h, -h),
        new THREE.Vector3(h, -h, h)
    );

    return geometry;

}
function cross(size, x, y, z) {

    var h = size * 0.5;

    var geometry = new THREE.Geometry();

    geometry.vertices.push(
        new THREE.Vector3(x,y, -(dimension/2)),
        new THREE.Vector3(x, y, dimension/2)
    );
    geometry.vertices.push(
        new THREE.Vector3(x,-(dimension/2), z),
        new THREE.Vector3(x, (dimension/2), z)
    );
    geometry.vertices.push(
        new THREE.Vector3(-(dimension/2),y, z),
        new THREE.Vector3(dimension/2, y, z)
    );
    return geometry;

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
    requestAnimationFrame(animate);
    render();
    stats.update();

}

function render() {

    var time = Date.now() * 0.001;

    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
    }
    for (var i = 0; i < this.textlabels.length; i++) {
      this.textlabels[i].updatePosition();
    }
    renderer.render(scene, camera);

}

function AddPoint(label, x, y, z, scene) {
      var material = new THREE.MeshBasicMaterial({
        color: 0xC73E12, depthWrite: false
      });
      var geometry = new THREE.SphereGeometry(12, 48, 48 );
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (x-50)*(dimension/100);
      mesh.position.y = (y-50)*(dimension/100);
      mesh.position.z = (z-50)*((-dimension)/100);
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      scene.add(mesh);
      
      var text = this.createTextLabel();
      text.setHTML(label);
      text.setParent(mesh);
      this.textlabels.push(text);
      this.container.appendChild(text.element);
      domEvents.addEventListener(mesh, 'mouseover', function(event){
           var geometryCube = cross(dimension, mesh.position.x, mesh.position.y, mesh.position.z);
           geometryCube.computeLineDistances();
           crosshair = new THREE.LineSegments(geometryCube, new THREE.LineBasicMaterial({ color: 0xC73E12, linewidth: 1 }));
           scene.add(crosshair);
        }, false)
      domEvents.addEventListener(mesh, 'mouseout', function(event){
           scene.remove(crosshair);
        }, false)
}