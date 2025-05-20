import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {renderer} from '../mainlogic/02.js';
import {scene} from '../mainlogic/04.js';
// // GLTF Loader
// const gltfLoader = new GLTFLoader();
// gltfLoader.load(
// 	'../gltf/texture01dim256px.glb',
// 	function (gltf){				//	(gltf) => {
// 		const model = gltf.scene;
// 		scene.add(model);
// 		const mixer = new THREE.AnimationMixer(model);
// 		const clips = gltf.animations;
// 		const clip = THREE.AnimationClip.findByName(clips, 'CubeAction');
// 		const action = mixer.clipAction(clip);
// 		action.play();
// 	},
// 	undefined,
// 	function(error){					//	(error) => {
// 		console.error('An error happened loading the GLTF model:', error);
// 	}
// );

// Animation variables
let mixer;

// GLTF loader
const gltfLoader = new GLTFLoader();
gltfLoader.load(
  '../gltf/texture01dim256px.glb', // Make sure this path is correct!
  (gltf) => {
    // (DEBUGING). Checking animation exist in gltf file:
    console.log('GLTF scene:', gltf.scene);
    console.log('Animation:', gltf.animations);
    
    if (gltf.animations.length === 0){
      console.log('No animaitons found in the GLB file.');
    } else {
      gltf.animations.forEach((clip, index) =>{
        console.log(`Animaiton ${index}:`, clip.name);
      });
    }
    // Continue normaly
    const model = gltf.scene;
    scene.add(model);

    mixer = new THREE.AnimationMixer(model);
    const clips = gltf.animations;
    const clip = THREE.AnimationClip.findByName(clips, 'CubeAction'); // Replace with your actual animation name
    if (clip) {
      const action = mixer.clipAction(clip);
      action.play();
    } else {
      console.warn('Animation "CubeAction" not found.');
    }
  },
  undefined,
  (error) => {
    console.error('An error occurred while loading the GLTF model:', error);
  }
);
export {mixer};

