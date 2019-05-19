import * as THREE from "three";

//Local map;
import map from "../images/map.png";

//Local styles;
import "../styles/index.scss";

// Local components
import addGlobe from "./components/globe";
import addCamera from "./components/camera";
import addRenderer from "./components/renderer";
import addControls from "./components/controls";
import resize from "./components/resize";

// Three group objects
const groups = {
  main: null, // A group containing everything
  globe: null, // A group containing the globe sphere (and globe dots)
  globeDots: null, // A group containing the globe dots
  lines: null, // A group containing the lines between each country
  lineDots: null // A group containing the line dots
};

const setupScene = () => {
  let renderer = addRenderer();
  let scene = new THREE.Scene();
  let camera = addCamera();
  let controls = addControls(camera, renderer.domElement);

  // Main group that contains everything
  groups.main = new THREE.Group();
  groups.main.name = "Main";

  // Render objects
  addGlobe({ texture: map }).then(res => {
    groups.globe = res;
    groups.main.add(groups.globe);

    // Add the main group to the scene
    scene.add(groups.main);

    // Start the requestAnimationFrame loop
    render();
  });

  function render() {
    renderer.render(scene, camera);
  };

  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    render();
  };

  window.addEventListener("resize", () => {
    resize(renderer, camera);
    render();
  });

  resize(renderer, camera);

  animate();
};

/* INITIALISATION */
if (!window.WebGLRenderingContext) {
  alert("WebGL not supported, please use a browser that supports WebGL");
} else {
  setupScene();
}
