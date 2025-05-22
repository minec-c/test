import * as THREE from 'three';
import {scene} from '../mainlogic/04.js';
//Load texture
const texloader = new THREE.TextureLoader();
const grasstex = texloader.load('../texture/grass2web02.png');
//Optional: Repea texture if needed
grasstex.wrapS = THREE.RepeatWrapping;
grasstex.wrapT = THREE.RepeatWrapping;
grasstex.repeat.set(10,10); //Adjust tiling here
// Floor
const floorMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(11, 11),
	// new THREE.MeshLambertMaterial({ color: 'forestgreen' })
	new THREE.MeshLambertMaterial({map:grasstex, wireframe:false}),
	//GRID PlaneGeometry making not visible
);
floorMesh.rotation.x = -Math.PI / 2;
floorMesh.receiveShadow = true
scene.add(floorMesh);

