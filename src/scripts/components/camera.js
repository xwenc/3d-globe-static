import { AmbientLight, PerspectiveCamera, PointLight } from "three";
import { RADIUS, canvas, defaultLightOptions } from "../default";
import { coordinatesToPosition } from "../utils";

export default lookAt => {
  const { clientWidth, clientHeight } = canvas;
  let camera = new PerspectiveCamera(60, clientWidth / clientHeight, 1, 10000);

  // Ambient light
  const ambientLight = new AmbientLight(0xffffff);
  ambientLight.intensity = defaultLightOptions.ambientLightIntensity;
  camera.add(ambientLight);

  // Point light
  const pointLight = new PointLight(0xffffff);
  const [
    pointLightRadiusScaleX,
    pointLightRadiusScaleY,
    pointLightRadiusScaleZ,
  ] = defaultLightOptions.pointLightPositionRadiusScales;
  pointLight.intensity = defaultLightOptions.pointLightIntensity;
  pointLight.position.set(
    RADIUS * pointLightRadiusScaleX,
    RADIUS * pointLightRadiusScaleY,
    RADIUS * pointLightRadiusScaleZ,
  );
  camera.add(pointLight);

  // Camera position
  camera.position.z = RADIUS * 2.2;
  if (lookAt) {
    const position = coordinatesToPosition(
      lookAt,
      RADIUS * 2.2
    );
    console.log(position)
    camera.position.set(position[0],position[1],position[2]);
  }

  return camera;
};
