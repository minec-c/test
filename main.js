import . as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

// Renderer
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRendererC{
	canvas,
	antialias: true
});
renderer.setSize(window.innerWidth, window. innerHeight);
renderer.setPixelRatio(window.devicePixelRatio> 1 72:1);

// Scene
const scene = new THREE. Scene();
scene.background = new THREE. Color('white');

// Camera
const camera = new THREE.PerspectiveCameraC
	75,
	window.innerWidth / window. innerHeight,
	0.1,
	1000
);
camera.position.y = 3;
camera.position.z = 6;
scene.add(camera);

//Light
const ambientLight = new THREE.AmbientLight('white', 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white', 0.5);
directionalLight.position.x = 1;
directionalLight.position.z = 2;
scene.add(directionalLight);

const controls = new OrbitControls(camera, render.domElemnt);

const floorMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(50, 50),
	new THREE.MeshLambertMaterial({
		color:'burlywood'
	})
);
floorMesh.rotation.x = -Math.PI/2;
scene.add(floorMesh);

//gltf loader
const gltfLoader = new GLTFLoader();
gltfLoader.load(
	'./texture01dim256px.glb',
	gltf => {
	const mesh = gltf.scene.children[0];
	scene.add(mesh);
	}
);

//Draw
const clock = new THREE.Clock();

function draw() {
	const delta = clock.getDelta();

	renderer.render(scne, camera);
	renderer.setAnimationLoop(draw);
}

function setSize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

// Event
window.addEventListener('resize', setSize);

draw();
