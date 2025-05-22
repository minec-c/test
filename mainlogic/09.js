import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {renderer} from '../mainlogic/02.js';
import {scene} from '../mainlogic/04.js';
import {camera} from '../mainlogic/05.js';
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
let planemesh = null
// GLTF loader
const gltfLoader = new GLTFLoader();
gltfLoader.load('../gltf/texture01dim256px.glb', 
                function (gltf) {
                  const cube = gltf.scene;
                  cube.position.set(-25,0,0);
                  scene.add(cube);
                  handleGLTF(gltf);
                },
                undefined,
                function (error) {console.error('Error loading texture01dim256px.glb:', 
                error);
});
gltfLoader.load('../gltf/treetest02PBSDFnoanim.glb',
                function (gltf){
                  const plane = gltf.scene;
                  // plane.position.set(122,0,0);
                  plane.traverse(function (node){
                  if (node.isMesh){ node.castShadow = true; node.receiveShadow = true;  planemesh = node;}});
                  // plane.receiveShadow = true;
                  // plane.castShadow = true;
                  scene.add(plane);
                  handleGLTF(gltf);
                },
                undefined,
                function (error) {console.error('Error loading treetest01bbnoanim.glb:', 
                error);
});
function animate(){
  requestAnimationFrame(animate);
    if (planemesh){
      planemesh.lookAt(camera.position);
    }
    render.render(scene,camera);
  }
animate();
function handleGLTF(gltf) {  
  if (gltf.animations.length === 0){        console.log('No animations found in the GLB file.');   } 
  else {    gltf.animations.forEach(  function (clip, index) {      console.log(`Animation ${index}:`, clip.name);    });
  // const model = gltf.scene;
  mixer = new THREE.AnimationMixer(gltf.scene);
  gltf.animations.forEach(clip => mixer.clipAction(clip).play());
  }
}
export {mixer};

