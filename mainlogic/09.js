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
gltfLoader.load('../gltf/texture01dim256px.glb', 
                function (gltf){  handleGLTF(gltf);}, undefined, function (error) {console.error('Error loading texture01dim256px.glb:', 
                error);
});
gltfLoader.load('../gltf/treetest02PBSDFnoanim.glb', 
                function (gltf){  handleGLTF(gltf);}, undefined, function (error) {console.error('Error loading treetest01bbnoanim.glb:', 
                error);
});

function handleGLTF(gltf) {  console.log('GLTF scene:', gltf.scene);  console.log('Animation:', gltf.animation);
  if (gltf.animations.length === 0){    console.log('No animations found in the GLB file.');
                                  } 
  else {    gltf.animations.forEach(  function (clip, index) {      console.log(`Animation ${index}:`, clip.name);    });
       }
  //ADDED 2005252111
  const model = gltf.scene;
  //ADDED 2105250001  //FIX MATERIALS (transparency/emissive)
  model.traverse  (  function (child){
              //2105251428 MOVE SPECIFIC MESH
              // if (child.isMesh && child.name === 'Cube'){child.position.set(111, 111, 0);}
              if (child.name === 'Cube') { child.position.set(112, 112, 0);}
              if (child.isMesh) 
              {     const mat = child.material;        //check and fix transparency
                    if (mat.map && mat.alphaMap) {          mat.transparent = true;          mat.alphaTest = 0.01;  // or 0.1 if using cutout style          mat.depthWrite = false;
                                                 }
                      // Fallback: if only one texture but has alpha channel
                    if (mat.map && mat.map.source.data) {          const hasAlpha = mat.map.source.data instanceof HTMLImageElement && mat.map.source.data.src.includes('.png');
                                                            if (hasAlpha){
                                                                          mat.transparent = true;            mat.alphaTest = 0.01;            mat.depthWrite = false;
                                                         }              }
                  // Optional: oduble-sided if alpha reveal holes
                    mat.side = THREE.DoubleSide;
                // //FIX Transparency
                // if (mat.transparent !== true && mat.alphaMap) {
                //   mat.transparent = true;
                //   mat.depthWrite = false;
                //   mat.alphaTest = 0.1; //or 0.01 depending on the texture
                // }
                // // OPtional: force emission to be visible
                // if (mat.emissive && mat.emissiveIntensity == 0){
                //   mat.emissiveIntensity = 1;
                // }
                // // Optional: disable furstum culling if model disappears when off-center
                // child.frustumCulled = false;
              }  
  });
  scene.add(model);
  // model.traverse(function (child) {
  //   if (child.isMesh && child.name === 'Cube') {
  //     child.position.set(112, 112, 0);
  //     console.log('Move Cube: ', child.position);
  //   }
  // });
  const cube = model.getObjectByName('Cube');
  if (cube && cube.isMesh){
    cube.position.set(112, 112, 0);
    console.log('Moved Cube:', cube.position);
  }
  //List all mesh names
  model.traverse(function (child){ if (child.isMesh) { console.log('Found mesh name: ',child.name);}});
  //Find hierarchy and parents of child or meash:
  model.traverse(function (child) {
    console.log(`${child.type} - ${child.name} - Parent: ${child.parent?.name}`);
  });
  
  if (gltf.animations.length > 0) {
    mixer = new THREE.AnimationMixer(model);
    const clip = THREE.AnimationClip.findByName(gltf.animations, 'CubeAction');
    if (clip) {  const action = mixer.clipAction(clip);
      action.play();
    } else {      console.warn('Animation "CubeAction" not found.');
    }
  }
}        //func handleGLTF(gltf)
// gltfLoader.load(
//   '../gltf/texture01dim256px.glb', // Make sure this path is correct!
//                 // function(gltf){   (DEBUGING). Checking animation exist in gltf file:
//   function(gltf){console.log('GLTF scene:', gltf.scene);console.log('Animation:', gltf.animations);
//                                 if (gltf.animations.length === 0){console.log('No animaitons found in the GLB file.');
//                                                                   }
//                                 else {  gltf.animations.forEach(  function(clip, index){  console.log(`Animaiton ${index}:`, clip.name);
//                                      }                         );                      }
//                                 ////Continue normaly
//                                 const model = gltf.scene;
//                                 scene.add(model);
//                                 mixer = new THREE.AnimationMixer(model);
//                                 const clips = gltf.animations;
//                                 const clip = THREE.AnimationClip.findByName(clips, 'CubeAction'); // Replace with your actual animation name
//                                 if (clip) { const action = mixer.clipAction(clip);
//                                               action.play();
//                                             } 
//                                 else {console.warn('Animation "CubeAction" not found.');
//                                      }  
//                 },
//   undefined,
//   (error) => {console.error('An error occurred while loading the GLTF model:', error);}
// ); ////gltfLoader.load('../gltf/texture01dim256x.glb', // Make sure this path is correct!
export {mixer};

