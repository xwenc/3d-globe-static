import { container } from "../default";

export default function resize(renderer, camera) {
  const { innerWidth, innerHeight } = window;
  container.width = innerWidth;
  container.height = innerHeight;
  container.style.width = `${innerWidth}px`;
  container.style.height = `${innerHeight}px`;
  
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.offsetWidth, container.offsetHeight);
}
