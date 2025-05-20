import * as THREE from 'three';
// Floor
const floorMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(50, 50),
	new THREE.MeshLambertMaterial({ color: 'burlywood' })
);
floorMesh.rotation.x = -Math.PI / 2;
scene.add(floorMesh);

