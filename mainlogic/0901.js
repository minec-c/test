import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {renderer} from '../mainlogic/02.js';
import {scene} from '../mainlogic/04.js';
import {camera} from '../mainlogic/05.js';
const axeshelper = new THREE.AxesHelper(5);
scene.add(axeshelper);
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
                  // //// First rotate from Y+ (up) to Z+ (forward)
                  //  plane.rotation.x=-Math.PI /2
                  // //// Then rotate around Y to point diagonally between X and Z
                  // plane.rotation.y= Math.PI /4      // 45 degrees
                  plane.traverse(function (node){
                  if (node.isMesh){ node.castShadow = true; node.receiveShadow = true; planemesh = node;}});
                  // plane.receiveShadow = true;
                  // plane.castShadow = true;
                  scene.add(plane);
                  handleGLTF(gltf);
                },
                undefined,
                function (error) {console.error('Error loading treetest01bbnoanim.glb:', 
                error);
});
// function animate(){
//   requestAnimationFrame(animate);
//   if(planemesh){
//     planemesh.lookAt(camera.position);
//   }
//   renderer.render(scene,camera);
// }
//LOOP MESH ALWAYS FACE CAMERA WHEN ROTATING LEFT OR RIGHT AND NOT UP OR DOWN

//HIGHT CPU USAGE (99%) BECAUSE UNCHECKED BOX 'Use graphics acceleration when available' THEN CPU DROP TO 20%
function animate(){
  requestAnimationFrame(animate);
  if (planemesh) {
     const posmesh = planemesh.getWorldPosition(new THREE.Vector3());
     const poscam = camera.position.clone();
     poscam.z = posmesh.z; // Lock the vertical rotation                  poscam.y = posmesh.y;
    poscam.x = posmesh.x;
     planemesh.lookAt(poscam);
  }
  renderer.render(scene,camera);
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

