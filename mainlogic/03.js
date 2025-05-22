import * as THREE from 'three';
import {renderer} from '../mainlogic/02.js';
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
//LIGHT MAP
renderer.shadowMap.enabled = true;
