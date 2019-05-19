import { AmbientLight, PerspectiveCamera, PointLight } from "three";
import { RADIUS, canvas } from "../default";
import { coordinatesToPosition } from "../utils";

export default lookAt => {
  const { clientWidth, clientHeight } = canvas;
  let camera = new PerspectiveCamera(60, clientWidth / clientHeight, 1, 10000);
  const ambientLight = new AmbientLight("white");
  camera.add(ambientLight);
  const pointLight = new PointLight("white");
  camera.add(pointLight);
  camera.position.z = RADIUS * 2.2;
  if (lookAt) {
    const position = coordinatesToPosition(
      lookAt,
      RADIUS * 2.2
    );
    camera.position.set(...position);
  }

  return camera;
};
