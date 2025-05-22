import * as THREE from 'three';
import {camera} from '../mainlogic/05.js';
import {scene} from '../mainlogic/04.js';
// Light
const ambientLight = new THREE.AmbientLight('white', 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('white', 0.5);
directionalLight.position.set(1, 1, 2);
scene.add(directionalLight);

//DIRECTIONAL LIGHT
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.x +=20;
dl.position.y +=20;
dl.position.z +=20;
dl.castShadow = true;
scene.add(dl);
