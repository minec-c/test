import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
// GLTF Loader
const gltfLoader = new GLTFLoader();
gltfLoader.load(
	'../gltf/texture01dim256px.glb',
	(gltf) => {
		const model = gltf.scene;
		scene.add(model);
	},
	undefined,
	(error) => {
		console.error('An error happened loading the GLTF model:', error);
	}
);

