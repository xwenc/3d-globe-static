import {
  Group,
  Vector3,
  Geometry,
  Color,
  QuadraticBezierCurve3,
  Mesh
} from "three";
import { MeshLine, MeshLineMaterial } from "three.meshline";
import { returnCurveCoordinates, tween } from "../utils";
import { RADIUS } from "../default";

const getPoints = (country, num = 100) => {
  const [countryStart, countryEnd] = country;
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
  const points = curve.getPoints(num);

  return points;
};

const addLine = points => {
  const color = new Color("#615fb8");
  let line = new MeshLine();
  let geometry = new Geometry();
  const material = new MeshLineMaterial({
    color,
    transparent: true,
    opacity: 0.5
  });
  geometry.vertices = points;
  line.setGeometry(geometry);

  return new Mesh(line.geometry, material);
};

export { getPoints, addLine };
