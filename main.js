import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Renderer
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('white');

// Camera
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.set(0, 3, 6);
scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight('white', 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white', 0.5);
directionalLight.position.set(1, 1, 2);
scene.add(directionalLight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Floor
const floorMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(50, 50),
	new THREE.MeshLambertMaterial({ color: 'burlywood' })
);
floorMesh.rotation.x = -Math.PI / 2;
scene.add(floorMesh);

// GLTF Loader
const gltfLoader = new GLTFLoader();
gltfLoader.load(
	'./texture01dim256px.glb',
	(gltf) => {
		const model = gltf.scene;
		scene.add(model);
	},
	undefined,
	(error) => {
		console.error('An error happened loading the GLTF model:', error);
	}
);

// Animation
const clock = new THREE.Clock();
function draw() {
	const delta = clock.getDelta();
	renderer.render(scene, camera);
}
renderer.setAnimationLoop(draw);

// Responsive
function setSize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', setSize);
