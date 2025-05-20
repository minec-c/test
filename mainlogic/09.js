import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {renderer} from '../mainlogic/02.js';
import {scene} from '../mainlogic/04.js';
// GLTF Loader
const gltfLoader = new GLTFLoader();
gltfLoader.load(
	'../gltf/texture01dim256px.glb',
	function (gltf){				//	(gltf) => {
		const model = gltf.scene;
		scene.add(model);
		const mixer = new THERR.AnimationMixer(model);
		const clip = gltf.animations;
		const clip = THREE.AnimationClip.findByName(clips, 'CubeAction');
		const action = mixer.clipAction(clip);
		action.play();
	},
	undefined,
	function(error){					//	(error) => {
		console.error('An error happened loading the GLTF model:', error);
	}
);

