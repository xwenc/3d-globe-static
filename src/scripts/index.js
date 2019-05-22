import * as THREE from "three";
import * as TWEEN from "es6-tween";
import { tween } from "./utils";

//Local map;
import map from "../images/map.png";

//Local styles;
import "../styles/index.scss";

// Local components
import addGlobe from "./components/globe";
import { getPoints, addLine } from "./components/line";
import addMarker from "./components/marker";
import addCamera from "./components/camera";
import addRenderer from "./components/renderer";
import addControls from "./components/controls";
import resize from "./components/resize";

// Look At

const lookAt = [10, 120];

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
  lineDots: null // A group containing the line dots,
};

const setupScene = () => {
  let renderer = addRenderer();
  let scene = new THREE.Scene();
  let camera = addCamera(lookAt);
  let controls = addControls(camera, renderer.domElement);

  // Main group that contains everything
  groups.main = new THREE.Group();
  groups.main.name = "Main";

  // Add markers
  groups.markers = addMarker(data);
  groups.markers.name = "Markers";
  groups.main.add(groups.markers);

  //Add lines
  groups.lines = new THREE.Group();
  groups.lines.name = "Lines";

  dataLines.forEach((country, index) => {
    let points = getPoints(country);
    //Animate line
    tween({ num: 0 }, { num: 200 }, 2500, ["Linear", "None"], ({ num }) => {
      // console.log("num", Math.floor(num), points.slice(Math.floor(num)))
      let start, end;
      if (num < 100) {
        start = 0;
        end = num + 1;
      } else {
        start = num - 100;
        end = num + 1;
      }

      const line = addLine(points.slice(Math.floor(start), Math.floor(end)));
      groups.lines.children[index] = line;
    });
  });

  groups.main.add(groups.lines);

  // Render objects
  addGlobe({ texture: map }).then(res => {
    groups.globe = res;
    groups.main.add(groups.globe);

    scene.add(camera);
    // Add the main group to the scene
    scene.add(groups.main);

    // Start the requestAnimationFrame loop
    render();
  });

  function render() {
    renderer.render(scene, camera);
  }

  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    TWEEN.update();

    render();
  }

  window.addEventListener("resize", () => {
    resize(renderer, camera);
  });

  resize(renderer, camera);

  animate();

  console.log("groups", groups);
};

/* INITIALISATION */
if (!window.WebGLRenderingContext) {
  alert("WebGL not supported, please use a browser that supports WebGL");
} else {
  setupScene();
}
