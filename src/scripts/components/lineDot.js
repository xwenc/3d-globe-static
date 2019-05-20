import { RADIUS } from "../default";
import { Color, Group, Mesh, SphereGeometry, MeshBasicMaterial } from "three";

export default (addLineDots = () => {
  /*
    This function will create a number of dots (props.dotsAmount) which will then later be
    animated along the lines. The dots are set to not be visible as they are later
    assigned a position after the introduction animation.
  */

  const radius = RADIUS / 120;
  const segments = 32;
  const rings = 32;
  const color = new Color("#615fb8");

  // Returns a sphere geometry positioned at coordinates
  const returnLineDot = () =>
    new Mesh(
      new SphereGeometry(radius, segments, rings),
      new MeshBasicMaterial({ color  })
    );
  
  const lineDots = new Group();

  for (let i = 0; i < 50 ; i++) {
    // Get the country path geometry vertices and create the dot at the first vertex
    const targetDot = returnLineDot();
    targetDot.visible = false;

    // Add custom variables for custom path coordinates and index
    targetDot._pathIndex = null;
    targetDot._path = null;

    // Add the dot to the dots group
    lineDots.add(targetDot);
  }

  return lineDots
});
