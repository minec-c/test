import * as THREE from 'three';
// Animation
const clock = new THREE.Clock();
function draw() {
	const delta = clock.getDelta();
	renderer.render(scene, camera);
}
renderer.setAnimationLoop(draw);

