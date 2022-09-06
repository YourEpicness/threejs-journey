"use strict";
import "./style.css";
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const sizes = { width: window.innerWidth, height: window.innerHeight };

window.addEventListener("resize", (event) => {
  // console.log("window resized");

  // update size
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update the renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// coding full screen events
// DOES NOT WORK ON SAFARI - need to use webkit
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  // console.log(document.fullscreenElement);
  if (!fullscreenElement) {
    // canvas.requestFullscreen();
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
    return;
  }
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    canvas.webkitExitFullscreen();
  }
});

// Pixel Ratio
// used to be pixel ratio of 1 is normal, apple made 2, 3 is being made now
// a pixel ratio of 2 means 4 times more pixels to render, 3 means 9, etc
// highest pixel ratios are on weakest devices: eg. mobile

// ---- Mouse Events ----
const cursor = {
  x: 0,
  y: 0,
};
// Downfall is doesn't scale with window size well
window.addEventListener("mousemove", (event) => {
  // need an amplitude of 1, - 0.5 is to allow for negative # (range: -0.5 to 0.5)
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);

  // console.log(cursor.x, cursor.y);
});

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

// --------- Geometries --------
// Made of vertices (coordinates in space) and faces ( triangles that join vertices)
// can be used to create particles
// particles made up of: position,uv, or normal coordinates

// all geometries inherti from BufferGeometry

// segments are used to add "texture" or more detail to geometries. creating more triangles
// means more ddetails

// Using a Float32Array to create a BufferGeometry
// [x,y,z] [x,y,z] [x,y,z] first, second, and third vertexes
// const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
// //convert into BufferAttirbute
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
// const custom_geometry = new THREE.BufferGeometry();
// custom_geometry.setAttribute("position", positionsAttribute);

const count = 50;
const positionsArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < count * 3 * 3; i++) {
  positionsArray[i] = (Math.random() - 0.5) * 1;
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
const custom_geometry = new THREE.BufferGeometry();
custom_geometry.setAttribute("position", positionsAttribute);

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
// create material
const material = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });
// create mesh and add to scene
const mesh = new THREE.Mesh(custom_geometry, material);
// // can modify mesh cooridnates anywhere before render
// // mesh.position.x = 0.7;
// // mesh.position.y = -0.6;
// // mesh.position.z = 1;

// // shorthand for above
mesh.position.set(0, 0, 0);

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

scene.add(mesh);

// instead of doing all transform one by one, we can use GROUP class
const group = new THREE.Group();
group.position.y;
group.scale.y = 2;
group.rotation.y = 0.3;
// scene.add(group);

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

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

// --- Orthographic Camera ---
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   aspectRatio * -1,
//   aspectRatio * 1,
//   1,
//   -1,
//   0.1,
//   100
// );

// we can move the camera or the object
// we move the position in x,y,z axis
// camera.position.z = 3;
// camera.position.y = 1;
// camera.position.x = 1;

camera.position.set(0, 0, 3);

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
// limit pixel ratio on mobile
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// ------------------- Orbit Controls -----------------
// ThreeJs has built in controls for camera movement
// better version of camera code in tick()
const controls = new OrbitControls(camera, canvas);
// can set starting position
controls.target.set(0, 0, 0);
// add damping - slight delay when finishing drag and dropping
controls.enableDamping = true;
// controls.enabled = false;

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
  // mesh.rotation.y = elapsedTime;

  // -- Animating the camera --
  // camera.position.y = Math.sin(elapsedTime);
  // camera.position.x = Math.cos(elapsedTime);

  // Update the Camera - front/side view
  // camera.position.x = cursor.x * 3;
  // camera.position.y = cursor.y * 3;

  // Camera update - full 180 including Y
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.lookAt(mesh.position);

  // Orbit Controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
tick();
