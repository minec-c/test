import * as THREE from 'three';
import {scene} from '../mainlogic/04.js';
// Floor
const floorMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(50, 50),
	new THREE.MeshLambertMaterial({ color: 'forestgreen' })
);
floorMesh.rotation.x = -Math.PI / 2;
floorMesh.receiveShadow = true
scene.add(floorMesh);

