import {
  Line,
  Vector3,
  LineBasicMaterial,
  BufferGeometry,
  Color,
  QuadraticBezierCurve3,
} from "three";
import { returnCurveCoordinates } from "../utils";
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
  let geometry = new BufferGeometry();
  const material = new LineBasicMaterial({
    color
  });
  geometry.setFromPoints(points);
  return new Line(geometry, material);
};

export { getPoints, addLine };