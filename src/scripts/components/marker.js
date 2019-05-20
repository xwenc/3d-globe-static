import {
  Mesh,
  Group,
  SphereGeometry,
  MeshBasicMaterial,
  Color
} from "three";
import { coordinatesToPosition } from "../utils";
import { RADIUS } from "../default";

export default (data = []) => {
  const color = new Color("#615fb8");
  let markers = new Group();

  data.forEach(marker => {
    const { coordinates, value } = marker;
    const mesh = new Mesh();
    mesh.geometry = new SphereGeometry(RADIUS / 120, 32, 32);
    mesh.material = new MeshBasicMaterial({
      color
    });

    // place markers
    const position = coordinatesToPosition(coordinates, RADIUS);
    mesh.position.set(...position);
    markers.add(mesh);
  });

  return markers;
};
