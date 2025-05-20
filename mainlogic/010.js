import * as THREE from 'three';
import {renderer} from '../mainlogic/02.js';
import {scene} from '../mainlogic/04.js';
import {camera} from '../mainlogic/05.js';
import {mixer} from '../mainlogic/09.js';
// Animation
const clock = new THREE.Clock();
function draw() {
	const delta = clock.getDelta();
	if (mixer) mixer.update(delta);
	renderer.render(scene, camera);
	//rederer.setAnimationLoop(draw); ////SILENT BUG: BLACK SCREEN AND ZERO PUSH ERRORS
}
renderer.setAnimationLoop(draw);

