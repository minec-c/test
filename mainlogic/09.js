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
                const cube = gltf.scene;
                cube.position.set(-122,0,0);
                scene.add(cube);
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
              if (child.isMesh) 
              {     const mat = child.material;        //check and fix transparency
                    if (mat.map && mat.alphaMap) {         
                      mat.transparent = true;          mat.alphaTest = 0.01;  // or 0.1 if using cutout style          mat.depthWrite = false;
                                                 }
                      // Fallback: if only one texture but has alpha channel
                    if (mat.map && mat.map.source.data) {          
                      const hasAlpha = mat.map.source.data instanceof HTMLImageElement && mat.map.source.data.src.includes('.png');
                          if (hasAlpha){
                                  mat.transparent = true;            mat.alphaTest = 0.01;            mat.depthWrite = false;
                                                         }              }
                  // Optional: oduble-sided if alpha reveal holes
                    mat.side = THREE.DoubleSide;
              }  
  });
  scene.add(model);
  const cube = model.getObjectByName('Cube');  
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
}
export {mixer};

