import { Color, Group, Mesh, SphereGeometry, MeshBasicMaterial } from "three";
import { tween } from "../utils";

const dot = (path, index) => {
  /*
    This function will create a number of dots (props.dotsAmount) which will then later be
    animated along the lines. The dots are set to not be visible as they are later
    assigned a position after the introduction animation.
  */

  const radius = 1.5;
  const segments = 2;
  const rings = 2;
  const color = new Color("#615fb8");

  // Returns a sphere geometry positioned at coordinates
  const returnLineDot = () =>
    new Mesh(
      new SphereGeometry(radius, segments, rings),
      new MeshBasicMaterial({ color })
    );

  const targetDot = returnLineDot();
  targetDot.visible = false;

  // Add custom variables for custom path coordinates and index

  targetDot._pathIndex = index;
  targetDot._path = path;
  targetDot.position.set(path.x, path.y, path.z);

  return targetDot;
};

const animatedDots = lineDots => {
  tween(
    { num: 0 },
    { num: lineDots.length },
    3500,
    ["Linear", "None"],
    ({ num }) => {
      for (let index = 0; index < lineDots.length; index++) {
        if (index === Math.floor(num)) {
          lineDots[index][visible] = true;
        } else {
          lineDots[index][visible] = false;
        }
      }
    }
  );
};

const addLineDots = (lines = []) => {
  const lineDots = new Group();
  lines.children &&
    lines.children.forEach(({ _path = [] }) => {
      const dots = new Group();
      _path.forEach((path, index) => {
        dots.add(dot(path, index));
      });
      lineDots.add(dots);
    });
  return lineDots;
};

export { addLineDots, animatedDots };
