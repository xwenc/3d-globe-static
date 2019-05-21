import { WebGLRenderer } from "three";
import { canvas } from "../default";

export default function () {
  let renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  return renderer;
}
