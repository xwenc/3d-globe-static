// Cache DOM selectors
export const container = document.querySelector(".js-globe");
export const canvas = container.querySelector(".js-canvas");

// hardcoded constants that can eventually be exposed via options
export const RADIUS = 300;
export const CAMERA_FAR = RADIUS * 100;
export const CAMERA_FOV = 45;
export const CAMERA_NEAR = 1;
export const CAMERA_DAMPING_FACTOR = 0.1;
export const CAMERA_MAX_POLAR_ANGLE = Math.PI;
export const CAMERA_MIN_POLAR_ANGLE = 0;
export const CAMERA_MIN_DISTANCE_RADIUS_SCALE = 1.1;
export const GLOBE_SEGMENTS = 50;

export const defaultCameraOptions = {
  autoRotateSpeed: -0.07,
  distanceRadiusScale: 3,
  enableAutoRotate: true,
  enableRotate: true,
  enableZoom: true,
  maxDistanceRadiusScale: 4,
  maxPolarAngle: CAMERA_MAX_POLAR_ANGLE,
  minPolarAngle: CAMERA_MIN_POLAR_ANGLE,
  rotateSpeed: 0.02,
  zoomSpeed: 1
};

export const defaultLightOptions = {
  ambientLightColor: "white",
  ambientLightIntensity: 0.7,
  pointLightColor: "white",
  pointLightIntensity: 0.5,
  pointLightPositionRadiusScales: [-2, 1, -1]
};
