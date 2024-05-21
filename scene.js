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
var light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);



var loader = new THREE.GLTFLoader();

loader.load('snackor3.glb', handle_load);





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



//Controlls
var controls = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.set(12, 8, 22);
camera.rotation.set(

  -0.34751610145038664,

  0.4892464794221476,

  0.16861119791985155)
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