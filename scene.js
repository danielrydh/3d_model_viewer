var renderer,
  scene,
  camera,
  myCanvas = document.getElementById('myCanvas');

var day = "0xE3F0FF"
var night = "0x29282C"

//RENDERER
renderer = new THREE.WebGLRenderer({
  canvas: myCanvas,
  antialias: true
});
renderer.setClearColor(0xE3F0FF);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// set background
function setBackgroundColor(time) {
  renderer.setClearColor(time);
}

//CAMERA
camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);


//SCENE
scene = new THREE.Scene();

//LIGHTS
var light = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(light);

var light2 = new THREE.PointLight(0xffffff, 1.5, -20);
scene.add(light2);
light2.position.set(50, 50, 50);

var loader = new THREE.GLTFLoader();

loader.load('lingon.glb', handle_load);
loader.load('gubbar2.glb', handle_load2);



var mesh2
var mesh;

function handle_load(gltf) {

  console.log(gltf);
  mesh = gltf.scene;
  console.log(mesh.children[0]);
  mesh.children[0].material = new THREE.MeshLambertMaterial();
  scene.add(mesh);
  mesh.position.z = 0;
  mesh.position.y = -5;
}

function handle_load2(gltf, num) {

  console.log(gltf);
  mesh2 = gltf.scene;
  console.log(mesh2.children[0]);
  mesh2.children[0].material = new THREE.MeshLambertMaterial();
  scene.add(mesh2);
  mesh2.position.z = 0;
  mesh2.position.y = -5;
}

function handle_load(gltf) {

  console.log(gltf);
  mesh = gltf.scene;
  console.log(mesh.children[0]);
  mesh.children[0].material = new THREE.MeshLambertMaterial();
  scene.add(mesh);
  mesh.position.z = 0;
  mesh.position.y = -5;
}



//Controlls
var controls = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.set(0, 0, 20);
controls.update();

//RENDER LOOP
render();


var prevTime = Date.now();

function render() {
  controls.update();
  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

function removeEntity() {
  mesh2.visible = !mesh2.visible;
}

window.onkeydown = function(e) {
  var key = e.keyCode ? e.keyCode : e.which;

  if (key == 68) {
    setBackgroundColor(0xE3F0FF)
  } else if (key == 78) {
    setBackgroundColor(0x11001E)
  } else if (key == 71) {
    removeEntity()
  }
}