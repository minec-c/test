import * as THREE from 'three';
// Scene
const scene = new THREE.Scene();
//scene.background = new THREE.Color('white');
//scene.background = new THREE.Color('skyblue'); ////WORKS

//Load Background Texture
const texloader = new THREE.TextureLoader();
texloader.load(
  '../texture/bgtexbluesky.png',
  function (texture){  scene.background = texture;},
  undefined,
  function(err){ console.log('Error loading background texture:',err);}
  );

export {scene};
