"use strict";
import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

console.log("Hello THREEJS!");

// every class inherits from Object3D

// transforming objects - there are 4 properties
// position: to move, scale: to resize, rotation: to rotate, and quaternion: to rotate also

// dom elements
const canvas = document.querySelector(".webgl");

// used to put objects, models, lights
const scene = new THREE.Scene();

// objects - our goal is to create them
// can be: geometries, particles, lights,
// need to create a Mesh, to represent the geometry( shape) and material(how it looks)

// Red Cube Object
// ----------------------------------------
const geometry = new THREE.BoxGeometry(1, 1, 1);
// create material
const material = new THREE.MeshBasicMaterial({ color: "red" });
// create mesh and add to scene
const mesh = new THREE.Mesh(geometry, material);
// // can modify mesh cooridnates anywhere before render
// // mesh.position.x = 0.7;
// // mesh.position.y = -0.6;
// // mesh.position.z = 1;

// // shorthand for above
// mesh.position.set(0.7, -0.6, 1);

// // Modifying the scale - Vector3
// mesh.scale.set(2, 0.5, 0.5);

// // Rotation - x,y,z but it's a Euler
// // be careful with changing axis - 1 axis doesnt work results in Gimbal lock
// // to fix- we can use reorder()
// // mesh.rotation.reorder("YXZ");
// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.y = Math.PI * 0.25;
// // mesh.rotation.set(0, Math.PI * 1.2, 0);

// // quaternion - mathematical representation of a rotation
// // mesh.quaternion.set();

// instead of doing all transform one by one, we can use GROUP class
const group = new THREE.Group();
group.position.y;
group.scale.y = 2;
group.rotation.y = 0.3;
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red" })
);

group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "blue" })
);
cube2.position.set(-2, 0, -1);
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "orange" })
);
cube3.position.set(1, 0, -1);
group.add(cube3);
// --------------------------------------------

// axes helper - param: length of line size
const axesHelper = new THREE.AxesHelper(1.5);
scene.add(axesHelper);

// Camera - to have a POV of object
// params: vertical fov (degrees), aspect ratio: width of the render/height, near, far
// near and far dictate what is seen by camera
// DO NOT use extreme values like 0.001 or 99999
// next create the renderer: draws the scene,
const sizes = { width: 800, height: 600 };
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
// we can move the camera or the object
// we move the position in x,y,z axis
// camera.position.z = 3;
// camera.position.y = 1;
// camera.position.x = 1;

camera.position.set(1, 1, 3);

scene.add(camera);

// can be used to easily set up camera
// camera.lookAt(mesh.position);

// Creating Vectors
// can get length and distance
console.log("length", mesh.position.length());
// get length between camera nd object
console.log("dist to cam", mesh.position.distanceTo(camera.position));
// takes vector length and makes it 1
// mesh.position.normalize();
console.log("normalized", mesh.position.length());
// renderer
// by default - we spawn inside the cube we create
const renderer = new THREE.WebGLRenderer({ canvas });
console.log(canvas);
renderer.setSize(sizes.width, sizes.height);

// ------------------------------------------------------

// Animation - is like stop motion, move the object & take a picture + repeat
// requestAnimationFrame - used to call the function provided on next frame

// Time
let time = Date.now();
// THREEJS Clock
const clock = new THREE.Clock();

// Using GSAP
// interally has its own tick
gsap.to(group.position, {
  duration: 1,
  delay: 1,
  x: 2,
});

gsap.to(group.position, {
  duration: 1,
  delay: 2,
  x: 0,
});

const tick = () => {
  // // maintain same FPS for all using JS time
  // const currentTime = Date.now();
  // // calculate difference (delta) between our time and current time
  // const deltaTime = currentTime - time;
  // time = currentTime;

  // // Update objects - transform for animation
  // group.rotation.y += 0.002 * deltaTime;

  // built in method of standardizing FPS
  const elapsedTime = clock.getElapsedTime();

  // instead of += USE =
  group.rotation.y = elapsedTime;
  // camera.position.y = Math.sin(elapsedTime);
  // camera.position.x = Math.cos(elapsedTime);
  // camera.lookAt(group.position);

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
tick();