import * as THREE from "three";

//Local map;
import map from "../images/map.png";

//Local styles;
import "../styles/index.scss";

// Local components
import addGlobe from "./components/globe";
import addLine from "./components/line";
import addMarker from "./components/marker";
import addCamera from "./components/camera";
import addRenderer from "./components/renderer";
import addControls from "./components/controls";
import resize from "./components/resize";

// Fake markers
const data = [
  {
    id: 1,
    city: "Sydney",
    color: "red",
    coordinates: [-33.8688, 151.2093],
    value: 25
  },
  {
    id: 2,
    city: "Melbourne",
    color: "blue",
    coordinates: [-37.8136, 144.9631],
    value: 25
  },
  {
    id: 3,
    city: "Hobart",
    color: "yellow",
    coordinates: [-42.8821, 147.3272],
    value: 25
  },
  {
    id: 4,
    city: "Shanghai",
    color: "green",
    coordinates: [31.2304, 121.4737],
    value: 25
  }
];

//lines data

const dataLines = [
  [
    {
      id: 1,
      city: "Sydney",
      color: "red",
      coordinates: [-33.8688, 151.2093],
      value: 25
    },
    {
      id: 4,
      city: "Shanghai",
      color: "green",
      coordinates: [31.2304, 121.4737],
      value: 25
    }
  ],
  [
    {
      id: 3,
      city: "Hobart",
      color: "yellow",
      coordinates: [-42.8821, 147.3272],
      value: 25
    },
    {
      id: 4,
      city: "Shanghai",
      color: "green",
      coordinates: [31.2304, 121.4737],
      value: 25
    }
  ]
];

// Three group objects
const groups = {
  main: null, // A group containing everything
  globe: null, // A group containing the globe sphere (and globe dots)
  markers: null, // A group containing the globe dots
  lines: null, // A group containing the lines between each country
  lineDots: null // A group containing the line dots
};

const setupScene = () => {
  let renderer = addRenderer();
  let scene = new THREE.Scene();
  let camera = addCamera(data[0].coordinates);
  let controls = addControls(camera, renderer.domElement);

  // Main group that contains everything
  groups.main = new THREE.Group();
  groups.main.name = "Main";

  // Add markers
  groups.markers = addMarker(data);
  groups.main.add(groups.markers);

  //Add lines
  groups.lines = addLine(dataLines);
  groups.main.add(groups.lines);

  // Render objects
  addGlobe({ texture: map }).then(res => {
    groups.globe = res;
    groups.main.add(groups.globe);

    // Add the main group to the scene
    scene.add(groups.main);

    console.log("groups", groups);
    // Start the requestAnimationFrame loop
    render();
  });

  function render() {
    renderer.render(scene, camera);
  }

  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    render();
  }

  window.addEventListener("resize", () => {
    resize(renderer, camera);
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
