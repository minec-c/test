import * as THREE from 'three';
import {renderer} from '../mainlogic/02.js';
import {scene} from '../mainlogic/04.js';
// Animation
const clock = new THREE.Clock();
function draw() {
	const delta = clock.getDelta();
	renderer.render(scene, camera);
}
renderer.setAnimationLoop(draw);

