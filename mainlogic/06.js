import * as THREE from 'three';
import {camera} from '../mainlogic/05.js';
// Light
const ambientLight = new THREE.AmbientLight('white', 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white', 0.5);
directionalLight.position.set(1, 1, 2);
scene.add(directionalLight);

