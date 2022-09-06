"use strict";

import * as THREE from "three";

console.log("Hello THREEJS!", THREE);

// dom elements
const canvas = document.querySelector(".webgl");

// used to put objects, models, lights
const scene = new THREE.Scene();

// objects - our goal is to create them
// can be: geometries, particles, lights,
// need to create a Mesh, to represent the geometry( shape) and material(how it looks)

// Red Cube Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
// create material
const material = new THREE.MeshBasicMaterial({ color: "red" });
// create mesh and add to scene
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera - to have a POV of object
// params: vertical fov (degrees), aspect ratio: width of the render/height
// next create the renderer: draws the scene,
const sizes = { width: 800, height: 600 };
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// we can move the camera or the object
// we move the position in x,y,z axis
camera.position.z = 4;
camera.position.y = 1.4;
camera.position.x = 1;
scene.add(camera);

// renderer
// by default - we spawn inside the cube we create
const renderer = new THREE.WebGLRenderer({ canvas });
console.log(canvas);
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
