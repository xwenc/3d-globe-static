import OrbitControls from "three-orbitcontrols";
import {
  CAMERA_DAMPING_FACTOR,
  RADIUS,
  CAMERA_MIN_DISTANCE_RADIUS_SCALE,
  defaultCameraOptions
} from "../default";

export default (camera, el) => {
  let controls = new OrbitControls(camera, el);
  //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.autoRotate = defaultCameraOptions.enableAutoRotate;
  controls.autoRotateSpeed = defaultCameraOptions.autoRotateSpeed;
  controls.dampingFactor = CAMERA_DAMPING_FACTOR;
  controls.enablePan = false;
  controls.enableRotate = defaultCameraOptions.enableRotate;
  controls.enableZoom = defaultCameraOptions.enableZoom;
  controls.maxDistance = RADIUS * defaultCameraOptions.maxDistanceRadiusScale;
  controls.maxPolarAngle = defaultCameraOptions.maxPolarAngle;
  controls.minDistance = RADIUS * CAMERA_MIN_DISTANCE_RADIUS_SCALE;
  controls.minPolarAngle = defaultCameraOptions.minPolarAngle;
  controls.rotateSpeed = defaultCameraOptions.rotateSpeed;
  controls.zoomSpeed = defaultCameraOptions.zoomSpeed;

  // stop autorotate after the first interaction
  controls.addEventListener("start", function() {
    window.autorotateTimeout && clearTimeout(window.autorotateTimeout);
    controls.autoRotate = false;
  });

  // restart autorotate after the last interaction & an idle time has passed
  controls.addEventListener("end", function() {
    window.autorotateTimeout = setTimeout(function() {
      controls.autoRotate = true;
    }, 2000);
  });

  console.log("contorls", controls)
  return controls;
};
