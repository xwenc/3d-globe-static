import { WebGLRenderer } from "three";
import { canvas } from "../default";

export default function () {
  let renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    shadowMapEnabled: false
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(1);
  renderer.setClearColor(0x000000, 0);
  return renderer;
}
