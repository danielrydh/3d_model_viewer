var renderer,
  scene,
  camera,
  myCanvas = document.getElementById('myCanvas');

var day = "0x8DA5CC"
var night = "0x29282C"

//RENDERER
renderer = new THREE.WebGLRenderer({
  canvas: myCanvas,
  antialias: true
});
renderer.setClearColor(0x182740);
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
var light = new THREE.AmbientLight(day, 1);

scene.add(light);

let skyboxGeo = new THREE.BoxGeometry(100, 100, 100);
const ft = new THREE.TextureLoader().load("ft.jpg");
const a1 = new THREE.MeshBasicMaterial({ map: ft, side: THREE.BackSide });

const bk = new THREE.TextureLoader().load("bk.jpg");
const a2 = new THREE.MeshBasicMaterial({ map: bk, side: THREE.BackSide });

const up = new THREE.TextureLoader().load("up.jpg");
const a3 = new THREE.MeshBasicMaterial({ map: up, side: THREE.BackSide });

const dn = new THREE.TextureLoader().load("dn.jpg");
const a4 = new THREE.MeshBasicMaterial({ map: dn, side: THREE.BackSide });

const rt = new THREE.TextureLoader().load("rt.jpg");
const a5 = new THREE.MeshBasicMaterial({ map: rt, side: THREE.BackSide });

const lf = new THREE.TextureLoader().load("lf.jpg");
const a6 = new THREE.MeshBasicMaterial({ map: lf, side: THREE.BackSide });
var materialArray = [a1,a2,a3,a4,a5,a6]
let skybox = new THREE.Mesh(skyboxGeo, materialArray);
skybox.rotation.y += 1.2;
scene.add(skybox);

const light2 = new THREE.PointLight( 0xF2F2CE, 2, 100 );
light2.position.set( 50, 50, 20 );
scene.add( light2 );

const light3 = new THREE.PointLight( 0xF2F2CE, 1, 100 );
light2.position.set( 50, 20, 30 );
scene.add( light3 );


var loader = new THREE.GLTFLoader();

loader.load('b2.glb', handle_load);





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

camera.position.set(22.5, -1.53, 10.9);
camera.rotation.set(

 
  0.139,

  1.116,

  -0.1257,
)
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