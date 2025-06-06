import * as THREE from 'three';
import {scene} from '../mainlogic/04.js';
// Camera
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.set(0, 3, 6);
scene.add(camera);
export {camera};
