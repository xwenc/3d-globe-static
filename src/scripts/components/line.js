import {
  Group,
  Vector3,
  Geometry,
  Color,
  QuadraticBezierCurve3,
  Mesh
} from "three";
import { MeshLine, MeshLineMaterial } from "three.meshline";
import { returnCurveCoordinates } from "../utils";
import { RADIUS } from "../default";

export default data => {
  const color = new Color("#615fb8");
  const lines = new Group();

  data.forEach(country => {
    const [countryStart, countryEnd] = country;
    let line = new MeshLine();
    let geometry = new Geometry();
    const material = new MeshLineMaterial({
      color,
      transparent: true,
      opacity: 0.5
    });

    console.log(countryStart, countryEnd);
    // Get the spatial coordinates
    const { start, mid, end } = returnCurveCoordinates(
      countryStart.coordinates,
      countryEnd.coordinates,
      RADIUS
    );

    // Calcualte the curve in order to get points from
    const curve = new QuadraticBezierCurve3(
      new Vector3(...start),
      new Vector3(...mid),
      new Vector3(...end)
    );

    // Get verticies from curve
    geometry.vertices = curve.getPoints(200);
    line.setGeometry(geometry);
    const curveObject = new Mesh(line.geometry, material);
    curveObject._path = geometry.vertices;
    lines.add(curveObject);
  });

  return lines;
};
