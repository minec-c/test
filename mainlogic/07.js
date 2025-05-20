import * as THREE from 'three';
import {camera} from '../mainlogic/05.js';
import {scene} from '../mainlogic/04.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
// Controls
const controls = new OrbitControls(camera, renderer.domElement);


