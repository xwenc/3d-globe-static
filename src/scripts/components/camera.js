import { AmbientLight, Color, PerspectiveCamera, PointLight } from "three";
import { RADIUS, canvas } from "../default";

export default () => {
  const { clientWidth, clientHeight } = canvas;
  let camera = new PerspectiveCamera(60, clientWidth / clientHeight, 1, 10000);
  const ambientLight = new AmbientLight("white");
  camera.add(ambientLight);

  const pointLight = new PointLight("white");
  
  camera.add(pointLight);

  camera.position.z = RADIUS * 2.2;
  return camera;
};
