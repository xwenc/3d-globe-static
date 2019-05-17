import * as THREE from "three";

//Local map;
import map from "../images/map.png";

//Local styles;
import "../styles/index.scss";

// Local components
import globe from "./components/globe";
import camera from "./components/camera";
import renderer from "./components/renderer";

// Three group objects
const groups = {
  main: null, // A group containing everything
  globe: null, // A group containing the globe sphere (and globe dots)
  globeDots: null, // A group containing the globe dots
  lines: null, // A group containing the lines between each country
  lineDots: null // A group containing the line dots
};

const setupScene = () => {
  let scene = new THREE.Scene();
  const render = renderer();
  // Main group that contains everything
  groups.main = new THREE.Group();
  groups.main.name = "Main";

  // Render objects
  globe({ texture: map }).then(res => {
    groups.globe = res;
    groups.main.add(groups.globe);

    // Add the main group to the scene
    scene.add(groups.main);

    // Start the requestAnimationFrame loop
    render.render(scene, camera());
  });

  console.log("groups", groups);
};

/* INITIALISATION */
if (!window.WebGLRenderingContext) {
  alert("WebGL not supported, please use a browser that supports WebGL");
} else {
  setupScene();
}
