import {camera} from '../mainlogic/05.js';
import {renderer} from '../mainlogic/02.js';
// Responsive
function setSize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', setSize);
