import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {renderer} from '../mainlogic/02.js';
import {scene} from '../mainlogic/04.js';
import {camera} from '../mainlogic/05.js';
import {controls} from '../mainlogic/07.js';
const axeshelper = new THREE.AxesHelper(5);
scene.add(axeshelper);

let mixer;
let planemesh = null;
let instancedmesh = null;
let dummy = null;
let count = null;
const gltfLoader = new GLTFLoader();
const instancePositions =[];
gltfLoader.load('../gltf/treetest02PBSDFnoanim.glb',
                function (gltf){
                  const plane = gltf.scene;
                  plane.traverse(	function (node)		{
                  	if (node.isMesh){ 	node.castShadow = true; node.receiveShadow = true; planemesh = node;
						count = 11;
						instancedmesh = new THREE.InstancedMesh(planemesh.geometry, planemesh.material, count);
						dummy = new THREE.Object3D();
						for (let i = 0;i<count;i++){
							const pos = new THREE.Vector3( Math.random()*5-1, 0.45, Math.random()*5-1);
							instancePositions.push(pos);
							dummy.position.set( Math.random() * 4 - 1, 0.45, Math.random() * 4 - 1,);
							dummy.rotation.x = Math.PI / 2;
							dummy.scale.set(1/2,1/2,1/2);
							//dummy.rotation.z = -camera.rotation.z;
							dummy.updateMatrix();
							instancedmesh.setMatrixAt(i, dummy.matrix);
							
						}
					 	instancedmesh.castShadow = true;
					 	instancedmesh.receiveShadow = true;
						scene.add(plane);
						scene.add(instancedmesh);
			}						//if(node.isMesh
		  }); 							//plane.traverse
                  handleGLTF(gltf);
                },
                undefined,
                function (error) {console.error('Error loading treetest01bbnoanim.glb:', error);
});


controls.addEventListener(	'change', function()	{
	  if (instancedmesh && planemesh) {				  // Update the instanced mesh if rotation has changed
		    for (let i = 0; i < count; i++) {
			    dummy.position.copy(instancePositions[i]);
			      dummy.rotation.z = planemesh.rotation.z;
			      dummy.updateMatrix();
			      instancedmesh.setMatrixAt(i, dummy.matrix);
		    }
		    instancedmesh.instanceMatrix.needsUpdate = true;
 	 }
	  // Match plane rotation with camera rotation
	  planemesh.rotation.z = -camera.rotation.z;
	  renderer.render(scene, camera);
});
renderer.render(scene, camera);						// Initial render



function handleGLTF(gltf) {  
  if (gltf.animations.length === 0){        console.log('No animations found in the GLB file.');   } 
  else {    gltf.animations.forEach(  function (clip, index) {      console.log(`Animation ${index}:`, clip.name);    });
  mixer = new THREE.AnimationMixer(gltf.scene);
  gltf.animations.forEach(clip => mixer.clipAction(clip).play());
  }
}

export {mixer};
